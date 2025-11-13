package com.ssafy.a208.domain.contest.dto;

import com.ssafy.a208.domain.contest.entity.Notice;
import java.time.LocalDateTime;

public record NoticeListRes(
        Long noticeId,
        String title,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static NoticeListRes from(Notice notice) {
        return new NoticeListRes(
                notice.getId(),
                notice.getTitle(),
                notice.getCreatedAt(),
                notice.getUpdatedAt()
        );
    }
}
