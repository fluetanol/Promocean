package com.ssafy.a208.domain.tag.repository;

import static com.ssafy.a208.domain.tag.entity.QArticleTag.articleTag;
import static com.ssafy.a208.domain.tag.entity.QTag.tag;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.a208.domain.space.entity.Article;
import com.ssafy.a208.domain.tag.entity.ArticleTag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ArticleTagRepositoryImpl implements ArticleTagRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<ArticleTag> findTagByArticle(Article article) {
        return queryFactory
                .selectFrom(articleTag)
                .join(articleTag.tag, tag).fetchJoin()
                .where(
                        articleTag.article.id.eq(article.getId()),
                        articleTag.deletedAt.isNull()
                ).fetch();
    }
}
