'use client';

import { useRouter } from "next/navigation";
import { AlarmInvitationItemProps } from "./alarmTypes";
import { getRelativeTime, parseMessage } from "./alarmUtils";

export default function AlarmInvitationItem({
    alarmId,
    message,
    createdAt,
    spaceId,
    isRemove = false,
    isChecked = false,
    onToggle,
}: AlarmInvitationItemProps) {
    const router = useRouter();

    const handleCheckboxChange = () => {
        if (onToggle) {
            onToggle(alarmId);
        }
    };

    const handleItemClick = () => {
        if (isRemove) return;
        // TODO: 팀 스페이스로 이동
        console.log("스페이스 아이디 ",spaceId)
        router.push(`/team-space/${spaceId}`);
    };

    const { messageHeading, messageParts } = parseMessage(message);
    console.log('AlarmInvitationItem messageParts:', messageParts, message);

    return (
        <button
            className={`flex flex-row items-center justify-between h-20 p-4 border-b w-full
            ${isRemove && isChecked
                    ? 'bg-blue-50 border-blue-300 border-b-2'
                    : 'border-gray-300 hover:bg-gray-200 hover:cursor-pointer active:bg-gray-300 active:border-primary active:border-b-2'
                }
            transition-colors duration-150
        `}
            onClick={handleItemClick}
        >
            {/* 메인 컨텐츠 영역 */}
            <div className="flex flex-col gap-1 flex-1 min-w-0 text-left">
                {/* 첫 번째 줄: 제목 + 시간 */}
                <div className="flex items-center justify-between gap-2">
                    <span className="text-base font-medium truncate flex-1">{messageHeading}</span>
                    <span className="text-xs text-gray-500 whitespace-nowrap shrink-0">
                        {getRelativeTime(createdAt)}
                    </span>
                </div>
                {/* 두 번째 줄: 내용 */}
                <div className="text-sm text-gray-400 truncate">
                    {messageParts.join(' ')}
                </div>
            </div>

            {/* 체크박스 영역 */}
            {isRemove && (
                <input
                    type="checkbox"
                    className="ml-3 size-5 accent-blue-500 cursor-pointer shrink-0"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
            )}
        </button>
    );
}
