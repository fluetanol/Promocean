package com.ssafy.a208.domain.prompt.dto;

import lombok.Builder;

/**
 * 이미지 프롬프트 처리 응답 DTO
 * Gemini API를 통해 생성된 이미지 정보를 반환
 */
@Builder
public record ImagePromptRes(
        String cloudfrontUrl,
        String key
) {
}