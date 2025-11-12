import SpaceAddMemberItem, { SpaceAddMemberItemProps } from "../item/SpaceAddMemberItem";
import { SelectedMember } from "../modal/TeamSpaceAddModal";
import { TeamSpaceRole } from "../item/TeamSpaceRoleItem";


export interface SpaceAddMemberListProps{
    searchSpaceMemberListState: SpaceAddMemberItemProps[];
    selectedMembersState: Map<string, SelectedMember>;
    setSelectedMembersState: (members: Map<string, SelectedMember>) => void;
}



export default function TeamSpaceAddMemberList({ searchSpaceMemberListState, selectedMembersState, setSelectedMembersState }: SpaceAddMemberListProps){

    const handleMemberClick = (member: SpaceAddMemberItemProps) => {
        const updatedMap = new Map(selectedMembersState);
        if (updatedMap.has(member.email)) {
            updatedMap.delete(member.email); //이미 선택된 항목이면 다시 눌러서 제거 가능하게 하려는 거임
        } else {
            updatedMap.set(member.email, {
                name: member.name,
                email: member.email,
                role: TeamSpaceRole.EDIT // 기본값은 편집 허용
            });    //새로 선택된 항목이면 당연히 추가
        }
        setSelectedMembersState(updatedMap);
    };

    return(
        <div className ="absolute bg-white overflow-y-scroll w-full h-[300px] border border-t-0 border-gray-300 rounded-[10px] p-2.5 gap-2.5">
            {searchSpaceMemberListState.map((member) => (
                <SpaceAddMemberItem key={member.email} name={member.name} email={member.email}
                handleMemberClick={() => handleMemberClick(member)}
                isMinusButton={false}/>
            ))}
        </div>
    )
}