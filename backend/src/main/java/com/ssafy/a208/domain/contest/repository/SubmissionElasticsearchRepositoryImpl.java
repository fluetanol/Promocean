package com.ssafy.a208.domain.contest.repository;

import co.elastic.clients.elasticsearch._types.query_dsl.Operator;
import com.ssafy.a208.domain.contest.document.SubmissionDocument;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class SubmissionElasticsearchRepositoryImpl {

    private final ElasticsearchOperations operations;

    public Page<SubmissionDocument> searchSubmissions(
            Long contestId,
            int page,
            int size,
            String sorter,
            String filterAuthor,
            String filterKeyword
    ) {
        Sort sort = switch (sorter) {
            case "latest"   -> Sort.by(Sort.Direction.DESC, "updatedAt");
            case "oldest"   -> Sort.by(Sort.Direction.ASC, "updatedAt");
            case "voteDesc" -> Sort.by(Sort.Direction.DESC, "voteCount");
            case "voteAsc"  -> Sort.by(Sort.Direction.ASC, "voteCount");
            default         -> Sort.by(Sort.Direction.DESC, "updatedAt");
        };
        Pageable pageable = PageRequest.of(Math.max(0, page - 1), size, sort);

        String author = filterAuthor.trim();
        String keyword = filterKeyword.trim();
        boolean authorFlag = !author.isEmpty();
        boolean keywordFlag = !keyword.isEmpty();

        // query 구성
        NativeQuery query = NativeQuery.builder()
                .withPageable(pageable)
                .withQuery(queryBuilderDsl ->
                        queryBuilderDsl.bool(boolDsl -> {
                            // contestId로 필터링
                            boolDsl.filter(filterClause ->
                                    filterClause.term(termQuery ->
                                            termQuery
                                                    .field("contestId")
                                                    .value(contestId)
                                    )
                            );

                            // 닉네임으로 검색
                            if (authorFlag) {
                                boolDsl.filter(filterClause ->
                                        filterClause.term(termQuery ->
                                                termQuery
                                                        .field("memberNickname.keyword")
                                                        .value(author)
                                        )
                                );
                            }

                            // 키워드로 검색
                            if (keywordFlag) {
                                boolDsl.must(mustClause ->
                                        mustClause.match(matchQuery  ->
                                                matchQuery
                                                        .field("description")
                                                        .query(keyword)
                                                        .operator(Operator.And)
                                        )
                                );
                            }

                            return boolDsl;
                        })
                )
                .build();

        // ES 검색
        SearchHits<SubmissionDocument> hits = operations.search(query, SubmissionDocument.class);

        // 데이터만 추출
        List<SubmissionDocument> contents = hits.getSearchHits().stream()
                .map(SearchHit::getContent)
                .toList();

        // 조건에 맞는 전체 문서 개수
        long totalHits = hits.getTotalHits();

        return new PageImpl<>(contents, pageable, totalHits);
    }
}
