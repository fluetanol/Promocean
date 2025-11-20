package com.ssafy.a208.domain.tag.service;

import com.ssafy.a208.domain.tag.document.TagDocument;
import com.ssafy.a208.domain.tag.dto.TagAutocompleteDto;
import com.ssafy.a208.domain.tag.repository.TagElasticsearchRepositoryImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 태그 검색 서비스
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class TagSearchService {

    private final TagElasticsearchRepositoryImpl tagElasticsearchRepositoryImpl;

    /**
     * 태그 자동완성
     */
    public List<TagAutocompleteDto> autocomplete(String keyword, int size) {
        List<TagDocument> documents = tagElasticsearchRepositoryImpl
                .searchTagsForAutocomplete(keyword, size);

        log.info("태그 자동완성 검색 완료 - keyword: {}, 결과 수: {}", keyword, documents.size());

        return documents.stream()
                .map(doc -> TagAutocompleteDto.builder()
                        .tagId(doc.getId())
                        .name(doc.getName())
                        .usageCnt(doc.getUsageCnt())
                        .build())
                .toList();
    }
}