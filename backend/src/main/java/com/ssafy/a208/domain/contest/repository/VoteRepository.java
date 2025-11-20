package com.ssafy.a208.domain.contest.repository;

import com.ssafy.a208.domain.contest.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {

    boolean existsBySubmission_IdAndMember_Id(Long submissionId, Long memberId);

    long countBySubmission_Id(Long submissionId);
}
