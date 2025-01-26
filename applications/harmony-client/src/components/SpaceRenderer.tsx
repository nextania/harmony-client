import { ParentProps, Show } from "solid-js";
import { styled } from "solid-styled-components";
import MemberCategory from "./MemberCategory";
import ChannelControlLink from "./ChannelControlLink";
import avatar from "../assets/default.png";

import ChannelIcon from "@fluentui/svg-icons/icons/channel_24_regular.svg?raw";
import Icon from "./Icon";
import { useMatch } from "@solidjs/router";

const Chat = styled.div`
    display: flex;
    height: calc(100% - 50px);
    width: 100%;
    border-radius: 10px 0px 0px 0px;
    background: rgba(29, 29, 29, 0.30);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
const Members = styled.div`
    width: 330px;
    background: rgba(0, 0, 0, 0.20);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;


const ChatContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
`;



const ChannelBasics = styled.div`
    display: flex;
    align-items: center;
    & > * + * {
        margin-left: 10px;
    }
    user-select: none;
`;

const ChannelName = styled.div`
    font-size: 16px;

`;

const ChannelDescription = styled.div`
    font-size: 12px;
    font-weight: 300;
    color: #9c9c9c;
`;

const ChannelControls = styled.div`
    display: flex;
    align-items: center;
    & > * + * {
        margin-left: 10px;
    }
    user-select: none;
`;

const ChatHeading= styled.div`
    position: absolute;
    width: calc(100% - 60px);
    height: 50px;
    border-radius: 5px;
    background: rgba(54, 54, 54, 0.60);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    top: 10px;
    left: 10px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    justify-content: space-between;
    backdrop-filter: blur(10px);
`;


const SpaceRenderer = (props: ParentProps) => {
    const spaceHome = useMatch(() => "/app/spaces/:spaceId/home");
    const relationships = useMatch(() => "/app/me/relationships");

    return (
        <>
        <Chat>
            <Show when={!spaceHome() && !relationships()}>
                    <ChatContentContainer>
                        <ChatHeading>
                            <ChannelBasics>
                                <Icon innerHTML={ChannelIcon} />
                                <ChannelName>General</ChannelName>
                                <ChannelDescription>Hmm, what could this be about?</ChannelDescription>
                            </ChannelBasics>
                            <ChannelControls>
                                <ChannelControlLink type="text">Text</ChannelControlLink>
                                <ChannelControlLink type="voice">Voice</ChannelControlLink>
                            </ChannelControls>
                        </ChatHeading>
                        {props.children}
                    </ChatContentContainer>
                    <Members>
                        <MemberCategory category={{
                            name: "Online",
                            count: 4,
                            members: [
                                {
                                    name: "Azira",
                                    avatar: avatar,
                                    status: "online"
                                },
                                {
                                    name: "Emperor of Bluegaria",
                                    avatar: avatar,
                                    status: "busy"
                                },
                                {
                                    name: "One world",
                                    avatar: avatar,
                                    status: "busy_notify"
                                },
                                {
                                    name: "⋆༺𓆩Nyss𓆪༻⋆",
                                    avatar: avatar,
                                    status: "away"
                                }
                            ]
                        }} />
                    </Members>
            </Show>

            <Show when={!!spaceHome() || !!relationships()}>

                    {props.children}
            </Show>
            </Chat>
        </>
    )

}

export default SpaceRenderer