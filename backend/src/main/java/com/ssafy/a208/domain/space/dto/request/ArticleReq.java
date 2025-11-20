package com.ssafy.a208.domain.space.dto.request;

import com.ssafy.a208.global.common.validation.AllowedValues;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.Set;

public record ArticleReq(
        @NotBlank
        @Size(max = 100, message = "아티클 제목은 100자를 넘을 수 없습니다.")
        @Schema(description = "제목", example = "군고구마")
        String title,

        @Size(max = 300, message = "아티클 설명은 300자를 넘을 수 없습니다.")
        @Schema(description = "설명", example = "맛있는 군고구마 그리는 방법")
        String description,

        @NotBlank
        @Schema(description = "프롬프트", example = "김이 모락모락 나는 돌 위에 올라가 있는 군고구마 그려줘")
        String prompt,

        @AllowedValues({1, 2})
        @Schema(description = "프롬프트 타입", example = "2")
        int type,

        @Schema(description = "예시 질문", example = "고구마 그려라")
        String exampleQuestion,

        @Schema(description = "예시 답변", example = "따끈한 고구마")
        String exampleAnswer,

        @Schema(description = "파일 경로", example = "tmp/file.png")
        String filePath,

        @Size(max = 5, message = "태그는 최대 5개까지 등록 가능합니다.")
        @Schema(description = "해시태그", example = "[\"따끈따끈\", \"고구미\"]")
        Set<String> tags
) {

}
