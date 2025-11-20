package com.ssafy.a208.domain.contest.repository;

import com.ssafy.a208.domain.contest.entity.Submission;
import com.ssafy.a208.domain.member.entity.Member;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Long> {

    Page<Submission> findByContest_Id(Long contestId, Pageable pageable);

    Page<Submission> findByContest_IdAndMember_Nickname(Long contestId, String nickname, Pageable pageable);

    Page<Submission> findByContest_IdAndDescriptionContainingIgnoreCase(
            Long contestId,
            String keyword,
            Pageable pageable
    );

    Page<Submission> findByContest_IdAndMember_NicknameAndDescriptionContainingIgnoreCase(
            Long contestId,
            String nickname,
            String keyword,
            Pageable pageable
    );

    Optional<Submission> findByContest_IdAndMember_Id(Long contestId, Long memberId);

    boolean existsByContest_IdAndMember_Id(Long contestId, Long memberId);

    @Query("""
            SELECT s.member
            FROM Submission s
            WHERE s.contest.id = :contestId
            """)
    List<Member> findAllMemberByContest(@Param("contestId") Long contestId);
}
