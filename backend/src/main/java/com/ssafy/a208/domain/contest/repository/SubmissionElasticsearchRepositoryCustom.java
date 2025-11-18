package com.ssafy.a208.domain.contest.repository;

import com.ssafy.a208.domain.contest.document.SubmissionDocument;
import org.springframework.data.domain.Page;
import java.time.LocalDateTime;

public interface SubmissionElasticsearchRepositoryCustom {

    Page<SubmissionDocument> searchSubmissions(
            Long contestId,
            int page,
            int size,
            String sorter,
            String filterAuthor,
            String filterKeyword
    );

    void updateSubmission(
            Long id,
            String prompt,
            String description,
            String result,
            String filePath,
            LocalDateTime updatedAt
    );

    void updateMemberInfo(
            String oldNickname,
            String newNickname,
            String newProfilePath
    );

    void updateVoteCount(
            Long id,
            int voteCount
    );
}
