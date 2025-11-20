export enum AlarmCategory {
    "TEAM_INVITATION" = 0,
    "CONTEST_NOTICE" = 1,
    "POST_REPLY" = 2,
}

// 공통 알람 속성
export interface BaseAlarmProps {
    alarmId: number;
    message: string;
    createdAt: string;
    isRemove?: boolean;
    isChecked?: boolean;
    onToggle?: (alarmId: number) => void;
}

// 댓글 알람 전용 속성
export interface AlarmReplyItemProps extends BaseAlarmProps {
    postId: number;
    replyId: number;
}

// 대회 공지 알람 전용 속성
export interface AlarmNoticeItemProps extends BaseAlarmProps {
    contestId: number;
    noticeId: number;
}

// 팀 초대 알람 전용 속성
export interface AlarmInvitationItemProps extends BaseAlarmProps {
    spaceId: number;
}
