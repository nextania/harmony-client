import { styled } from "solid-styled-components";

import logo from "./assets/nextflow.svg";
import avatar from "./assets/default.png";
import { ChevronDownIcon } from "solid-fluent-icons/12";
import { AlertIcon, AppFolderIcon, EditIcon, SettingsIcon } from "solid-fluent-icons/20";
import { ChannelIcon, HomeIcon, MegaphoneIcon } from "solid-fluent-icons";
import Avatar from "./components/Avatar";
import MemberCategory from "./components/MemberCategory";
import { ParentProps } from "solid-js";
import ChannelControlLink from "./components/ChannelControlLink";

const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background: rgba(38, 38, 38, 0.50);
`;

const Sidebar = styled.div`
    width: 330px;
    height: 100%;
    flex-shrink: 0;
`;

const SpaceHeading = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 5px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 5px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
    &:hover {
        background: rgba(28, 28, 28, 0.5);
    }
    transition: background 0.2s;
    border-radius: 5px;
`;

const SpaceHeadingInner = styled.div`
    display: flex;
    align-items: center;
    & > * + * {
        margin-left: 10px;
    }
`

const SpaceHeadingText = styled.div`
    font-size: 20px;
    user-select: none;
`

const SpaceOptions = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 30px;
    padding-right: 30px;
`;

const SpaceOption = styled.div`
    border-radius: 5px;
    border: 1.5px solid rgba(157, 157, 157, 0.50);
    background: rgba(97, 97, 97, 0.20);
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 8px;
    padding-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        background: rgba(28, 28, 28, 0.5);

    }
    transition: background 0.2s;
`;

const SpaceChannelList = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`;

const SpaceChannel = styled.div<{ active?: boolean }>`
    display: flex;
    align-items: center;
    padding-top: 8px;
    padding-bottom: 8px;
    margin-left: 10px;
    margin-right: 10px;
    padding-left: 10px;
    padding-right: 10px;
    & > * + * {
        margin-left: 10px;
    }
    border-radius: 5px;
    ${({ active }) => active ? `
        background: rgba(28, 28, 28, 0.5);
    `: `
        &:hover {
            background: rgba(28, 28, 28, 0.5);
        }
        transition: background 0.2s;
    `}
    
    user-select: none;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

const TopBar = styled.div`
    height: 50px;
    display: flex;
    justify-content: space-between;
    padding-left: 20px;
    padding-right: 20px;

`;

const Search = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    
`

const SearchBar = styled.input`
    box-sizing: border-box;
    border-radius: 5px;
    border: 1px solid #9D9D9D;
    background: rgba(172, 172, 172, 0.20);
    font-family: Inter;
    color: #d9d9d9;
    padding: 10px;
`;

const User = styled.div`
    display: flex;
    align-items: center;
    & > * + * {
        margin-left: 10px;
    }
`

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

const SettingsButton = styled.div`
    border-radius: 5px;
    padding: 15px;
    &:hover {
        background: rgba(28, 28, 28, 0.5);
    }
    transition: background 0.2s;
    display: flex;
    align-items: center;
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

const Main = (props: ParentProps) => {
    return (
        <MainContainer>
            <Sidebar>
                <SpaceHeading>
                    <SpaceHeadingInner>
                        <img src={logo} alt="Nextia" width="40" height="40" />
                        <SpaceHeadingText>
                            Nextia Technologies
                        </SpaceHeadingText>
                    </SpaceHeadingInner>
                    <ChevronDownIcon />
                </SpaceHeading>
                <SpaceOptions>
                    <SpaceOption>
                        <EditIcon />
                    </SpaceOption>
                    <SpaceOption>
                        <AlertIcon />
                    </SpaceOption>
                    <SpaceOption>
                        <AlertIcon />
                    </SpaceOption>
                    <SpaceOption>
                        <AlertIcon />
                    </SpaceOption>
                </SpaceOptions>

                <SpaceChannelList>
                    <SpaceChannel>
                        <HomeIcon />
                        <div>Home</div>
                    </SpaceChannel>
                    <SpaceChannel>
                        <MegaphoneIcon />
                        <div>Announcements</div>
                    </SpaceChannel>
                    <SpaceChannel active>
                        <ChannelIcon />
                        <div>General</div>
                    </SpaceChannel>
                </SpaceChannelList>
            </Sidebar>
            <Content>
                <TopBar>
                    <Search>
                        <SearchBar placeholder="Search"></SearchBar>
                    </Search>
                    <User>
                        <SettingsButton>
                            <AppFolderIcon />
                        </SettingsButton>
                        <SettingsButton>
                            <SettingsIcon />
                        </SettingsButton>
                        <Avatar main url={avatar} status="busy_notify" />
                    </User>
                </TopBar>
                <Chat>
                    <ChatContentContainer>
                        <ChatHeading>
                            <ChannelBasics>
                                <ChannelIcon />
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
                </Chat>
            </Content>
        </MainContainer>
    )
};

export default Main;
