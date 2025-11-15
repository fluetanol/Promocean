package com.ssafy.a208.domain.contest.dto;

import com.ssafy.a208.domain.contest.entity.Contest;
import java.time.LocalDateTime;

public record ContestListItem(
        Long contestId,
        String title,
        String author,
        String profileUrl,
        LocalDateTime startAt,
        LocalDateTime endAt,
        LocalDateTime voteEndAt,
        String status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static ContestListItem from(Contest contest, String profileUrl) {
        return new ContestListItem(
                contest.getId(),
                contest.getTitle(),
                contest.getHost().getNickname(),
                profileUrl,
                contest.getStartAt(),
                contest.getEndAt(),
                contest.getVoteEndAt(),
                contest.getStatus().getName(),
                contest.getCreatedAt(),
                contest.getUpdatedAt()
        );
    }
}
