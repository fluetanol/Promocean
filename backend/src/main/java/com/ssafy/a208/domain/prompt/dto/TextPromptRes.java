package com.ssafy.a208.domain.prompt.dto;

import lombok.Builder;

/**
 * 텍스트 프롬프트 처리 응답 DTO
 * GPT-5 API를 통해 생성된 답변을 반환
 */
@Builder
public record TextPromptRes(
        String exampleAnswer
) {
}