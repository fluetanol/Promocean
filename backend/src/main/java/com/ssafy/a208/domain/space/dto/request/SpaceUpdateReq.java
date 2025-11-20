package com.ssafy.a208.domain.space.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record SpaceUpdateReq(
        @Schema(description = "스페이스명", example = "성실한고구마모임")
        String name,
        @Schema(description = "스페이스 커버 파일 경로", example = "tmp/file.png")
        String spaceCoverPath) {

}
