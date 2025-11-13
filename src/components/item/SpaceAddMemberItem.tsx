import { SpaceParticipants } from "@/api/space";
import { TeamSpaceRole, ChangeSpaceRoleToValue } from "@/enum/TeamSpaceRole";

export interface SpaceAddMemberItemProps {
    member : SpaceParticipants;
    isMinusButton? :boolean;
    handleMemberClick?: (memberName: string) => void;
    onRoleChange?: (email: string, role: TeamSpaceRole) => void;
    onRemove?: (email: string) => void;
    showRoleDropdown?: boolean;
}

export default function SpaceAddMemberItem({
    member,
    isMinusButton=true,
    onRoleChange,
    onRemove,
    showRoleDropdown = false
}: SpaceAddMemberItemProps){

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const newRole = parseInt(e.target.value) as TeamSpaceRole;
        if (onRoleChange) {
            onRoleChange(member.email, newRole);
        }
    };

    const handleRemoveClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onRemove) {
            onRemove(member.email);
        }
    };

    return(
        <div
        className ="flex flex-row w-full justify-between px-4 py-2 gap-3 items-center hover:bg-gray-50
        rounded-md"
        >
            <div className="flex gap-3 items-center flex-1">
                <div className = "rounded-full bg-gray-200 border w-10 h-10"></div>
                <div className = "text-left flex-1">
                    <span className="font-medium text block">{member.nickname}</span>
                    <p className="text-sm text-gray-400">{member.email}</p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                {showRoleDropdown && (
                    <select
                        value={ChangeSpaceRoleToValue(member.role)}
                        onChange={handleRoleChange}
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value={TeamSpaceRole.READ_ONLY}>읽기 전용</option>
                        <option value={TeamSpaceRole.EDITOR}>편집 가능</option>
                    </select>
                )}

                {isMinusButton && (
                    <button
                        type="button"
                        className="flex bg-red-500 rounded-full size-6 text-white justify-center items-center hover:bg-red-600 active:bg-red-700 cursor-pointer transition-colors"
                        onClick={handleRemoveClick}
                    >
                        -
                    </button>
                )}
            </div>
        </div>
    )

}