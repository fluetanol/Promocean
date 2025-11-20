package com.ssafy.a208.domain.board.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

/**
 * QueryDSL Projection용 DTO
 * 게시글 목록 조회 시 필요한 데이터만 select
 */
@Getter
public class PostListItemProjection {
    private final Long postId;
    private final String authorNickname;
    private final String profilePath;
    private final String title;
    private final String description;
    private final String typeName;
    private final String categoryName;
    private final String filePath;
    private final LocalDateTime createdAt;
    private final Long likeCount;
    private final Long replyCount;

    @QueryProjection
    public PostListItemProjection(
            Long postId,
            String authorNickname,
            String profilePath,
            String title,
            String description,
            String typeName,
            String categoryName,
            String filePath,
            LocalDateTime createdAt,
            Long likeCount,
            Long replyCount
    ) {
        this.postId = postId;
        this.authorNickname = authorNickname;
        this.profilePath = profilePath;
        this.title = title;
        this.description = description;
        this.typeName = typeName;
        this.categoryName = categoryName;
        this.filePath = filePath;
        this.createdAt = createdAt;
        this.likeCount = likeCount;
        this.replyCount = replyCount;
    }
}