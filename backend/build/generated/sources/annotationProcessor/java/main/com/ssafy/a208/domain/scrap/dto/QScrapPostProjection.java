package com.ssafy.a208.domain.scrap.dto;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.processing.Generated;

/**
 * com.ssafy.a208.domain.scrap.dto.QScrapPostProjection is a Querydsl Projection type for ScrapPostProjection
 */
@SuppressWarnings("this-escape")
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QScrapPostProjection extends ConstructorExpression<ScrapPostProjection> {

    private static final long serialVersionUID = -77918824L;

    public QScrapPostProjection(com.querydsl.core.types.Expression<Long> postId, com.querydsl.core.types.Expression<String> authorNickname, com.querydsl.core.types.Expression<String> profilePath, com.querydsl.core.types.Expression<String> title, com.querydsl.core.types.Expression<com.ssafy.a208.global.common.enums.PromptType> type, com.querydsl.core.types.Expression<com.ssafy.a208.global.common.enums.PostCategory> category, com.querydsl.core.types.Expression<String> filePath, com.querydsl.core.types.Expression<java.time.LocalDateTime> scrapCreatedAt, com.querydsl.core.types.Expression<Boolean> isDeleted) {
        super(ScrapPostProjection.class, new Class<?>[]{long.class, String.class, String.class, String.class, com.ssafy.a208.global.common.enums.PromptType.class, com.ssafy.a208.global.common.enums.PostCategory.class, String.class, java.time.LocalDateTime.class, boolean.class}, postId, authorNickname, profilePath, title, type, category, filePath, scrapCreatedAt, isDeleted);
    }

}

