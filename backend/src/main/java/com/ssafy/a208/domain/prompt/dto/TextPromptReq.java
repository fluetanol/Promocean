package com.ssafy.a208.domain.prompt.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * 텍스트 프롬프트 처리 요청 DTO
 */
public record TextPromptReq(
        @NotBlank(message = "프롬프트는 필수입니다.")
        String prompt,

        @NotBlank(message = "예상 질문은 필수입니다.")
        String exampleQuestion
) {
}