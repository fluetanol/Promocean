package com.ssafy.a208.domain.board.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.util.List;

@Builder
@Schema(description = "실시간 인기글 아이템")
public record TrendingPostItemDto(

        @Schema(description = "게시글 ID", example = "3")
        Long postId,

        @Schema(description = "게시글 제목", example = "미소녀 독화 프롬프트")
        String title,

        @Schema(description = "태그 리스트")
        List<String> tags,

        @Schema(description = "좋아요 수", example = "100")
        Integer likeCnt,

        @Schema(description = "댓글 수", example = "10")
        Integer replyCnt,

        @Schema(description = "썸네일 URL")
        String fileUrl
) {}