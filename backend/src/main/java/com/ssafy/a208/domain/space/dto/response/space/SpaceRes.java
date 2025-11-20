package com.ssafy.a208.domain.space.dto.response.space;

import lombok.Builder;

@Builder
public record SpaceRes(Long spaceId, String name, String spaceCoverUrl) {

}
