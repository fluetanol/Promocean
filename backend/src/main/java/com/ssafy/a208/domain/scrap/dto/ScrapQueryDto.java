package com.ssafy.a208.domain.scrap.dto;

import com.ssafy.a208.global.common.validation.AllowedStringValues;
import com.ssafy.a208.global.common.validation.AllowedValues;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Builder;

/**
 * 스크랩 목록 조회 요청 DTO
 */
@Builder
@Schema(description = "스크랩 목록 조회 요청")
public record ScrapQueryDto(

        @Min(value = 1, message = "페이지는 1 이상이어야 합니다.")
        @Schema(description = "페이지 번호 (1부터 시작)", example = "1", defaultValue = "1")
        Integer page,

        @Min(value = 1, message = "페이지 크기는 1 이상이어야 합니다.")
        @Schema(description = "페이지 크기", example = "10", defaultValue = "10")
        Integer size,

        @Size(max = 10, message = "작성자 검색어는 10자까지 입력 가능합니다.")
        @Schema(description = "작성자 검색어", example = "상냥한 감자")
        String author,

        @Size(max = 100, message = "제목은 100자까지 작성할 수 있습니다.")
        @Schema(description = "게시글 제목", example = "고라파덕 말투 프롬프트")
        String title,

        @Size(max = 12, message = "태그 검색어는 12자까지 입력 가능합니다.")
        @Schema(description = "태그 검색어", example = "일상")
        String tag,

        @AllowedStringValues(value = {"latest", "oldest"}, message = "정렬 기준은 latest 또는 oldest만 가능합니다.")
        @Schema(description = "정렬 기준 (latest: 최신순, oldest: 오래된순)",
                example = "latest",
                defaultValue = "latest",
                allowableValues = {"latest", "oldest"})
        String sorter,

        @AllowedValues(value = {100, 200, 300, 400, 500, 600, 700}, allowNull = true, message = "유효하지 않은 카테고리입니다")
        @Schema(description = "카테고리 (100:업무, 200:개발, 300:디자인/창작, 400:취업, 500:교육, 600:일상, 700:기타)",
                example = "600")
        Integer category,

        @AllowedValues(value = {1, 2}, allowNull = true,
                message = "유효하지 않은 프롬프트 타입입니다")
        @Schema(description = "프롬프트 타입 (1:텍스트, 2:이미지)", example = "1")
        Integer type
) {
    public ScrapQueryDto {
        // 기본값 설정
        if (page == null || page < 1) page = 1;
        if (size == null || size < 1) size = 10;
        if (sorter == null || sorter.isBlank()) sorter = "latest";
    }
}