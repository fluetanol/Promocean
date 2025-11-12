package com.ssafy.a208.domain.space.service;

import co.elastic.clients.elasticsearch._types.SortOptions;
import co.elastic.clients.elasticsearch._types.SortOrder;
import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.MatchQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch._types.query_dsl.TermQuery;
import com.ssafy.a208.domain.space.dto.response.ArticleListItemQueryRes;
import com.ssafy.a208.domain.space.entity.Article;
import com.ssafy.a208.domain.space.entity.ArticleDocument;
import com.ssafy.a208.domain.space.repository.ArticleElasticSearchRepository;
import com.ssafy.a208.global.common.enums.PromptType;
import com.ssafy.a208.global.common.enums.SortType;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ArticleElasticSearchService {

    private final ElasticsearchOperations elasticsearchOperations;
    private final ArticleElasticSearchRepository articleElasticSearchRepository;

    public Page<ArticleListItemQueryRes> searchWithNativeQuery(Long folderId, String titleKeyword,
            String tagKeyword,
            Integer promptType, SortType sort, int page, int size) {

        List<Query> filters = new ArrayList<>();

        if (folderId != null) {
            filters.add(TermQuery.of(t -> t
                    .field("folderId")
                    .value(folderId)
            )._toQuery());
        }

        if (titleKeyword != null && !titleKeyword.isBlank()) {
            filters.add(MatchQuery.of(m -> m
                    .field("title")
                    .query(titleKeyword)
            )._toQuery());
        }

        if (tagKeyword != null && !tagKeyword.isBlank()) {
            filters.add(TermQuery.of(t -> t
                    .field("tags")
                    .value(tagKeyword)
            )._toQuery());
        }

        if (promptType != null) {
            filters.add(TermQuery.of(t -> t
                    .field("type")
                    .value(PromptType.valueOf(promptType).name())
            )._toQuery());
        }

        // Bool Query 구성
        Query boolQuery = BoolQuery.of(b -> b.must(filters))._toQuery();

        // 정렬 조건 구성
        List<SortOptions> sortOptions = new ArrayList<>();

        // 기본은 최신순
        SortOrder order = (sort == SortType.oldest) ? SortOrder.Asc : SortOrder.Desc;

        sortOptions.add(SortOptions.of(s -> s.field(f -> f.field("createdAt").order(order))));
        sortOptions.add(SortOptions.of(
                s -> s.field(f -> f.field("articleId").order(SortOrder.Desc))));

        // NativeQuery 생성
        NativeQuery nativeQuery = NativeQuery.builder()
                .withQuery(boolQuery)
                .withSort(sortOptions)
                .withPageable(PageRequest.of(page - 1, size))
                .build();

        // 검색 실행
        SearchHits<ArticleDocument> searchHits = elasticsearchOperations.search(nativeQuery,
                ArticleDocument.class);

        List<ArticleListItemQueryRes> content = searchHits.stream()
                .map(hit -> {
                    ArticleDocument doc = hit.getContent();
                    return new ArticleListItemQueryRes(
                            doc.getArticleId(),
                            doc.getTitle(),
                            doc.getType(),
                            doc.getFilePath(),
                            doc.getTags(),
                            LocalDateTime.ofInstant(doc.getUpdatedAt().toInstant(),
                                    ZoneId.of("Asia/Seoul"))
                    );
                })
                .toList();

        return new PageImpl<>(content, PageRequest.of(page - 1, size), searchHits.getTotalHits());
    }

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
