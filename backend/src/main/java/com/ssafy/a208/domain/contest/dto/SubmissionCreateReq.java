package com.ssafy.a208.domain.contest.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

public record SubmissionCreateReq(
        @NotBlank
        @Schema(description = "프롬프트 내용", example = "네모난 고양이를 그려줘. 도트 그래픽으로 눈은 2x2 크기의 픽셀로 해줘.")
        String prompt,

        @NotBlank
        @Schema(description = "프롬프트 설명", example = "최고의 고양이를 뽑을 수 있어요!")
        String description,

        @NotBlank
        @Schema(description = "프롬프트 결과", example = "이미지 Url or 텍스트 결과")
        String result
) {

}
