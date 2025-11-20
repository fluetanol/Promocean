package com.ssafy.a208.domain.space.dto.request;

import com.ssafy.a208.global.common.validation.AllowedValues;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
public record ParticipantReq(
        @NotBlank
        @Schema(description = "이메일", example = "dlwnsfml@naver.com")
        String email,
        @AllowedValues({10, 20, 30})
        @Schema(description = "참가자 타입", example = "20")
        int role) {
}
