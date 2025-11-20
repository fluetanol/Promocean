package com.ssafy.a208.domain.prompt.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;

import java.util.List;

/**
 * Gemini Image Generation API 요청 DTO
 */
public class GeminiDto {

    @Builder
    public record Request(
            List<Content> contents,

            @JsonInclude(JsonInclude.Include.NON_NULL)
            GenerationConfig generationConfig
    ) {
    }

    @Builder
    public record Content(
            List<Part> parts
    ) {
    }

    @Builder
    public record Part(
            String text
    ) {
    }

    @Builder
    public record GenerationConfig(
            List<String> responseModalities
    ) {
    }
}