package com.ssafy.a208.domain.space.service;

import com.ssafy.a208.domain.space.entity.Article;
import com.ssafy.a208.domain.space.entity.ArticleDocument;
import com.ssafy.a208.domain.space.repository.ArticleElasticSearchRepository;
import java.time.ZoneId;
import java.util.Date;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ArticleElasticSearchService {

    private final ArticleElasticSearchRepository articleElasticSearchRepository;

    public void indexArticle(Article article, String fileUrl, Set<String> tags) {

        Date createdAt = Date.from(article.getCreatedAt()
                .atZone(ZoneId.of("Asia/Seoul"))
                .toInstant());

        Date updatedAt = Date.from(article.getUpdatedAt()
                .atZone(ZoneId.of("Asia/Seoul"))
                .toInstant());

        ArticleDocument articleDocument = ArticleDocument.builder()
                .articleId(article.getId())
                .folderId(article.getFolder().getId())
                .title(article.getTitle())
                .filePath(fileUrl)
                .type(article.getType())
                .tags(tags)
                .createdAt(createdAt)
                .updatedAt(updatedAt)
                .build();

        articleElasticSearchRepository.save(articleDocument);
    }

    public void deleteArticle(Long articleId) {
        articleElasticSearchRepository.deleteById(articleId);
    }

}
