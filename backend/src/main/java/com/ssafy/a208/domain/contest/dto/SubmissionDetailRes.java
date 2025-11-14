package com.ssafy.a208.domain.contest.dto;

import com.ssafy.a208.domain.contest.entity.Submission;
import com.ssafy.a208.global.common.enums.PromptType;
import java.time.LocalDateTime;

public record SubmissionDetailRes(
        Long submissionId,
        String author,
        String profileUrl,
        String description,
        String prompt,
        String type,
        String result,
        long voteCnt,
        boolean isVoted,
        LocalDateTime updatedAt
) {
    public static SubmissionDetailRes from(
            Submission submission,
            String fileUrl,
            String profileUrl,
            boolean isVoted
    ) {
        return new SubmissionDetailRes(
                submission.getId(),
                submission.getMember().getNickname(),
                profileUrl,
                submission.getDescription(),
                submission.getPrompt(),
                submission.getType().getName(),
                submission.getType() == PromptType.IMAGE
                        ? fileUrl
                        : submission.getResult(),
                submission.getVoteCount(),
                isVoted,
                submission.getUpdatedAt()
        );
    }
}
