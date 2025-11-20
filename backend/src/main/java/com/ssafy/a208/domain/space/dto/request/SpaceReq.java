package com.ssafy.a208.domain.space.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;
import lombok.Builder;

@Builder
public record SpaceReq(
        @NotBlank
        @Size(max = 50, message = "스페이스명은 50자를 넘을 수 없습니다.")
        @Schema(description = "스페이스명", example = "성실한감자모임")
        String name,
        @Schema(description = "참가자들")
        List<ParticipantReq> participants) {
}
