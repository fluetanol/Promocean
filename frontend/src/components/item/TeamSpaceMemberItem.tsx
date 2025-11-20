import { SpaceParticipants } from "@/api/space";
import { ChangeSpaceRoleToValue, TeamSpaceRole } from "@/enum/TeamSpaceRole";
import Image from "next/image";


export interface TeamSpaceMemberItemProps {
    member: SpaceParticipants;
    index: number;
    currentUserEmail?: string;
    onDelete?: (participantId: number) => void;
    onRoleChange?: (email: string, newRole: TeamSpaceRole) => void;
}



export default function TeamSpaceMemberItem({ member, index, currentUserEmail, onDelete, onRoleChange }: TeamSpaceMemberItemProps){

    const handleRoleChange = async(event: React.ChangeEvent<HTMLSelectElement>) => {
        const newRole = Number(event.target.value) as TeamSpaceRole;
        console.log(`멤버 ${member.nickname}의 역할이 ${newRole}로 변경되었습니다.`);

        if (onRoleChange) {
            // 부모 컴포넌트의 핸들러를 호출 (API 호출 및 state 업데이트 포함)
            onRoleChange(member.email, newRole);
        }
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onDelete) {
            onDelete(member.participantId);
        }
    };

    // 자기 자신인지 확인
    const isSelf = currentUserEmail && member.email === currentUserEmail;

    // 관리 권한 확인 (onRoleChange와 onDelete가 있으면 OWNER)
    const canManage = !!onRoleChange || !!onDelete;

    // role 값을 숫자로 변환 (안전하게)
    const getRoleValue = (): number => {
        const converted = ChangeSpaceRoleToValue(member.role);
        if (converted !== undefined) {
            return converted;
        }
        // fallback: 기본값으로 READER 반환
        console.warn(`Invalid role value: ${member.role}, defaulting to READER`);
        return TeamSpaceRole.READER;
    };

    // role을 한글로 변환
    const getRoleLabel = (role: number): string => {
        switch (role) {
            case TeamSpaceRole.READER:
                return '읽기 허용';
            case TeamSpaceRole.EDITOR:
                return '편집 허용';
            case TeamSpaceRole.OWNER:
                return '소유자';
            default:
                return '알 수 없음';
        }
    };

    return(
            <li key={index} className ="flex flex-row justify-between px-2 py-2 items-center">

                <div className ="flex flex-row items-center gap-3">
                <Image
                    src={member.profileUrl || "/default-profile.png"}
                    alt="프로필 이미지"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                />

                <div className="flex flex-col">
                    <div>{member.nickname}</div>
                    <div className="text-sm text-gray-500">{member.email}</div>
                </div>
                </div>

                <div className="flex items-center gap-2">
                    {canManage ? (
                        /* OWNER인 경우: 드롭다운으로 권한 변경 가능 */
                        <select name="" id=""
                        value={getRoleValue()}
                        onChange={handleRoleChange}
                        className ="hover:bg-gray-200 p-1 border-gray-200
                        outline-none
                        rounded-md">
                            <option value={TeamSpaceRole.READER}>읽기 허용</option>
                            <option value={TeamSpaceRole.EDITOR}>편집 허용</option>
                            <option value={TeamSpaceRole.OWNER}>소유자</option>
                        </select>
                    ) : (
                        /* READER, EDITOR인 경우: 읽기 전용 텍스트로 표시 */
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">
                            {getRoleLabel(getRoleValue())}
                        </span>
                    )}

                    {canManage && !isSelf && (
                        <button
                            type="button"
                            className="flex bg-red-500 rounded-full size-6 text-white justify-center items-center hover:bg-red-600 active:bg-red-700 cursor-pointer transition-colors"
                            onClick={handleDeleteClick}
                        >
                            -
                        </button>
                    )}
                </div>
            </li>
    )
}
