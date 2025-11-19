package com.ssafy.a208.domain.contest.repository;

import com.ssafy.a208.domain.contest.entity.Contest;
import com.ssafy.a208.global.common.enums.ContestStatus;
import java.time.LocalDateTime;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ContestRepository extends JpaRepository<Contest, Long> {
    Page<Contest> findByStatus(Pageable pageable, ContestStatus contestStatus);

    Page<Contest> findByTitleContainingIgnoreCase(Pageable pageable, String title);

    Page<Contest> findByStatusAndTitleContainingIgnoreCase(Pageable pageable, ContestStatus contestStatus, String title);

    @Modifying
    @Query("""
        UPDATE Contest c
        SET c.status =
            CASE
                WHEN :now < c.startAt THEN 'SCHEDULED'
                WHEN :now >= c.startAt AND :now < c.endAt THEN 'ONGOING'
                WHEN :now >= c.endAt AND :now < c.voteEndAt THEN 'VOTING'
                WHEN :now >= c.voteEndAt THEN 'FINISHED'
                ELSE c.status
            END
        WHERE c.status <> 'FINISHED'
        """)
    int updateContestStatus(@Param("now") LocalDateTime now);
}
