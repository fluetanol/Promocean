package com.ssafy.a208.domain.space.repository;

import co.elastic.clients.elasticsearch._types.SortOptions;
import co.elastic.clients.elasticsearch._types.SortOrder;
import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.MatchQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch._types.query_dsl.TermQuery;
import com.ssafy.a208.domain.space.entity.ArticleDocument;
import com.ssafy.a208.global.common.enums.PromptType;
import com.ssafy.a208.global.common.enums.SortType;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ArticleElasticsearchRepositoryImpl {

    private final ElasticsearchOperations elasticsearchOperations;

    public SearchHits<ArticleDocument> searchWithNativeQuery(Long spaceId, Long folderId, String titleKeyword,
            String tagKeyword,
            Integer promptType, SortType sort, int page, int size) {

        List<Query> filters = new ArrayList<>();

        if(spaceId != null){
            filters.add(TermQuery.of(t -> t
                    .field("spaceId")
                    .value(spaceId)
            )._toQuery());
        }

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
        return elasticsearchOperations.search(nativeQuery, ArticleDocument.class);
    }

}
