package com.ssafy.a208.domain.space.dto.response.space;

import lombok.Builder;

@Builder
public record SpaceInfo(
        Long spaceId,
        String name,
        String spaceCoverUrl,
        int participantCnt,
        String userRole) {

}
