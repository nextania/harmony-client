import { ParentProps } from "solid-js";

const GenericChannel = (props: ParentProps) => {

    return (
        <>
            {props.children}
        </>
    )
};

export default GenericChannel;