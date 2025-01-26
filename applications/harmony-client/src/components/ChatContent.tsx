
import { styled } from "solid-styled-components";
import ChatInput from "./ChatInput";
import MessageRenderer from "./MessageRenderer";
import { createEffect } from "solid-js";


const ChatMessages = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    /* justify-content: flex-end; */
    flex-direction: column;
    overflow-x: hidden;
    &:first-child {
        margin-top: 20px;
    }
`;
const ChatInputBox = styled.div`
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
`;

const ChatBeginning = styled.div`
    width: 100%;
    padding: 20px;
    margin-top: 60px;
`;
const ChatContent = () => {
    // const [message, setMessage] = createSignal("");
    // let divRef: HTMLDivElement | undefined;
    // createEffect(() => {
    //     if (divRef) {
    //         const selection = window.getSelection();
    //         // if something is selected
    //         if (selection && selection.rangeCount > 0) {
    //             const range = selection.getRangeAt(0);
    //             const position = range.startOffset;
                
    //             // Update content
    //             divRef.textContent = message();
                
    //             // Restore the cursor position
    //             const newRange = document.createRange();
    //             console.log(position, divRef.textContent.length);
    //             newRange.setStart(divRef, Math.min(position, divRef.textContent.length) - 1);
    //             newRange.setEnd(divRef, Math.min(position, divRef.textContent.length) - 1);
    //             newRange.collapse(true);
                
    //             selection.removeAllRanges();
    //             selection.addRange(newRange);
    //         } else {
    //             // If no selection, update content as usual
    //             divRef.textContent = message();
    //         }
    //     }
    // });

    let messagesRef: HTMLDivElement | undefined;

    createEffect(() => {
        if (messagesRef) {
            messagesRef.scrollTop = messagesRef.scrollHeight;
        }
    })
      
    return (
        <>
            <ChatMessages ref={messagesRef}>
                <ChatBeginning>
                    This is the beginning of the channel.
                </ChatBeginning>
                <MessageRenderer messages={[
                    {
                        id: "1",
                        content: "Hello!",
                        timestamp: Date.now(),
                        author: {
                            id: "1",
                            name: "User 1",
                            avatar: "https://i.pravatar.cc/300",
                        }
                    },
                    {
                        id: "2",
                        content: "Hi!",
                        timestamp: Date.now(),
                        author: {
                            id: "2",
                            name: "User 2",
                            avatar: "https://i.pravatar.cc/300",
                        }
                    },
                    {
                        id: "3",
                        content: "How are you?",
                        timestamp: Date.now(),
                        author: {
                            id: "1",
                            name: "User 1",
                            avatar: "https://i.pravatar.cc/300",
                        }
                    },
                    {
                        id: "4",
                        content: "I'm good, thanks!",
                        timestamp: Date.now(),
                        author: {
                            id: "2",
                            name: "User 2",
                            avatar: "https://i.pravatar.cc/300",
                        }
                    },
                    {
                        id: "5",
                        content: "How about you?",
                        timestamp: Date.now(),
                        author: {
                            id: "2",
                            name: "User 2",
                            avatar: "https://i.pravatar.cc/300",
                        }
                    },
                    {
                        id: "6",
                        content: "I'm doing great!",
                        timestamp: Date.now(),
                        author: {
                            id: "1",
                            name: "User 1",
                            avatar: "https://i.pravatar.cc/300",
                        }
                    },
                    {
                        id: "7",
                        content: "That's good to hear!",
                        timestamp: Date.now(),
                        author: {
                            id: "2",
                            name: "User 2",
                            avatar: "https://i.pravatar.cc/300",
                        }
                    },
                    {
                        id: "8",
                        content: "Yeah!",
                        timestamp: Date.now(),
                        author: {
                            id: "1",
                            name: "User 1",
                            avatar: "https://i.pravatar.cc/300",
                        }
                    },
                    {
                        id: "9",
                        content: "I'm glad you're doing well!",
                        timestamp: Date.now(),
                        author: {
                            id: "2",
                            name: "User 2",
                            avatar: "https://i.pravatar.cc/300",
                        }
                    },
                    {
                        id: "10",
                        content: "Thanks!",
                        timestamp: Date.now(),
                        author: {
                            id: "1",
                            name: "User 1",
                            avatar: "https://i.pravatar.cc/300",
                        }
                    },
                    {
                        id: "11",
                        content: "No problem!",
                        timestamp: Date.now(),
                        author: {
                            id: "2",
                            name: "User 2",
                            avatar: "https://i.pravatar.cc/300",
                        }
                    },
                    {
                        id: "12",
                        content: "How's your day going?",
                        timestamp: Date.now(),
                        author: {
                            id: "2",
                            name: "User 2",
                            avatar: "https://i.pravatar.cc/300",
                        }
                    },
                    {
                        id: "13",
                        content: "It's going well!",
                        timestamp: Date.now(),
                        author: {
                            id: "1",
                            name: "User 1",
                            avatar: "https://i.pravatar.cc/300",
                        }
                    },
                    {
                        id: "14",
                        content: "That's great!",
                        timestamp: Date.now(),
                        author: {
                            id: "2",
                            name: "User 2",
                            avatar: "https://i.pravatar.cc/300",
                        }
                    },
                    {
                        id: "15",
                        content: "Yeah!",
                        timestamp: Date.now(),
                        author: {
                            id: "1",
                            name: "User 1",
                            avatar: "https://i.pravatar.cc/300",
                        }
                    },
                    {
                        id: "16",
                        content: "I'm glad you're doing well!",
                        timestamp: Date.now(),
                        author: {
                            id: "2",
                            name: "User 2",
                            avatar: "https://i.pravatar.cc/300",
                        }
                    },
                ]} />
            </ChatMessages>
            <ChatInputBox>
                <ChatInput />
            </ChatInputBox>
        </>
    )
}

export default ChatContent;
