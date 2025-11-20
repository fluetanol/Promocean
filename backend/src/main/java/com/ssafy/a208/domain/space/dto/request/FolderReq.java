package com.ssafy.a208.domain.space.dto.request;

import com.ssafy.a208.domain.space.validation.Color;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record FolderReq(
        @NotBlank @Size(max = 30, message = "폴더 이름은 30자를 넘을 수 없습니다")
        @Schema(description = "폴더명", example = "취업")
        String name,

        @NotBlank @Color
        @Schema(description = "폴더 색상", example = "FFF00f")
        String color
) {

}
