package com.ssafy.a208.domain.tag.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "태그 자동완성 응답")
public record TagAutocompleteDto(

        @Schema(description = "태그 ID", example = "1")
        Long tagId,

        @Schema(description = "태그 이름", example = "개발")
        String name,

        @Schema(description = "사용 횟수 (Post + Article)", example = "234")
        Integer usageCnt
) {}