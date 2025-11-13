package com.ssafy.a208.domain.alarm.dto;

import com.ssafy.a208.global.common.enums.AlarmCategory;
import lombok.Builder;


@Builder
public record AlarmDto(
        Long alarmId,
        Long memberId,
        AlarmCategory category,
        String message,
        long createdAt,
        Long contestId,
        Long noticeId,
        Long postId,
        Long replyId,
        Long spaceId
) {

}
