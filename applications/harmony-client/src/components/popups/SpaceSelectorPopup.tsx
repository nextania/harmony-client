import { useNavigate } from "@solidjs/router";
import { For, Portal } from "solid-js/web";
import { styled } from "solid-styled-components";
const PopupBase = styled.div<{ show: boolean; }>`
    position: absolute;
    top: 55px;
    left: 10px;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    width: 290px;
    border-radius: 5px;
    color: white;
    ${(props) => props.show ? "display: block;" : "display: none;"}
    @keyframes slideDown {
        from {
            transform: translateY(-10px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    animation: slideDown 0.2s;
    animation-fill-mode: forwards;
    z-index: 1000;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

const SpaceItem = styled.div`
    padding: 5px;
    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
    border-radius: 5px;
    user-select: none;
    cursor: default;
`;

interface Space {
    name: string;
    id: string;
}

const SpaceSelectorPopup = (props: { show: boolean; spaces: Space[] }) => {
    const navigate = useNavigate();
    return (
        <Portal>
            <PopupBase show={props.show}>
                <SpaceItem onClick={() => navigate("/app/me")}>Me</SpaceItem>
                <For each={props.spaces}>
                    {(space) => (
                        <SpaceItem onClick={() => navigate(`/app/spaces/${space.id}`)}>{space.name}</SpaceItem>
                    )}
                </For>
            </PopupBase>
        </Portal>
    )
};

export default SpaceSelectorPopup;
