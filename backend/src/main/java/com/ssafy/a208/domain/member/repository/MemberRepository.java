package com.ssafy.a208.domain.member.repository;

import com.ssafy.a208.domain.member.entity.Member;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    @Query(""" 
            SELECT m FROM Member m LEFT JOIN FETCH m.profile 
                        WHERE m.nickname = :nickname AND m.deletedAt IS NULL
            """)
    Optional<Member> findByNicknameAndDeletedAtIsNull(String nickname);

    @Query(""" 
            SELECT m FROM Member m LEFT JOIN FETCH m.profile 
                        WHERE m.email = :email AND m.deletedAt IS NULL
            """)
    Optional<Member> findByEmailAndDeletedAtIsNull(String email);

    @Query(""" 
            SELECT m FROM Member m LEFT JOIN FETCH m.profile 
                        WHERE m.id = :id AND m.deletedAt IS NULL
            """)
    Optional<Member> findByIdAndDeletedAtIsNull(Long id);

    @Query("""
              SELECT CASE WHEN COUNT(m) > 0 THEN TRUE ELSE FALSE END
              FROM Member m
              WHERE m.email = :email
                AND m.deletedAt IS NULL
            """)
    boolean existsByEmail(String email);

    @Query("""
                SELECT CASE WHEN COUNT(m) > 0 THEN TRUE ELSE FALSE END
                FROM Member m
                WHERE m.nickname = :nickname
                  AND m.deletedAt IS NULL
            """)
    boolean existsByNickname(String nickname);

    @Query(""" 
            SELECT m 
            FROM Member m 
            LEFT JOIN FETCH m.profile 
            WHERE m.id IN :ids AND m.deletedAt IS NULL
            """)
    List<Member> findAllByIdInAndDeletedAtIsNull(Collection<Long> ids);

    @Modifying
    @Query("UPDATE Member m SET m.usableCnt = :count WHERE m.deletedAt IS NULL")
    int updateAllUsableCount(@Param("count") int count);
}
