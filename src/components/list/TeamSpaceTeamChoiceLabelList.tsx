import TeamSpaceTeamChoiceLabelItem from "../item/TeamSpaceTeamChoiceLabelItem";
import { SelectedMember } from "../modal/TeamSpaceAddModal";
import { TeamSpaceRole } from "../item/TeamSpaceRoleItem";



export interface TeamSpaceTeamChoiceLabelListProps{
    //추가 필요시 여기에 작성
    selectedMembersState: Map<string, SelectedMember>;
    setSelectedMembersState: (members: Map<string, SelectedMember>) => void;
}

export default function TeamSpaceTeamChoiceLabelList({ selectedMembersState, setSelectedMembersState }: TeamSpaceTeamChoiceLabelListProps){

    const handleRoleChange = (email: string, newRole: TeamSpaceRole) => {
        const updatedMap = new Map(selectedMembersState);
        const member = updatedMap.get(email);
        if (member) {
            updatedMap.set(email, { ...member, role: newRole });
            setSelectedMembersState(updatedMap);
        }
    };

    const handleRemoveMember = (email: string) => {
        const updatedMap = new Map(selectedMembersState);
        updatedMap.delete(email);
        setSelectedMembersState(updatedMap);
    };

    if (selectedMembersState.size === 0) {
        return null;
    }

    return(
        <div className="flex flex-col gap-2 mb-3 max-h-[250px] overflow-y-auto border border-gray-200 rounded-[10px] p-2">
            {Array.from(selectedMembersState.values()).map((member) => (
                <TeamSpaceTeamChoiceLabelItem
                    key={member.email}
                    member={member}
                    onRoleChange={handleRoleChange}
                    onRemove={handleRemoveMember}
                />
            ))}
        </div>
    )
}