package com.ssafy.a208.domain.space.repository;

import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.group.GroupBy.list;
import static com.ssafy.a208.domain.space.entity.QArticle.article;
import static com.ssafy.a208.domain.space.entity.QArticleFile.articleFile;
import static com.ssafy.a208.domain.tag.entity.QArticleTag.articleTag;
import static com.ssafy.a208.domain.tag.entity.QTag.tag;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.a208.domain.space.dto.response.ArticleListItemQueryRes;
import com.ssafy.a208.global.common.enums.PromptType;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ArticleRepositoryCustomImpl implements ArticleRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<ArticleListItemQueryRes> findAllArticles(
            Long folderId, Integer type, String tagName, String titleKeyword, Pageable pageable) {

        List<Tuple> idTuples = queryFactory
                .select(article.id, article.createdAt)
                .distinct()
                .from(article)
                .leftJoin(articleTag).on(article.id.eq(articleTag.article.id))
                .leftJoin(tag).on(tag.id.eq(articleTag.tag.id))
                .where(
                        article.deletedAt.isNull(),
                        folderEq(folderId),
                        typeEq(type),
                        tagEq(tagName),
                        titleContains(titleKeyword)
                )
                .orderBy(sort(pageable))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        List<Long> ids = idTuples.stream()
                .map(tuple -> tuple.get(article.id))
                .distinct()
                .toList();

        if (ids.isEmpty()) {
            return new PageImpl<>(List.of(), pageable, 0);
        }

        Map<Long, ArticleListItemQueryRes> result = queryFactory
                .from(article)
                .leftJoin(articleFile).on(article.id.eq(articleFile.article.id))
                .leftJoin(articleTag).on(article.id.eq(articleTag.article.id))
                .leftJoin(tag).on(tag.id.eq(articleTag.tag.id))
                .where(article.id.in(ids))
                .transform(groupBy(article.id).as(
                        Projections.constructor(
                                ArticleListItemQueryRes.class,
                                article.id,
                                article.title,
                                article.type,
                                articleFile.filePath,
                                list(tag.name),
                                article.updatedAt
                        )
                ));

        List<ArticleListItemQueryRes> contents = ids.stream()
                .map(result::get)
                .toList();

        Long total = queryFactory
                .select(article.countDistinct())
                .from(article)
                .leftJoin(articleTag).on(article.id.eq(articleTag.article.id))
                .leftJoin(tag).on(tag.id.eq(articleTag.tag.id))
                .where(
                        article.deletedAt.isNull(),
                        folderEq(folderId),
                        typeEq(type),
                        tagEq(tagName),
                        titleContains(titleKeyword)
                )
                .fetchOne();

        return new PageImpl<>(contents, pageable, total == null ? 0 : total);
    }


    private BooleanExpression folderEq(Long folderId) {
        return folderId == null ? null : article.folder.id.eq(folderId);
    }

    private BooleanExpression typeEq(Integer type) {
        if (type == null) {
            return null;
        }
        if (type != 1 && type != 2) {
            return null;
        }
        return article.type.eq(PromptType.valueOf(type));
    }

    private BooleanExpression tagEq(String tagName) {
        return (tagName == null || tagName.isBlank())
                ? null
                : tag.name.eq(tagName);
    }

    private BooleanExpression titleContains(String keyword) {
        return (keyword == null || keyword.isBlank())
                ? null
                : article.title.containsIgnoreCase(keyword);
    }


    private OrderSpecifier<?> sort(Pageable pageable) {
        if (!pageable.getSort().isEmpty()) {
            Sort.Order order = pageable.getSort().toList().get(0);

            if (order.isAscending()) {
                return article.createdAt.asc();
            } else {
                return article.createdAt.desc();
            }
        }

        return article.createdAt.desc();
    }


}
