package com.ssafy.a208.domain.prompt.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

import java.util.List;

/**
 * GPT-5 API 요청/응답 DTO
 */
public class GptDto {

    @Builder
    public record Request(
            String model,
            List<Message> messages,
            @JsonInclude(JsonInclude.Include.NON_NULL)
            Double temperature,

            @JsonProperty("max_tokens")
            @JsonInclude(JsonInclude.Include.NON_NULL)
            Integer maxTokens
    ) {
    }

    @Builder
    public record Message(
            String role,
            String content
    ) {
    }

    public record Response(
            String id,
            String object,
            Long created,
            String model,
            List<Choice> choices,
            Usage usage
    ) {
    }

    public record Choice(
            Integer index,
            Message message,
            @JsonProperty("finish_reason") String finishReason
    ) {
    }

    public record Usage(
            @JsonProperty("prompt_tokens") Integer promptTokens,
            @JsonProperty("completion_tokens") Integer completionTokens,
            @JsonProperty("total_tokens") Integer totalTokens
    ) {
    }
}