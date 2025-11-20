package com.ssafy.a208.domain.board.dto;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.a208.global.common.enums.PostCategory;
import com.ssafy.a208.global.common.enums.PromptType;
import lombok.Getter;

import java.time.LocalDateTime;

/**
 * 게시글 상세 조회용 Projection DTO
 */
@Getter
public class PostDetailProjection {

    private final Long postId;
    private final String title;
    private final String description;
    private final PostCategory category;
    private final String prompt;
    private final PromptType type;
    private final String sampleQuestion;
    private final String sampleAnswer;
    private final LocalDateTime createdAt;
    private final String authorNickname;
    private final String profilePath;
    private final String filePath;
    private final Long likeCount;
    private final Long replyCount;

    @QueryProjection
    public PostDetailProjection(
            Long postId,
            String title,
            String description,
            PostCategory category,
            String prompt,
            PromptType type,
            String sampleQuestion,
            String sampleAnswer,
            LocalDateTime createdAt,
            String authorNickname,
            String profilePath,
            String filePath,
            Long likeCount,
            Long replyCount
    ) {
        this.postId = postId;
        this.title = title;
        this.description = description;
        this.category = category;
        this.prompt = prompt;
        this.type = type;
        this.sampleQuestion = sampleQuestion;
        this.sampleAnswer = sampleAnswer;
        this.createdAt = createdAt;
        this.authorNickname = authorNickname;
        this.profilePath = profilePath;
        this.filePath = filePath;
        this.likeCount = likeCount;
        this.replyCount = replyCount;
    }
}
