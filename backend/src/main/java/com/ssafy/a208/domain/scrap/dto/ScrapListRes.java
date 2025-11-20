package com.ssafy.a208.domain.scrap.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.util.List;

/**
 * 스크랩 목록 조회 응답 DTO
 */
@Builder
@Schema(description = "스크랩 목록 조회 응답")
public record ScrapListRes(

        @Schema(description = "스크랩된 게시글 리스트")
        List<ScrapPostListItemDto> posts,

        @Schema(description = "현재 페이지의 게시글 개수", example = "10")
        Integer itemCnt,

        @Schema(description = "총 스크랩 개수", example = "25")
        Long totalCnt,

        @Schema(description = "총 페이지 수", example = "3")
        Integer totalPages,

        @Schema(description = "현재 페이지", example = "1")
        Integer currentPage
) {}