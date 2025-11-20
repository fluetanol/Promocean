package com.ssafy.a208.domain.scrap.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.util.List;

/**
 * 스크랩 목록의 게시글 정보 DTO
 */
@Builder
@Schema(description = "스크랩된 게시글 정보")
public record ScrapPostListItemDto(

        @Schema(description = "게시글 ID", example = "3")
        Long postId,

        @Schema(description = "작성자 닉네임", example = "상냥한 감자")
        String author,

        @Schema(description = "작성자 프로필 이미지 URL", example = "https://cloudfront.url/profile.jpg")
        String profileUrl,

        @Schema(description = "게시글 제목", example = "고라파덕 말투 프롬프트")
        String title,

        @Schema(description = "프롬프트 타입", example = "이미지")
        String type,

        @Schema(description = "카테고리", example = "업무")
        String category,

        @Schema(description = "태그 리스트", example = "[\"그림\", \"예술\", \"최고\"]")
        List<String> tags,

        @Schema(description = "썸네일 URL", example = "https://cloudfront.url/post-image.jpg")
        String fileUrl,

        @Schema(description = "게시글 삭제 여부", example = "false")
        Boolean isDeleted
) {}