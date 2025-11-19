package com.ssafy.a208.domain.contest.handler;

import com.ssafy.a208.domain.contest.event.VoteCreatedEvent;
import com.ssafy.a208.domain.contest.repository.SubmissionElasticsearchRepository;
import com.ssafy.a208.domain.contest.repository.VoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class SubmissionElasticsearchUpdateHandler {

    private final VoteRepository voteRepository;
    private final SubmissionElasticsearchRepository submissionSearchRepository;

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleVoteCreated(VoteCreatedEvent event) {
        Long submissionId = event.submissionId();
        int voteCount = (int) voteRepository.countBySubmission_Id(submissionId);

        submissionSearchRepository.updateVoteCount(submissionId, voteCount);
    }
}
