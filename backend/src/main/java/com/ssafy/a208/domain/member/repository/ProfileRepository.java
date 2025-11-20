package com.ssafy.a208.domain.member.repository;

import com.ssafy.a208.domain.member.entity.Profile;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {

    Optional<Profile> findByMemberIdAndDeletedAtIsNull(Long memberId);

    @Query("""
        select p
        from Profile p
        WHERE p.member.id in :memberIds
        """)
    List<Profile> findByMemberIdIn(@Param("memberIds") Collection<Long> memberIds);
}
