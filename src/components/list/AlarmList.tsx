import AlarmItem, { AlarmItemProps } from "../item/AlarmItem";

export interface AlarmListProps {
    alarmListState : AlarmItemProps[];
    isRemove?: boolean;
    selectedAlarms?: Set<number>;
    onAlarmToggle?: (alarmId: number) => void;
}


export default function AlarmList({
    alarmListState,
    isRemove = false,
    selectedAlarms = new Set(),
    onAlarmToggle,
}: AlarmListProps) {
    return(
        <div className={`flex flex-col flex-1 ${alarmListState.length > 0 ? 'overflow-y-scroll' : ''}`}>
            {alarmListState.length === 0 ? (
                // 알람이 없을 때 빈 상태 UI
                <div className="flex flex-col items-center justify-center flex-1 px-4">
                    <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <svg
                            className="w-8 h-8 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            />
                        </svg>
                    </div>
                    <p className="text-gray-500 text-sm font-medium mb-1">알림이 없습니다</p>
                    <p className="text-gray-400 text-xs text-center">
                        새로운 알림이 도착하면 여기에 표시됩니다
                    </p>
                </div>
            ) : (
                // 알람이 있을 때 목록 표시
                alarmListState.map((alarmItem, index) => (
                    <AlarmItem
                        key={index}
                        alarmId={alarmItem.alarmId}
                        message={alarmItem.message}
                        category={alarmItem.category}
                        createdAt={alarmItem.createdAt}
                        spaceId={alarmItem.spaceId}
                        contestId={alarmItem.contestId}
                        noticeId={alarmItem.noticeId}
                        postId={alarmItem.postId}
                        replyId={alarmItem.replyId}
                        isRemove={isRemove}
                        isChecked={selectedAlarms.has(alarmItem.alarmId)}
                        onToggle={onAlarmToggle}
                    />
                ))
            )}
        </div>
    )

}