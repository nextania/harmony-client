import { defaultValueCtx, Editor, rootCtx } from "@milkdown/kit/core";
import { commonmark, hardbreakKeymap } from "@milkdown/kit/preset/commonmark";
import { emoji } from "@milkdown/plugin-emoji";
import { nord } from "@milkdown/theme-nord";
import AttachIcon from "@fluentui/svg-icons/icons/attach_24_regular.svg?raw";
import EmojiIcon from "@fluentui/svg-icons/icons/emoji_24_regular.svg?raw";
import SendIcon from "@fluentui/svg-icons/icons/send_24_regular.svg?raw";
import { createSignal, onCleanup, onMount } from "solid-js";
import { styled } from "solid-styled-components";

const ChatInputBase = styled.div`
    border-radius: 5px;
    border: 1px solid #9D9D9D;
    background: rgba(172, 172, 172, 0.20);
    color: #d9d9d9;
    font-family: Inter;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    position: relative;
`;
const ChatInputText = styled.div`
    width: 100%;
    border: none;
    outline: none;
    z-index: 1;
    word-wrap: break-word;
    overflow: scroll;
    word-break: break-all;
    max-height: 240px;
    display:inline-block;

    & > div > * > * {
        margin: 0;
    }
    & > div > * > * > * {
        margin: 0;
    }
    & .emoji {
        width: 20px;
        height: 20px;
        margin:auto;
        vertical-align: middle;
    }
    & span {
        align-items: center;
        width: fit-content;
    }
`

const ChatInputControls = styled.div`
    margin-left: 20px;
    & > * + * {
        margin-left: 10px;
    }
    display: flex;
`;

const ChatInputPlaceholder = styled.div`
    position: absolute;
    color: #9c9c9c;
    font-size: 16px;
    user-select: none;
`;

import { Component } from "solid-js";
import { listener, listenerCtx } from "@milkdown/plugin-listener";
import Icon from "./Icon";

const IconButton = ({ element }: { element: string }) => {
    const El = styled(Icon)`
        &:hover{
            filter: drop-shadow(0 0 4px #9900ff);
            color: #fff;
        }
        transition: filter 0.2s;
    `;

    return <El innerHTML={element} />;
}


const ChatInput = () => {
    let ref: HTMLDivElement | undefined;
    let editor: Editor;
    const [value, setValue] = createSignal("");
    onMount(async () => {
        if (ref) {
            let e = await Editor
                .make()
                .config(ctx => {
                    ctx.set(rootCtx, ref);
                    ctx.set(defaultValueCtx, "");
                    ctx.set(hardbreakKeymap.key, { InsertHardbreak: "" })
                    ctx.get(listenerCtx).updated((_, doc) => {
                        console.log(doc.toString());
                        setValue(doc.toString());
                    });
                })
                .config(nord)
                .use(commonmark)
                .use(emoji)
                .use(listener)
                .create();
            editor = e;
        }
    });
    onCleanup(() => {
        editor.destroy();
    });
    return (
        <ChatInputBase>
            {/* <ChatInputText contentEditable onInput={e => setMessage((e.target.textContent ?? ""))} ref={divRef}>
            </ChatInputText> */}
            <ChatInputText ref={ref} />
            <ChatInputControls>
                <IconButton element={AttachIcon} />
                <IconButton element={EmojiIcon} />
                <IconButton element={SendIcon} />
            </ChatInputControls>
            <ChatInputPlaceholder hidden={value() !== ""}>
                {/* Message #general */}
                Type a message...
            </ChatInputPlaceholder>
        </ChatInputBase>
    )
};

export default ChatInput;