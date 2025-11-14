package com.ssafy.a208.domain.alarm.dto;

import com.ssafy.a208.global.common.enums.AlarmCategory;
import lombok.Builder;

@Builder
public record AlarmReq(
        AlarmCategory category,
        Long contestId,
        String contestTitle,
        Long noticeId,
        String noticeTitle,
        Long postId,
        String postTitle,
        Long replyId,
        String replyContent,
        Long spaceId,
        String spaceName
) {

}
