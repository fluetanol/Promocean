import { SpaceParticipants } from "@/api/space";
import TeamSpaceMemberItem from "../item/TeamSpaceMemberItem";
import { TeamSpaceRole } from "@/enum/TeamSpaceRole";



export interface TeamSpaceMemberListProps {
    memberListState: SpaceParticipants[];
    currentUserEmail?: string;
    onDelete?: (participantId: number) => void;
    onRoleChange?: (email: string, newRole: TeamSpaceRole) => void;
    canManageMembers?: boolean; // OWNER만 멤버 관리 가능
}


export default function TeamSpaceMemberList({ memberListState, currentUserEmail, onDelete, onRoleChange, canManageMembers = true }: TeamSpaceMemberListProps){

    // 팀원이 없는 경우 빈 상태 표시
    if (!memberListState || memberListState.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center w-full py-12 px-4">
                <div className="flex flex-col items-center gap-3">
                    <svg
                        className="w-16 h-16 text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                    <div className="text-center">
                        <p className="text-gray-600 font-medium mb-1">팀원이 없습니다</p>
                        <p className="text-gray-400 text-sm">팀원을 초대하여 함께 작업해보세요</p>
                    </div>
                </div>
            </div>
        );
    }

    return(

            <ul className ="flex flex-col gap-2 w-full py-2 [&>li]:rounded-md [&>li]:px-2 [&>li:hover]:bg-gray-100
                overflow-y-scroll max-h-60">

                    {memberListState.map((member, index) => (
                        <TeamSpaceMemberItem
                            key={index}
                            member={member}
                            index={index}
                            currentUserEmail={currentUserEmail}
                            onDelete={canManageMembers ? onDelete : undefined}
                            onRoleChange={canManageMembers ? onRoleChange : undefined}
                        />
                    ))}

                </ul>


    )

}
