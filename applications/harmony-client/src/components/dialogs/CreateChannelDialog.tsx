import Dialog from "@corvu/dialog";
import { createMemo, ParentProps } from "solid-js";
import { Component, JSX } from "solid-js";
import { styled } from "solid-styled-components";

const Overlay = styled(Dialog.Overlay)`
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    inset: 0;
    z-index: 100;
`;

const Content = styled(Dialog.Content)`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.2);
    color: white;
    padding: 20px;
    border-radius: 5px;
    z-index: 101;
    opacity: 0;
    transition: all 0.3s;
    &[data-open] {
        opacity: 1;
    }
`;

const Label = styled(Dialog.Label)`
    font-size: 24px;
    font-weight: bold;
`;

const Description = styled(Dialog.Description)`
    font-size: 16px;
`;

const Close = styled(Dialog.Close)`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
`;

const CreateChannelDialog = ({ children }: ParentProps) => {
    const context = createMemo(() => Dialog.useContext());
    const click = () => {
        context().setOpen(true);
        // const open = context().open();
        // open({
        //     label: "Create Channel",
        //     description: "Create a new channel",
        //     actions: [
        //         {
        //             text: "Create",
        //             onClick: () => {
        //                 open({ open: false });
        //             }
        //         },
        //         {
        //             text: "Cancel",
        //             onClick: () => {
        //                 open({ open: false });
        //             }
        //         }
        //     ]
        // });
    }

    return (
        <>
            {children}
            <Dialog.Portal>
                <Overlay />
                <Content>
                    <Label>
                        Create Channel
                    </Label>
                    <Description>
                        <input></input>
                    </Description>
                </Content>
            </Dialog.Portal>
        </>
    )
};

export default CreateChannelDialog;
