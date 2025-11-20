package com.ssafy.a208.domain.board.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Schema(description = "게시글 목록 아이템")
public record PostListItemDto(

        @Schema(description = "게시글 ID", example = "3")
        Long postId,

        @Schema(description = "작성자 닉네임", example = "상냥한 감자")
        String author,

        @Schema(description = "작성자 프로필 이미지 URL", example = "https://cloudfront.url/profile.jpg")
        String profileUrl,

        @Schema(description = "게시글 제목", example = "고라파덕 말투 프롬프트")
        String title,

        @Schema(description = "게시글 설명", example = "고라파덕처럼 귀엽게 말하는 프롬프트입니다")
        String description,

        @Schema(description = "프롬프트 타입", example = "텍스트")
        String type,

        @Schema(description = "카테고리", example = "일상")
        String category,

        @Schema(description = "태그 리스트", example = "[\"재미\", \"캐릭터\"]")
        List<String> tags,

        @Schema(description = "좋아요 수", example = "234")
        Integer likeCnt,

        @Schema(description = "댓글 수", example = "12")
        Integer replyCnt,

        @Schema(description = "썸네일 URL", example = "https://cloudfront.url/post-image.jpg")
        String fileUrl,

        @Schema(description = "작성일시", example = "2025-10-28T11:41:12")
        LocalDateTime createdAt
) {}