'use client';

import AlarmReplyItem from "./alarm/AlarmReplyItem";
import AlarmNoticeItem from "./alarm/AlarmNoticeItem";
import AlarmInvitationItem from "./alarm/AlarmInvitationItem";
import { AlarmCategory } from "./alarm/alarmTypes";

export interface AlarmItemProps {
    alarmId: number;
    message: string;
    category: string;
    createdAt: string;
    spaceId?: number;
    contestId?: number;
    noticeId?: number;
    postId?: number;
    replyId?: number;
    isRemove?: boolean;
    isChecked?: boolean;
    onToggle?: (alarmId: number) => void;
}

export default function AlarmItem(props: AlarmItemProps) {
    const {
        category,
        alarmId,
        message,
        createdAt,
        spaceId,
        contestId,
        noticeId,
        postId,
        replyId,
        isRemove,
        isChecked,
        onToggle,
    } = props;

    // console.log('AlarmItem - category:', category, 'type:', typeof category);
    // console.log('AlarmItem - postId:', postId, 'replyId:', replyId);
    // console.log('AlarmItem - contestId:', contestId, 'noticeId:', noticeId);
    // console.log('AlarmItem - spaceId:', spaceId);

    // 댓글 알람 (POST_REPLY = 2)
    if (category === "POST_REPLY" && postId !== undefined && replyId !== undefined) {
        return (
            <AlarmReplyItem
                alarmId={alarmId}
                message={message}
                createdAt={createdAt}
                postId={postId}
                replyId={replyId}
                isRemove={isRemove}
                isChecked={isChecked}
                onToggle={onToggle}
            />
        );
    }

    // 대회 공지 알람 (CONTEST_NOTICE = 1)
    if (category === "CONTEST_NOTICE" && contestId !== undefined && noticeId !== undefined) {
        return (
            <AlarmNoticeItem
                alarmId={alarmId}
                message={message}
                createdAt={createdAt}
                contestId={contestId}
                noticeId={noticeId}
                isRemove={isRemove}
                isChecked={isChecked}
                onToggle={onToggle}
            />
        );
    }

    // 팀 초대 알람 (TEAM_INVITATION = 0)
    if (category === "TEAM_INVITATION" && spaceId !== undefined) {
        return (
            <AlarmInvitationItem
                alarmId={alarmId}
                message={message}
                createdAt={createdAt}
                spaceId={spaceId}
                isRemove={isRemove}
                isChecked={isChecked}
                onToggle={onToggle}
            />
        );
    }

    // 예외 처리: 알 수 없는 카테고리
    console.error('Unknown alarm category or missing required props:', props);
    return null;
}