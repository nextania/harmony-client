import { createSignal } from "solid-js";
import { styled } from "solid-styled-components";

const CallWrapper = styled.div`
    width: 100%;
    margin-top: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
`;

const JoinCallButton = styled.div`
    width: 100px;
    height: 40px;
    background: var(--primary);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    user-select: none;
    &:hover {
        background: var(--primary-hover);
    }
    transition: background 0.2s;
`;

const VoiceContent = () => {
    const [inCall, setInCall] = createSignal(false);
    return (
        <CallWrapper>
            {inCall() ? (
                <div>
                    <h1>Call</h1>
                </div>
            ) : (
                    <JoinCallButton onClick={() => setInCall(true)}>
                        Join Call
                    </JoinCallButton>
            )}
        </CallWrapper>
    );
};

export default VoiceContent;
