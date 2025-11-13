package com.ssafy.a208.domain.contest.dto;

import com.ssafy.a208.global.common.validation.AllowedValues;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

public record ContestCreateReq(
        @Size(max = 100, message = "제목은 100자를 넘을 수 없습니다.")
        @NotBlank
        @Schema(description = "제목", example = "천하 제일 프롬프팅 대회")
        String title,

        @Schema(description = "내용", example = "와하하 천하 제일 프롬프팅 대회입니다")
        String content,

        @AllowedValues({1, 2})
        @Schema(description = "결과 타입", example = "1")
        int type,

        @NotNull
        @Schema(description = "제출 시작 일자", example = "2025-11-20T00:00:00")
        LocalDateTime startAt,

        @NotNull
        @Schema(description = "제출 종료 일자", example = "2025-11-22T23:59:59")
        LocalDateTime endAt,

        @NotNull
        @Schema(description = "투표 종료 일자", example = "2025-11-25T23:59:59")
        LocalDateTime voteEndAt
) {
}
