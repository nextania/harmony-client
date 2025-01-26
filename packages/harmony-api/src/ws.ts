/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */

type WebSocketMessage = RpcApiResponse;
interface WebSocketEvents<T> {
    open: [];
    close: [code: number, reason: string];
    error: [error: Error];
    message: [message: T];
}
type RpcApiRequest = {
    type: "IDENTIFY",
    token: string,
    publicKey: number[]
} | { type: "HEARTBEAT" } | { type: "GET_ID" } | {
    type: "MESSAGE",
    method: string,
    data: unknown,
    id: string
};
type RpcApiResponse = {
    id?: string;
    response?: unknown
}

type RpcApiEvent = {
    publicKey: number[],
    requestIds: string[],
    type: "HELLO"
} | { type: "IDENTIFY" } | { type: "HEARTBEAT" } | { type: "GET_ID", requestIds: string[] }

export const enum WebSocketError {}

type PromiseTuple<T> = [resolve: (value: T) => void, reject: (reason: Error) => void];

export type { WebSocketEvents, RpcApiRequest, RpcApiResponse };

import { encode, decode } from "@msgpack/msgpack";
import { EventEmitter } from "eventemitter3";

type QueueItem<T extends Record<string, object>, U extends { [key in keyof T]: object }, V extends Extract<keyof T, string>> = [V, T[V], PromiseTuple<U[V]>];

class RpcClient<T extends Record<string, object>, U extends { [key in keyof T]: object }> extends EventEmitter<WebSocketEvents<WebSocketMessage>> {
    socket?: WebSocket;
    idStore: string[] = [];
    queue: QueueItem<T, U, any>[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    openPromise?: [
        (value: void | PromiseLike<void>) => void,
        (reason: any) => void,
    ];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    waitingPromises: Record<
        string,
        PromiseTuple<any>
    > = {};
    closed = false;
    interval?: number;
    reconnect: boolean;
    manuallyClosed = false;
    token?: string;
    constructor(public url: string | URL, options?: { reconnect?: boolean }) {
        super();
        this.reconnect = options?.reconnect ?? false;
    }
    protected onOpen(event: Event) {
        this.interval = setInterval(() => {
            this.send({ type: "HEARTBEAT" });
        }, 10000);
    }
    protected onMessage(event: MessageEvent) {
        const message = decode(event.data as ArrayBuffer) as RpcApiEvent | RpcApiResponse;
        console.debug(message);
        if ("type" in message) {
            if (message.type === "HELLO") {
                this.idStore.push(...message.requestIds);
                this.send({
                    type: "IDENTIFY",
                    publicKey: [], 
                    token: this.token!,
                });
            } else 
            if (message.type === "GET_ID") {
                this.idStore.push(...message.requestIds);
                if (this.queue.length) {
                    for (let i = 0; i < this.idStore.length; i++) {
                        const item = this.queue.shift();
                        if (item) {
                            const request: RpcApiRequest = {
                                type: "MESSAGE",
                                id: this.idStore.shift()!,
                                method: item[0],
                                data: item[1],
                            };
                            this.waitingPromises[request.id] = item[2];
                            this.send(request);
                        }
                    }
                }
            } else if (message.type === "IDENTIFY") {
                this.openPromise?.[0]();
            }
        } else {
            if (message.id) {
                const promise = this.waitingPromises[message.id];
                if (promise) {
                    const response = message.response as any;
                    if ("error" in response) promise[1](new Error(response.error));
                    else promise[0](message.response);
                    delete this.waitingPromises[message.id];
                }
            } else {
                this.emit("message", message);
            }
        }
    }
    protected onError(event: Event) {
        this.emit("error", new Error(event.toString()));
    }
    protected onClose(event: CloseEvent) {
        clearInterval(this.interval);
        this.queue = [];
        this.socket = undefined;
        this.waitingPromises = {};
        this.idStore = [];
        this.closed = true;
        this.emit("close", event.code, event.reason);

        if (this.reconnect && !this.manuallyClosed) {
            setTimeout(() => {
                this.connect(this.token);
            }, 5000);
        }
    }

    send(data: RpcApiRequest) {
        this.socket?.send(encode(data));
    }
    queueItem<V extends Extract<keyof T, string>>(data: QueueItem<T, U, V>) {
        if (this.idStore.length < 3) {
            this.socket?.send(
                encode({ type: "GET_ID" }),
            );
            this.queue.push(data);
        } else { 
            const request: RpcApiRequest = {
                type: "MESSAGE",
                id: this.idStore.shift()!,
                method: data[0],
                data: data[1],
            };
            this.waitingPromises[request.id] = data[2];
            this.socket?.send(encode(request));
        }
    }
    async request<V extends Extract<keyof T, string>>(type: V, data: T[V]) {
        console.debug(data);
        return await new Promise<U[V]>(async (resolve, reject) => 
            this.queueItem([type, data, [resolve, reject]])
        );
    }
    async connect(token?: string, timeout = 5000) {
        this.token = token;
        const settings = new URLSearchParams();
        settings.set("v", "1");
        settings.set("compress", "zlib-stream");
        this.socket = new WebSocket(`${this.url}/api/rpc?${settings}`);
        this.socket.binaryType = "arraybuffer";
        this.socket.onopen = this.onOpen.bind(this);
        this.socket.onmessage = this.onMessage.bind(this);
        this.socket.onerror = this.onError.bind(this);
        this.socket.onclose = this.onClose.bind(this);
        return await new Promise<void>((resolve, reject) => {
            this.openPromise = [resolve, reject];
        }).then(() => this.emit("open"));
    }
    destroy() {
        this.manuallyClosed = true;
        this.socket?.close();
    }
}

export { RpcClient };