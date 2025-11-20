package com.ssafy.a208.domain.space.dto.request;

import java.util.List;
import lombok.Builder;

@Builder
public record ParticipantListReq(List<ParticipantReq> participantReqs) {
}
