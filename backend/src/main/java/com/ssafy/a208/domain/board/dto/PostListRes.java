package com.ssafy.a208.domain.board.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.util.List;

@Builder
@Schema(description = "게시글 목록 조회 응답")
public record PostListRes(

        @Schema(description = "게시글 리스트")
        List<PostListItemDto> posts,

        @Schema(description = "현재 페이지의 게시글 개수", example = "10")
        Integer itemCnt,

        @Schema(description = "총 게시글 개수", example = "125")
        Long totalCnt,

        @Schema(description = "총 페이지 수", example = "13")
        Integer totalPages,

        @Schema(description = "현재 페이지", example = "1")
        Integer currentPage
) {}