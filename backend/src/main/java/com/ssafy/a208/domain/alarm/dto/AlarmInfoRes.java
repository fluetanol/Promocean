package com.ssafy.a208.domain.alarm.dto;

import java.time.LocalDateTime;
import lombok.Builder;

@Builder
public record AlarmInfoRes(
        Long alarmId,
        String message,
        String category,
        LocalDateTime createdAt,
        Long spaceId,
        Long contestId,
        Long noticeId,
        Long postId,
        Long replyId
) {

}
