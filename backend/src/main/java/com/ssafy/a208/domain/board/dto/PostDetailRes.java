package com.ssafy.a208.domain.board.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 게시글 상세 조회 응답 DTO
 */
@Schema(description = "게시글 상세 조회 응답")
@Builder
public record PostDetailRes(
        @Schema(description = "게시글 ID", example = "2")
        Long postId,

        @Schema(description = "작성자 닉네임", example = "친절한 오리")
        String author,

        @Schema(description = "작성자 프로필 이미지 URL", example = "https://클라우드프론트url")
        String profileUrl,

        @Schema(description = "게시글 제목", example = "고라파덕 말투 프롬프트")
        String title,

        @Schema(description = "게시글 설명", example = "고라파덕처럼 귀엽게 말하는 프롬프트입니다")
        String description,

        @Schema(description = "카테고리", example = "일상")
        String category,

        @Schema(description = "프롬프트 내용", example = "고라파덕 말투로 말해줘. 고라파덕 말투란 문장 끝에 파덕을 붙이는거야.")
        String prompt,

        @Schema(description = "프롬프트 타입", example = "텍스트")
        String type,

        @Schema(description = "예시 질문", example = "오늘 옷 추천해줘")
        String sampleQuestion,

        @Schema(description = "예시 답변", example = "오늘은 추우니까 패딩을 입는게 어때 파덕")
        String sampleAnswer,

        @Schema(description = "파일 URL (이미지 프롬프트인 경우)")
        String fileUrl,

        @Schema(description = "태그 목록", example = "[\"일상\", \"재미\", \"캐릭터\"]")
        List<String> tags,

        @Schema(description = "좋아요 수", example = "100")
        Integer likeCnt,

        @Schema(description = "댓글 수", example = "4")
        Integer replyCnt,

        @Schema(description = "현재 사용자의 좋아요 여부", example = "true")
        Boolean isLiked,

        @Schema(description = "현재 사용자의 스크랩 여부", example = "false")
        Boolean isScraped,

        @Schema(description = "게시글 작성일시", example = "2025-11-07T10:02:22")
        LocalDateTime createdAt,

        @Schema(description = "댓글 목록")
        List<ReplyDto> replies
) {
    @Schema(description = "댓글 정보")
    @Builder
    public record ReplyDto(
            @Schema(description = "댓글 ID", example = "1")
            Long replyId,

            @Schema(description = "댓글 작성자 닉네임", example = "이준희")
            String author,

            @Schema(description = "댓글 작성자 프로필 이미지 URL", example = "https://클라우드프론트url")
            String profileUrl,

            @Schema(description = "댓글 내용", example = "우 진짜 최악")
            String content,

            @Schema(description = "댓글 작성일시", example = "2025-11-07T11:11:11")
            LocalDateTime createdAt,

            @Schema(description = "댓글 수정일시", example = "2025-11-07T11:11:12")
            LocalDateTime updatedAt
    ) {}
}