package com.ssafy.a208.domain.space.repository;

import com.ssafy.a208.domain.space.entity.Participant;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Long> {

    Optional<Participant> findByIdAndDeletedAtIsNull(Long id);
    Optional<Participant> findBySpaceIdAndMemberIdAndDeletedAtIsNull(Long spaceId, Long memberId);
    List<Participant> findParticipantByMemberIdAndDeletedAtIsNull(Long memberId);
    List<Participant> findParticipantBySpaceIdAndDeletedAtIsNull(Long spaceId);
}
