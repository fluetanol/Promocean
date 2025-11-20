package com.ssafy.a208.domain.contest.service;

import com.ssafy.a208.domain.contest.entity.Contest;
import com.ssafy.a208.domain.contest.entity.Submission;
import com.ssafy.a208.domain.contest.entity.Vote;
import com.ssafy.a208.domain.contest.event.VoteCreatedEvent;
import com.ssafy.a208.domain.contest.exception.ContestNotFoundException;
import com.ssafy.a208.domain.contest.exception.DuplicateVoteException;
import com.ssafy.a208.domain.contest.exception.SubmissionNotFoundException;
import com.ssafy.a208.domain.contest.repository.ContestRepository;
import com.ssafy.a208.domain.contest.repository.SubmissionElasticsearchRepository;
import com.ssafy.a208.domain.contest.repository.SubmissionRepository;
import com.ssafy.a208.domain.contest.repository.VoteRepository;
import com.ssafy.a208.domain.contest.util.ContestValidator;
import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.member.reader.MemberReader;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class VoteService {

    private final VoteRepository voteRepository;
    private final ContestRepository contestRepository;
    private final SubmissionRepository submissionRepository;
    private final SubmissionElasticsearchRepository submissionSearchRepository;
    private final MemberReader memberReader;

    private final ContestValidator contestValidator;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional
    public void createVote(Long contestId, Long submissionId, CustomUserDetails customUserDetails) {
        Contest contest = contestRepository.findById(contestId)
                .orElseThrow(ContestNotFoundException::new);
        Submission submission = submissionRepository.findById(submissionId)
                .orElseThrow(SubmissionNotFoundException::new);
        Member member = memberReader.getMemberById(customUserDetails.memberId());

        contestValidator.validateVoteDate(contest);

        if(voteRepository.existsBySubmission_IdAndMember_Id(submission.getId(), member.getId())) {
            throw new DuplicateVoteException();
        }

        Vote vote = Vote.builder()
                .contest(contest)
                .submission(submission)
                .member(member)
                .build();

        voteRepository.save(vote);
        submission.increaseVoteCount();
        eventPublisher.publishEvent(new VoteCreatedEvent(submissionId));
    }

    @Transactional(readOnly = true)
    public boolean isVoted(Long submissionId, Long memberId) {
        return voteRepository.existsBySubmission_IdAndMember_Id(submissionId, memberId);
    }
}
