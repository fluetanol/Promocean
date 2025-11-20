package com.ssafy.a208.domain.space.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record ParticipantNicknameUpdateReq(
        @NotBlank @Size(max = 10, message = "닉네임은 10자를 넘을 수 없습니다.")
        @Schema(description = "닉네임", example = "따뜻한 고구마")
        String nickname
) {

}
