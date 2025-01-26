import { styled } from "solid-styled-components";

import logo from "./assets/logo.svg";
import avatar from "./assets/default.png";
import ChevronDownIcon from "@fluentui/svg-icons/icons/chevron_down_12_regular.svg?raw";
import AlertIcon from "@fluentui/svg-icons/icons/alert_20_regular.svg?raw";
import AppFolderIcon from "@fluentui/svg-icons/icons/app_folder_20_regular.svg?raw";
import ChannelAddIcon from "@fluentui/svg-icons/icons/channel_add_20_regular.svg?raw";
import EditIcon from "@fluentui/svg-icons/icons/edit_20_regular.svg?raw";
import SettingsIcon from "@fluentui/svg-icons/icons/settings_20_regular.svg?raw"
import ChannelIcon from "@fluentui/svg-icons/icons/channel_24_regular.svg?raw";
import HomeIcon from "@fluentui/svg-icons/icons/home_24_regular.svg?raw";
import MegaphoneIcon from "@fluentui/svg-icons/icons/megaphone_24_regular.svg?raw";
import Avatar from "./components/Avatar";
import { createMemo, createSignal, onMount, ParentProps, Show } from "solid-js";
import { useClient } from "./state";
import CreateChannelDialog from "./components/dialogs/CreateChannelDialog";
import Dialog from "@corvu/dialog";
import Icon from "./components/Icon";
import SpaceSelectorPopup from "./components/popups/SpaceSelectorPopup";
import { useMatch } from "@solidjs/router";
import DirectMessageList from "./components/DirectMessageList";

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
    position:relative;
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

export const ChannelDisplay = styled.div<{ active?: boolean }>`
    display: flex;
    align-items: center;
    padding-top: 6px;
    padding-bottom: 5px;
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
        /* margin-left: 10px; */
    }
`

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
const Main = (props: ParentProps) => {
    const client = useClient();
    const [spaceSelectorShow, setSpaceSelectorShow] = createSignal(false);
    const isMe = useMatch(() => "/app/me/*?");
    const isHome = useMatch(() => "/app/spaces/:space/home");
    console.log(client);
    onMount(() => {
        console.log("Mounted");
        client.connect("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjAxSkVLSEg1VFRRUUJWWEE3WjNLWkQ1U1lSIiwiaXNzdWVkX2F0IjoxNzM0MzA0Njc5MzEzLCJleHBpcmVzX2F0IjoxNzM0OTA5NDc5MzEzfQ.rJ_B2Q2L5vDovGHAoyp3sl6u5ceGTRWO5JOMZBXo_NA").then(() => {
            console.log("Connected");
            client.getSpace("01J79K0HJ6DADVTTXF3HM1BC37").then((space) => {
                console.log(space.space.channels);
            });
        });
    });

    const context = createMemo(() => Dialog.useContext());
    const createChannel = () => {
        context().setOpen(true);
    };
    console.log(isMe());
    return (
        <MainContainer>
            <Sidebar>
                <SpaceHeading onClick={() => setSpaceSelectorShow(!spaceSelectorShow())}>
                    <SpaceHeadingInner>
                        <img src={logo} alt="Nextania" width="40" height="40" />
                        <SpaceHeadingText>
                            Nextania Technologies
                        </SpaceHeadingText>
                    </SpaceHeadingInner>
                    <Icon innerHTML={ChevronDownIcon} />
                    <SpaceSelectorPopup show={spaceSelectorShow()} spaces={[ 
                        { name: "Space 1", id: "01J79K0HJ6DADVTTXF3HM1BC37" }, 
                        { name: "Space 2", id: "01J79K0HJ6DADVTTXF3HM1BC38" }, 
                    ]} />
                </SpaceHeading>
                <Show when={!isMe()}>
                    <SpaceOptions>
                        <SpaceOption>
                            <Icon innerHTML={EditIcon} />
                        </SpaceOption>
                        <SpaceOption>
                            <Icon innerHTML={AlertIcon} />
                        </SpaceOption>
                        <CreateChannelDialog>
                            <SpaceOption onClick={createChannel}>
                                <Icon innerHTML={ChannelAddIcon} />
                            </SpaceOption>
                        </CreateChannelDialog>
                        <SpaceOption>
                            <Icon innerHTML={AlertIcon} />
                        </SpaceOption>
                    </SpaceOptions>

                    <SpaceChannelList>
                        <ChannelDisplay active={!!isHome()}>
                            <Icon innerHTML={HomeIcon} />
                            <div>Home</div>
                        </ChannelDisplay>
                        <ChannelDisplay>
                            <Icon innerHTML={MegaphoneIcon} />
                            <div>Announcements</div>
                        </ChannelDisplay>
                        <ChannelDisplay>
                            <Icon innerHTML={ChannelIcon} />
                            <div>General</div>
                        </ChannelDisplay>
                    </SpaceChannelList>
                </Show>

                <Show when={!!isMe()}>
                    <SpaceChannelList>
                        <DirectMessageList users={[
                            {
                                avatar: avatar,
                                id: "01J79K0HJ6DADVTTXF3HM1BC37",
                                name: "Someone",
                                status: "busy_notify"
                            },
                            {
                                avatar: avatar,
                                id: "01J79K0HJ6DADVTTXF3HM1BC38",
                                name: "Someone 2",
                                status: "busy"
                            },
                            {
                                avatar: avatar,
                                id: "01J79K0HJ6DADVTTXF3HM1BC39",
                                name: "Someone 3",
                                status: "online"
                            }
                        ]} />
                    </SpaceChannelList>
                </Show>
            </Sidebar>
            <Content>
                <TopBar>
                    <Search>
                        <SearchBar placeholder="Search"></SearchBar>
                    </Search>
                    <User>
                        <SettingsButton>
                            <Icon innerHTML={AppFolderIcon} />
                        </SettingsButton>
                        <SettingsButton>
                            <Icon innerHTML={SettingsIcon} />
                        </SettingsButton>
                        <Avatar main url={avatar} status="busy_notify" />
                    </User>
                </TopBar>
                {props.children}
            </Content>
        </MainContainer>
    )
};

export default Main;
