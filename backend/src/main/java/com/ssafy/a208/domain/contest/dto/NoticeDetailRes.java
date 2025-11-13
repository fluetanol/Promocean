package com.ssafy.a208.domain.contest.dto;

import com.ssafy.a208.domain.contest.entity.Notice;
import java.time.LocalDateTime;

public record NoticeDetailRes(
        Long noticeId,
        String title,
        String content,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static NoticeDetailRes from(Notice notice) {
        return new NoticeDetailRes(
                notice.getId(),
                notice.getTitle(),
                notice.getContent(),
                notice.getCreatedAt(),
                notice.getUpdatedAt()
        );
    }
}
