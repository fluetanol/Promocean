package com.ssafy.a208.domain.space.reader;

import com.ssafy.a208.domain.space.entity.Participant;
import com.ssafy.a208.domain.space.exception.space.SpaceNotFoundException;
import com.ssafy.a208.domain.space.repository.ParticipantRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ParticipantReader {

    private final ParticipantRepository participantRepository;

    public Participant getParticipant(Long participantId) {
        return participantRepository.findByIdAndDeletedAtIsNull(participantId)
                .orElseThrow(SpaceNotFoundException::new);
    }

    public Participant getParticipantBySpaceIdAndMemberId(Long spaceId, Long memberId) {
        return participantRepository.findBySpaceIdAndMemberIdAndDeletedAtIsNull(spaceId, memberId)
                .orElseThrow(SpaceNotFoundException::new);
    }

    public List<Participant> getParticipantsByMemberId(Long memberId) {
        return participantRepository.findParticipantByMemberIdAndDeletedAtIsNull(memberId);
    }

    public List<Participant> getParticipantsBySpaceId(Long spaceId) {
        return participantRepository.findParticipantBySpaceIdAndDeletedAtIsNull(spaceId);
    }

}
