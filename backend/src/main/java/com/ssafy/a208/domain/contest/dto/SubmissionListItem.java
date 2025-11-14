package com.ssafy.a208.domain.contest.dto;

import com.ssafy.a208.domain.contest.entity.Submission;
import java.time.LocalDateTime;

public record SubmissionListItem(
        Long submissionId,
        String author,
        String profileUrl,
        String description,
        String type,
        String submissionUrl,
        long voteCnt,
        LocalDateTime updatedAt
) {
    public static SubmissionListItem from(
            Submission submission,
            String profileUrl,
            String submissionUrl
    ) {
        return new SubmissionListItem(
                submission.getId(),
                submission.getMember().getNickname(),
                profileUrl,
                submission.getDescription(),
                submission.getType().getName(),
                submissionUrl,
                submission.getVoteCount(),
                submission.getUpdatedAt()
        );
    }
}
