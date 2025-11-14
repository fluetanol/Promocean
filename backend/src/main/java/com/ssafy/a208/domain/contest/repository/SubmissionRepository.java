package com.ssafy.a208.domain.contest.repository;

import com.ssafy.a208.domain.contest.entity.Submission;
import com.ssafy.a208.domain.member.entity.Member;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Long> {

    Page<Submission> findByContest_Id(Long contestId, Pageable pageable);

    Page<Submission> findByContest_IdAndMember_Nickname(Long contestId, String nickname,
            Pageable pageable);

    @Query("""
            SELECT s.member
            FROM Submission s
            WHERE s.contest.id = :contestId
            """)
    List<Member> findAllMemberByContest(@Param("contestId") Long contestId);
}
