package com.ssafy.a208.domain.board.dto;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.processing.Generated;

/**
 * com.ssafy.a208.domain.board.dto.QPostDetailProjection is a Querydsl Projection type for PostDetailProjection
 */
@SuppressWarnings("this-escape")
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QPostDetailProjection extends ConstructorExpression<PostDetailProjection> {

    private static final long serialVersionUID = 1287715699L;

    public QPostDetailProjection(com.querydsl.core.types.Expression<Long> postId, com.querydsl.core.types.Expression<String> title, com.querydsl.core.types.Expression<String> description, com.querydsl.core.types.Expression<com.ssafy.a208.global.common.enums.PostCategory> category, com.querydsl.core.types.Expression<String> prompt, com.querydsl.core.types.Expression<com.ssafy.a208.global.common.enums.PromptType> type, com.querydsl.core.types.Expression<String> sampleQuestion, com.querydsl.core.types.Expression<String> sampleAnswer, com.querydsl.core.types.Expression<java.time.LocalDateTime> createdAt, com.querydsl.core.types.Expression<String> authorNickname, com.querydsl.core.types.Expression<String> profilePath, com.querydsl.core.types.Expression<String> filePath, com.querydsl.core.types.Expression<Long> likeCount, com.querydsl.core.types.Expression<Long> replyCount) {
        super(PostDetailProjection.class, new Class<?>[]{long.class, String.class, String.class, com.ssafy.a208.global.common.enums.PostCategory.class, String.class, com.ssafy.a208.global.common.enums.PromptType.class, String.class, String.class, java.time.LocalDateTime.class, String.class, String.class, String.class, long.class, long.class}, postId, title, description, category, prompt, type, sampleQuestion, sampleAnswer, createdAt, authorNickname, profilePath, filePath, likeCount, replyCount);
    }

}

