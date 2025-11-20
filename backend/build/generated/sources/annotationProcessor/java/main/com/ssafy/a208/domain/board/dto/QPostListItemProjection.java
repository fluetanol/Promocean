package com.ssafy.a208.domain.board.dto;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.processing.Generated;

/**
 * com.ssafy.a208.domain.board.dto.QPostListItemProjection is a Querydsl Projection type for PostListItemProjection
 */
@SuppressWarnings("this-escape")
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QPostListItemProjection extends ConstructorExpression<PostListItemProjection> {

    private static final long serialVersionUID = -1220365517L;

    public QPostListItemProjection(com.querydsl.core.types.Expression<Long> postId, com.querydsl.core.types.Expression<String> authorNickname, com.querydsl.core.types.Expression<String> profilePath, com.querydsl.core.types.Expression<String> title, com.querydsl.core.types.Expression<String> description, com.querydsl.core.types.Expression<String> typeName, com.querydsl.core.types.Expression<String> categoryName, com.querydsl.core.types.Expression<String> filePath, com.querydsl.core.types.Expression<java.time.LocalDateTime> createdAt, com.querydsl.core.types.Expression<Long> likeCount, com.querydsl.core.types.Expression<Long> replyCount) {
        super(PostListItemProjection.class, new Class<?>[]{long.class, String.class, String.class, String.class, String.class, String.class, String.class, String.class, java.time.LocalDateTime.class, long.class, long.class}, postId, authorNickname, profilePath, title, description, typeName, categoryName, filePath, createdAt, likeCount, replyCount);
    }

}

