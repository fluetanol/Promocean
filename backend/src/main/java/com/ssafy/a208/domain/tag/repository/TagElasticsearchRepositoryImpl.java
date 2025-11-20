package com.ssafy.a208.domain.tag.repository;

import co.elastic.clients.elasticsearch._types.SortOrder;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import com.ssafy.a208.domain.tag.document.TagDocument;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.client.elc.NativeQueryBuilder;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Repository;

import java.util.List;

@Slf4j
@Repository
@RequiredArgsConstructor
public class TagElasticsearchRepositoryImpl {

    private final ElasticsearchOperations elasticsearchOperations;

    /**
     * 태그 자동완성 검색
     */
    public List<TagDocument> searchTagsForAutocomplete(String keyword, int size) {
        NativeQuery searchQuery = buildAutocompleteQuery(keyword, size);

        SearchHits<TagDocument> searchHits = elasticsearchOperations.search(
                searchQuery,
                TagDocument.class
        );

        return searchHits.stream()
                .map(SearchHit::getContent)
                .toList();
    }

    /**
     * 자동완성 쿼리 빌드
     */
    private NativeQuery buildAutocompleteQuery(String keyword, int size) {
        NativeQueryBuilder queryBuilder = NativeQuery.builder();

        // Bool Query: prefix + wildcard 조합
        queryBuilder.withQuery(Query.of(q -> q
                .bool(b -> b
                        // prefix: 시작하는 단어 (높은 가중치)
                        .should(s -> s
                                .prefix(p -> p
                                        .field("name.keyword")
                                        .value(keyword.toLowerCase())
                                        .boost(2.0f)
                                )
                        )
                        // wildcard: 포함하는 단어 (낮은 가중치)
                        .should(s -> s
                                .wildcard(w -> w
                                        .field("name.keyword")
                                        .value("*" + keyword.toLowerCase() + "*")
                                        .boost(1.0f)
                                )
                        )
                        .minimumShouldMatch("1")
                )
        ));

        // 정렬: usageCnt 내림차순 -> name 오름차순
        queryBuilder.withSort(sort -> sort
                .field(f -> f
                        .field("usageCnt")
                        .order(SortOrder.Desc)
                )
        );

        queryBuilder.withSort(sort -> sort
                .field(f -> f
                        .field("name.keyword")
                        .order(SortOrder.Asc)
                )
        );

        // 페이징
        queryBuilder.withPageable(PageRequest.of(0, size));

        return queryBuilder.build();
    }
}