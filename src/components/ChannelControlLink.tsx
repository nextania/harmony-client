import { useLocation, useResolvedPath, useNavigate } from "@solidjs/router";
import { createMemo, ParentProps } from "solid-js";
import { styled } from "solid-styled-components";

type ChannelType = "text" | "voice";

const normalizePath = (path: string) => {
    const s = path.replace(/^\/+|(\/)\/+$/g, "$1");
    return s ? (/^[?#]/.test(s) ? s : "/" + s) : "";
};

const ChannelOption = styled.div<{ active?: boolean }>`
    &:after{
        content:"";
        display:block;
        width:0;
        height:3px;
        background-color:transparent;
        margin-top:2px;
    }
    ${({ active }) => active ? `
        &:after{
            width:75%;
            margin-left:12.5%;
            background-color: var(--primary);
            border-radius:5px;
            transition:width 0.3s, margin-left 0.3s;
        }
        &:hover:after{
            width:100%;
            margin-left:0;
        }
            font-weight: 600;
    `:``}
    border-radius: 5px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 8px;
    padding-bottom: 5px;
    &:hover {
        background: var(--standard-hover);
    }
`;

const ChannelControlLink = (props: ParentProps<{ type: ChannelType, end?: boolean }>) => {
    const to = useResolvedPath(() => "/app/" + props.type);
    const location = useLocation();
    const isActive = createMemo(() => {
        const to_ = to();
        if (to_ === undefined) return false;
        const path = normalizePath(to_.split(/[?#]/, 1)[0]).toLowerCase();
        const loc = decodeURI(normalizePath(location.pathname).toLowerCase());
        return props.end ? path === loc : loc.startsWith(path + "/") || loc === path;
    });
    const navigate = useNavigate();
    return (
        <ChannelOption active={isActive()} onClick={() => navigate("/app/" + props.type)}>
            {props.children}
        </ChannelOption>
    )
}

export default ChannelControlLink;