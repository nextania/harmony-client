import { styled } from "solid-styled-components";
import { ChevronDownIcon, ChevronRightIcon } from "solid-fluent-icons/12";
import Avatar from "./Avatar";
import avatar from "./assets/default.png";
import { createSignal } from "solid-js";

const MemberCategoryBase = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 5px;
    padding-right: 5px;
`;

const MemberCategoryHeading = styled.div`
    display: flex;
    align-items: center;
    & > * + * {
        margin-left: 8px;
    }
    border-radius: 5px;
    padding-left: 5px;
    padding-right: 5px;
    &:hover {
        background: rgba(50, 50, 50, 0.6);
    }
`;

const MemberCategoryTitle = styled.div`
    font-size: 16px;
    font-weight: 500;
    user-select: none;
`;

const MemberCategoryCount = styled.div`
    font-size:14px;
    font-weight:300;
    user-select: none;
`;

const MemberList = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    & > * + * {
        margin-top: 10px;
    }
`;

const Member = styled.div<{ collapsed: boolean }>`
    display: flex;
    & > * + * {
        margin-left: 10px;
    }
    align-items: center;
    margin-left: 25px;

    ${props => props.collapsed ? `
        display: none;
    `: ``}
`;

const MemberName = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;
`;

export interface MemberCategoryCollection {
    name: string;
    count: number;
    members: {
        name: string;
        avatar: string;
        status: "online" | "away" | "busy" | "busy_notify";
    }[];
}

const MemberCategory = ({ category }: { category: MemberCategoryCollection }) => {
    const [collapsed, setCollapsed] = createSignal(false);
    return (
        <MemberCategoryBase>
            <MemberCategoryHeading onClick={() => setCollapsed(!collapsed())}>
                {collapsed() ? <ChevronRightIcon /> : <ChevronDownIcon /> }
                <MemberCategoryTitle>{category.name}</MemberCategoryTitle>
                <MemberCategoryCount>({category.count})</MemberCategoryCount>
            </MemberCategoryHeading>
            <MemberList>
                {category.members.map(member => (
                    <Member collapsed={collapsed()}>
                        <Avatar url={member.avatar} status={member.status} />
                        <MemberName>{member.name}</MemberName>
                    </Member>
                ))}
            </MemberList>
        </MemberCategoryBase>
    )
};

export default MemberCategory;