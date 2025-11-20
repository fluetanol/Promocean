package com.ssafy.a208.domain.space.dto.response.participant;

import com.ssafy.a208.global.common.enums.ParticipantRole;
import lombok.Builder;

@Builder
public record ParticipantInfo(
        Long participantId,
        String nickname,
        ParticipantRole role,
        String profileUrl,
        String email) {
}
