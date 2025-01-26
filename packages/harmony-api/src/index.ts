import { RpcClient } from "./ws";

type Request = {
    GET_CHANNEL: {
        id: string;
    },
    GET_CHANNELS: {},
    GET_SPACE: {
        id: string;
    },

    START_CALL: {
        // channel id
        id: string;
        spaceId: string;
    },
    JOIN_CALL: {
        // call id
        id: string;
        spaceId?: string;
        sdp: string;
    }
}

interface Channel {
    id: string;
    name: string;
}

interface Space {
    id: string,
    name: string,
    description: string,
    channels: string[],
    members: string[],
    roles: string[],
    owner: string,
    scope_id: string,
    base_permissions: number,
}

type Response = {
    GET_CHANNEL: {
        channel: Channel;
    },
    GET_CHANNELS: {
        channels: Channel[];
    },
    GET_SPACE: {
        space: Space;
    },

    START_CALL: {
        // call
        id: string;
    },
    JOIN_CALL: {
        // call
        sdp: string;
    }
}

export class HarmonyClient extends RpcClient<Request, Response> {
    constructor(url: string | URL) {
        super(url, { reconnect: true });
    }

    async getChannel(id: string) {
        return await this.request("GET_CHANNEL", { id });
    }

    async getChannels() {
        return await this.request("GET_CHANNELS", {});
    }

    async getSpace(id: string) {
        return await this.request("GET_SPACE", { id });
    }

    async startCall(channelId: string, spaceId: string) {
        return await this.request("START_CALL", { id: channelId, spaceId });
    }
    async joinCall(callId: string, sdp: string, spaceId?: string) {
        return await this.request("JOIN_CALL", { id: callId, sdp, spaceId });
    }
}

