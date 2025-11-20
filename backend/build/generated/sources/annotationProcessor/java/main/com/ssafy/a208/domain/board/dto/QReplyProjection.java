package com.ssafy.a208.domain.board.dto;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.processing.Generated;

/**
 * com.ssafy.a208.domain.board.dto.QReplyProjection is a Querydsl Projection type for ReplyProjection
 */
@SuppressWarnings("this-escape")
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QReplyProjection extends ConstructorExpression<ReplyProjection> {

    private static final long serialVersionUID = 346838982L;

    public QReplyProjection(com.querydsl.core.types.Expression<Long> replyId, com.querydsl.core.types.Expression<String> authorNickname, com.querydsl.core.types.Expression<String> profilePath, com.querydsl.core.types.Expression<String> content, com.querydsl.core.types.Expression<java.time.LocalDateTime> createdAt, com.querydsl.core.types.Expression<java.time.LocalDateTime> updatedAt) {
        super(ReplyProjection.class, new Class<?>[]{long.class, String.class, String.class, String.class, java.time.LocalDateTime.class, java.time.LocalDateTime.class}, replyId, authorNickname, profilePath, content, createdAt, updatedAt);
    }

}

