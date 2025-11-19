package com.ssafy.a208.domain.scrap.repository;

import co.elastic.clients.elasticsearch._types.SortOrder;
import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import com.ssafy.a208.domain.scrap.document.ScrapDocument;
import com.ssafy.a208.domain.scrap.dto.ScrapQueryDto;
import com.ssafy.a208.global.common.enums.PostCategory;
import com.ssafy.a208.global.common.enums.PromptType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.client.elc.NativeQueryBuilder;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.util.List;

@Slf4j
@Repository
@RequiredArgsConstructor
public class ScrapElasticsearchRepositoryImpl {

    private final ElasticsearchOperations elasticsearchOperations;

    /**
     * 스크랩 검색 (ElasticSearch Native Query)
     */
    public Page<ScrapDocument> searchScraps(Long memberId, ScrapQueryDto query, Pageable pageable) {
        NativeQuery searchQuery = buildSearchQuery(memberId, query, pageable);

        SearchHits<ScrapDocument> searchHits = elasticsearchOperations.search(
                searchQuery,
                ScrapDocument.class
        );

        List<ScrapDocument> scraps = searchHits.stream()
                .map(SearchHit::getContent)
                .toList();

        return PageableExecutionUtils.getPage(
                scraps,
                pageable,
                searchHits::getTotalHits
        );
    }

    /**
     * Native Query 빌드
     */
    private NativeQuery buildSearchQuery(Long memberId, ScrapQueryDto query, Pageable pageable) {
        NativeQueryBuilder queryBuilder = NativeQuery.builder();

        BoolQuery.Builder boolQueryBuilder = new BoolQuery.Builder();

        // 특정 회원의 스크랩만 조회
        boolQueryBuilder.must(Query.of(q -> q
                .term(t -> t
                        .field("memberId")
                        .value(memberId)
                )
        ));

        // 1. 작성자 필터
        if (query.author() != null && !query.author().isBlank()) {
            boolQueryBuilder.must(Query.of(q -> q
                    .term(t -> t
                            .field("authorNickname")
                            .value(query.author().toLowerCase())
                            .caseInsensitive(true)
                    )
            ));
        }

        // 2. 제목 검색 (형태소 분석 + Fuzzy)
        if (query.title() != null && !query.title().isBlank()) {
            boolQueryBuilder.must(Query.of(q -> q
                    .bool(b -> b
                            .should(s -> s
                                    .match(m -> m
                                            .field("title")
                                            .query(query.title())
                                            .analyzer("nori")
                                            .boost(2.0f)
                                    )
                            )
                            .should(s -> s
                                    .fuzzy(f -> f
                                            .field("title")
                                            .value(query.title())
                                            .fuzziness("AUTO")
                                            .boost(1.0f)
                                    )
                            )
                            .minimumShouldMatch("1")
                    )
            ));
        }

        // 3. 태그 필터
        if (query.tag() != null && !query.tag().isBlank()) {
            boolQueryBuilder.must(Query.of(q -> q
                    .term(t -> t
                            .field("tags")
                            .value(query.tag().toLowerCase())
                            .caseInsensitive(true)
                    )
            ));
        }

        // 4. 카테고리 필터
        if (query.category() != null) {
            PostCategory category = PostCategory.valueOf(query.category());
            boolQueryBuilder.must(Query.of(q -> q
                    .term(t -> t
                            .field("category")
                            .value(category.getName())
                    )
            ));
        }

        // 5. 타입 필터
        if (query.type() != null) {
            PromptType type = PromptType.valueOf(query.type());
            boolQueryBuilder.must(Query.of(q -> q
                    .term(t -> t
                            .field("type")
                            .value(type.getName())
                    )
            ));
        }

        queryBuilder.withQuery(Query.of(q -> q.bool(boolQueryBuilder.build())));

        // 정렬
        addSorting(queryBuilder, query.sorter());

        // 페이징
        queryBuilder.withPageable(pageable);

        return queryBuilder.build();
    }

    /**
     * 정렬 옵션 추가
     */
    private void addSorting(NativeQueryBuilder queryBuilder, String sorter) {
        if ("oldest".equalsIgnoreCase(sorter)) {
            // 오래된순
            queryBuilder.withSort(s -> s
                    .field(f -> f
                            .field("scrapCreatedAt")
                            .order(SortOrder.Asc)
                    )
            );
        } else {
            // 최신순 (기본)
            queryBuilder.withSort(s -> s
                    .field(f -> f
                            .field("scrapCreatedAt")
                            .order(SortOrder.Desc)
                    )
            );
        }
    }

    public void updateMemberInfo(String oldNickname, String newNickname, String newProfilePath) {
        NativeQuery query = NativeQuery.builder()
                .withPageable(PageRequest.of(0, 1000))      // 기본이 10이라 크게 줘야 함
                .withQuery(queryBuilderDsl -> queryBuilderDsl
                        .term(termQuery -> termQuery
                                .field("authorNickname")   // 분석 안 된 keyword 필드
                                .value(oldNickname)
                        )
                )
                .build();

        SearchHits<ScrapDocument> hits = elasticsearchOperations.search(query, ScrapDocument.class);

        List<ScrapDocument> docs = hits.getSearchHits().stream()
                .map(SearchHit::getContent)
                .toList();

        if (docs.isEmpty()) {
            return;
        }

        docs.forEach(doc -> doc.updateMemberInfo(newNickname, newProfilePath));

        elasticsearchOperations.save(docs);
    }
}