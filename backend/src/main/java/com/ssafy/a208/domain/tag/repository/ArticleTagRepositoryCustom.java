package com.ssafy.a208.domain.tag.repository;

import com.ssafy.a208.domain.space.entity.Article;
import com.ssafy.a208.domain.tag.entity.ArticleTag;
import java.util.List;

public interface ArticleTagRepositoryCustom {

    List<ArticleTag> findTagByArticle(Article article);

}
