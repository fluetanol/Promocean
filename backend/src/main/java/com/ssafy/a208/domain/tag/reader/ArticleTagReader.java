package com.ssafy.a208.domain.tag.reader;

import com.ssafy.a208.domain.space.entity.Article;
import com.ssafy.a208.domain.tag.entity.ArticleTag;
import com.ssafy.a208.domain.tag.repository.ArticleTagRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ArticleTagReader {

    private final ArticleTagRepository articleTagRepository;

    public List<ArticleTag> getArticleTag(Article article) {
        return articleTagRepository.findTagByArticle(article);
    }
}
