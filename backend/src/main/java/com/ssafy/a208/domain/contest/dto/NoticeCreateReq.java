package com.ssafy.a208.domain.contest.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record NoticeCreateReq(

        @Size(max = 100, message = "제목은 100자를 넘을 수 없습니다.")
        @NotBlank
        @Schema(description = "제목", example = "우승자 발표")
        String title,

        @NotBlank
        @Schema(description = "내용", example = "1등 우승 상금은 백만원이고 당첨자는 @@입니다.")
        String content
) {

}
