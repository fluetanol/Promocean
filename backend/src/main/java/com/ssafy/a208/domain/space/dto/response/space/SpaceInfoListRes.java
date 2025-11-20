package com.ssafy.a208.domain.space.dto.response.space;

import java.util.List;
import lombok.Builder;

@Builder
public record SpaceInfoListRes(List<SpaceInfo> spaces) {

}
