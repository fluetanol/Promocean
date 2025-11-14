package com.ssafy.a208.domain.contest.repository;

import com.ssafy.a208.domain.contest.entity.Submission;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Long> {

    Page<Submission> findByContest_Id(Long contestId, Pageable pageable);

    Page<Submission> findByContest_IdAndMember_Nickname(Long contestId, String nickname, Pageable pageable);

    Optional<Submission> findByContest_IdAndMember_Id(Long contestId, Long memberId);
}
