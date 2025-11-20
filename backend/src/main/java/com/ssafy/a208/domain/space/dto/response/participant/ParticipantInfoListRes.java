package com.ssafy.a208.domain.space.dto.response.participant;

import java.util.List;
import lombok.Builder;

@Builder
public record ParticipantInfoListRes(List<ParticipantInfo> participants) {
}
