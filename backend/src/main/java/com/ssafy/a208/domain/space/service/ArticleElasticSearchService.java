package com.ssafy.a208.domain.space.service;

import com.ssafy.a208.domain.space.dto.response.ArticleListItemQueryRes;
import com.ssafy.a208.domain.space.entity.Article;
import com.ssafy.a208.domain.space.entity.ArticleDocument;
import com.ssafy.a208.domain.space.repository.ArticleElasticSearchRepository;
import com.ssafy.a208.domain.space.repository.ArticleElasticsearchRepositoryImpl;
import com.ssafy.a208.global.common.enums.SortType;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ArticleElasticSearchService {

    private final ArticleElasticsearchRepositoryImpl articleSearchRepository;
    private final ArticleElasticSearchRepository articleElasticSearchRepository;

    public Page<ArticleListItemQueryRes> getArticles(Long folderId, String titleKeyword,
            String tagKeyword, Integer promptType, SortType sort, int page, int size) {

        SearchHits<ArticleDocument> searchHits = articleSearchRepository.searchWithNativeQuery(
                folderId, titleKeyword, tagKeyword, promptType, sort, page, size);

        List<ArticleListItemQueryRes> content = searchHits.stream()
                .map(hit -> {
                    ArticleDocument doc = hit.getContent();
                    return new ArticleListItemQueryRes(
                            doc.getArticleId(),
                            doc.getTitle(),
                            doc.getType(),
                            doc.getFilePath(),
                            doc.getTags(),
                            doc.getUpdatedAt()
                    );
                })
                .toList();
        return new PageImpl<>(content, PageRequest.of(page - 1, size), searchHits.getTotalHits());
    }

    public void indexArticle(Article article, String fileUrl, Set<String> tags) {
        ArticleDocument articleDocument = ArticleDocument.builder()
                .articleId(article.getId())
                .folderId(article.getFolder().getId())
                .title(article.getTitle())
                .filePath(fileUrl)
                .type(article.getType())
                .tags(tags)
                .createdAt(article.getCreatedAt().toLocalDate())
                .updatedAt(article.getUpdatedAt().toLocalDate())
                .build();

        articleElasticSearchRepository.save(articleDocument);
    }

    public void deleteArticle(Long articleId) {
        articleElasticSearchRepository.deleteById(articleId);
    }

}
