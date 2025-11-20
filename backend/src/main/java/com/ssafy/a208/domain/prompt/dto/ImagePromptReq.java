package com.ssafy.a208.domain.prompt.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * 이미지 생성 프롬프트 요청 DTO
 */
public record ImagePromptReq(
        @NotBlank(message = "프롬프트는 필수입니다.")
        String prompt
) {
}