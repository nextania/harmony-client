import { styled } from "solid-styled-components";
import Avatar, { Status } from "./Avatar";
import { useMatch, useNavigate } from "@solidjs/router";
import { For } from "solid-js";
import { ChannelDisplay } from "../Main";


const Name = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;
`;
const DirectChannelResponsive = (props: { avatar: string; status: Status; name: string; id: string; }) => {
    const match = useMatch(() => `/app/me/channels/${props.id}/*?`);
    const navigate = useNavigate();
    return (
        <ChannelDisplay active={!!match()} onClick={() => navigate(`/app/me/channels/${props.id}`)}>
            <Avatar url={props.avatar} status={props.status} />
            <Name>{props.name}</Name>
        </ChannelDisplay>
    )
}

interface User {
    name: string;
    avatar: string;
    status: "online" | "away" | "busy" | "busy_notify";
    id: string;
};

const DirectMessageList = (props: { users: User[] }) => {
    return (
        <For each={props.users}>
            {user => (
                <DirectChannelResponsive avatar={user.avatar} status={user.status} name={user.name} id={user.id} />
            )}
        </For>
    )
};

export default DirectMessageList;