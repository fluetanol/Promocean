package com.ssafy.a208.domain.board.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.util.List;

@Builder
@Schema(description = "실시간 인기글 조회 응답")
public record TrendingPostRes(

        @Schema(description = "인기글 리스트")
        List<TrendingPostItemDto> posts,

        @Schema(description = "조회된 게시글 개수", example = "10")
        Integer itemCnt
) {}