import { SelectedMember } from "../modal/TeamSpaceAddModal";
import { TeamSpaceRole } from "@/enum/TeamSpaceRole";


export interface TeamSpaceTeamChoiceLabelItemProps{
    //추가 필요시 여기에 작성
    member: SelectedMember;
    onRoleChange: (email: string, role: TeamSpaceRole) => void;
    onRemove: (email: string) => void;
}


export default function TeamSpaceTeamChoiceLabelItem({ member, onRoleChange, onRemove }: TeamSpaceTeamChoiceLabelItemProps){

    return(
        <div className="flex flex-row w-full justify-between px-4 py-3 gap-3 items-center hover:bg-gray-50 rounded-md">
            <div className="flex gap-3 items-center flex-1 min-w-0">
                <div className="rounded-full bg-gray-200 border w-10 h-10 shrink-0"></div>
                <div className="text-left overflow-hidden">
                    <p className="font-medium text-sm truncate">{member.name}</p>
                    <p className="text-xs text-gray-400 truncate">{member.email}</p>
                </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
                <select
                    value={member.role}
                    onChange={(e) => onRoleChange(member.email, Number(e.target.value) as TeamSpaceRole)}
                    className="hover:bg-gray-200 px-2 py-1 border-gray-200 outline-none rounded-md text-sm"
                >
                    <option value={TeamSpaceRole.READER}>읽기 허용</option>
                    <option value={TeamSpaceRole.EDITOR}>편집 허용</option>
                    <option value={TeamSpaceRole.OWNER}>소유자</option>
                </select>

                <button
                    type="button"
                    className="flex bg-red-500 rounded-full size-6 text-white justify-center items-center hover:bg-red-600 active:bg-red-700 text-sm"
                    onClick={() => onRemove(member.email)}
                >
                    ×
                </button>
            </div>
        </div>
    )
}