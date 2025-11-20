package com.ssafy.a208.domain.board.repository;

import co.elastic.clients.elasticsearch._types.SortOrder;
import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import com.ssafy.a208.domain.board.document.PostDocument;
import com.ssafy.a208.domain.board.dto.PostListQueryDto;
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
public class PostElasticsearchRepositoryImpl {

    private final ElasticsearchOperations elasticsearchOperations;

    /**
     * 게시글 검색 (ElasticSearch Native Query)
     */
    public Page<PostDocument> searchPosts(PostListQueryDto query, Pageable pageable) {
        NativeQuery searchQuery = buildSearchQuery(query, pageable);

        SearchHits<PostDocument> searchHits = elasticsearchOperations.search(
                searchQuery,
                PostDocument.class
        );

        List<PostDocument> posts = searchHits.stream()
                .map(SearchHit::getContent)
                .toList();

        return PageableExecutionUtils.getPage(
                posts,
                pageable,
                searchHits::getTotalHits
        );
    }

    /**
     * Native Query 빌드 (Bool Query + Fuzzy Query + Sort)
     */
    private NativeQuery buildSearchQuery(PostListQueryDto query, Pageable pageable) {
        NativeQueryBuilder queryBuilder = NativeQuery.builder();

        // Bool Query 구성
        BoolQuery.Builder boolQueryBuilder = new BoolQuery.Builder();

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

        // 2. 제목 검색 (Fuzzy Query 포함)
        if (query.title() != null && !query.title().isBlank()) {
            boolQueryBuilder.must(Query.of(q -> q
                    .bool(b -> b
                            // Match Query: 형태소 분석 검색
                            .should(s -> s
                                    .match(m -> m
                                            .field("title")
                                            .query(query.title())
                                            .analyzer("nori")
                                            .boost(2.0f)
                                    )
                            )
                            // Fuzzy Query: 오타 허용 검색
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
        if ("popular".equalsIgnoreCase(sorter)) {
            // 인기순: popularityScore 내림차순 -> createdAt 내림차순
            queryBuilder.withSort(s -> s
                    .field(f -> f
                            .field("popularityScore")
                            .order(SortOrder.Desc)
                    )
            );
            queryBuilder.withSort(s -> s
                    .field(f -> f
                            .field("createdAt")
                            .order(SortOrder.Desc)
                    )
            );
        } else if ("oldest".equalsIgnoreCase(sorter)) {
            // 오래된순
            queryBuilder.withSort(s -> s
                    .field(f -> f
                            .field("createdAt")
                            .order(SortOrder.Asc)
                    )
            );
        } else {
            // 최신순 (기본은 요걸로 되어있어요옹)
            queryBuilder.withSort(s -> s
                    .field(f -> f
                            .field("createdAt")
                            .order(SortOrder.Desc)
                    )
            );
        }
    }

    public void updateMemberInfo(String oldNickname, String newNickname, String newProfilePath) {
        log.info("old : {} / new : {}", oldNickname, newNickname);
        NativeQuery query = NativeQuery.builder()
                .withPageable(PageRequest.of(0, 1000))      // 기본이 10이라 크게 줘야 함
                .withQuery(queryBuilderDsl -> queryBuilderDsl
                        .term(termQuery -> termQuery
                                .field("authorNickname")   // 분석 안 된 keyword 필드
                                .value(oldNickname)
                        )
                )
                .build();

        SearchHits<PostDocument> hits = elasticsearchOperations.search(query, PostDocument.class);

        List<PostDocument> docs = hits.getSearchHits().stream()
                .map(SearchHit::getContent)
                .toList();

        if (docs.isEmpty()) {
            return;
        }

        docs.forEach(doc -> doc.updateMemberInfo(newNickname, newProfilePath));

        elasticsearchOperations.save(docs);
    }
}