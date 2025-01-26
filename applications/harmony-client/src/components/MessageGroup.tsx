import { styled } from "solid-styled-components";
import avatar from "../assets/default.png";
import { Message } from "./MessageRenderer";
import { formatTime } from "../utilities";


const MessageAvatar = styled.img`
    border-radius: 10px;
    width: 40px;
    height: 40px;
`;

const MessageAuthor = styled.div``;

const MessageAuthorDetails = styled.div`
    display: flex;
    & > * + * {
        margin-left: 10px;
    }
    align-items: center;
`;

const MessageAuthorName = styled.div`
    font-weight: 700;
`;

const MessageAuthorTime = styled.div`
    font-weight: 300;
    font-size: 12px;
    color: #9c9c9c;
`;

const MessageContent = styled.div`
    padding-left: 60px;
    &:hover {
        background: rgba(28, 28, 28, 0.5);
    }
    border-radius: 5px;
    padding-top: 2px;
    padding-bottom: 2px;
`;

const MessageContentGroup = styled.div``;

const MessageGroupBase = styled.div`
    display: flex;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    flex-direction: column;
`;

const FirstMessageContent = styled.div``;

const FirstMessage = styled.div`
    display: flex;
    & > * + * {
        margin-left: 10px;
    }
    &:hover {
        background: rgba(28, 28, 28, 0.5);
    }
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 5px;
`;

const MessageGroup = ({ messages }: { messages: Message[] }) => {
    const [firstMessage, ...rest] = messages;
    return (
        <MessageGroupBase>
            <FirstMessage>
                <MessageAuthor>
                    <MessageAvatar src={avatar}  />
                </MessageAuthor>
                <MessageContentGroup>
                    <MessageAuthorDetails>
                        <MessageAuthorName>{messages[0].author.name}</MessageAuthorName>
                        <MessageAuthorTime>{formatTime(new Date(messages[0].timestamp))}</MessageAuthorTime>
                    </MessageAuthorDetails>
                    <FirstMessageContent>
                        {firstMessage.content}
                    </FirstMessageContent>
                </MessageContentGroup>
            </FirstMessage>
            {rest.map((message) => (
                <MessageContent>
                    {message.content}
                </MessageContent>
            ))}
        </MessageGroupBase>
    );
}

export default MessageGroup;
