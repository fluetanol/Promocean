package com.ssafy.a208.domain.scrap.dto;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.a208.global.common.enums.PostCategory;
import com.ssafy.a208.global.common.enums.PromptType;
import lombok.Getter;

import java.time.LocalDateTime;

/**
 * 스크랩 목록 조회용 Projection DTO
 */
@Getter
public class ScrapPostProjection {

    private final Long postId;
    private final String authorNickname;
    private final String profilePath;
    private final String title;
    private final PromptType type;
    private final PostCategory category;
    private final String filePath;
    private final LocalDateTime scrapCreatedAt;
    private final Boolean isDeleted;

    @QueryProjection
    public ScrapPostProjection(
            Long postId,
            String authorNickname,
            String profilePath,
            String title,
            PromptType type,
            PostCategory category,
            String filePath,
            LocalDateTime scrapCreatedAt,
            Boolean isDeleted
    ) {
        this.postId = postId;
        this.authorNickname = authorNickname;
        this.profilePath = profilePath;
        this.title = title;
        this.type = type;
        this.category = category;
        this.filePath = filePath;
        this.scrapCreatedAt = scrapCreatedAt;
        this.isDeleted = isDeleted;
    }
}
