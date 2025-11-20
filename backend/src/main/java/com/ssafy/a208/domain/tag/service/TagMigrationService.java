package com.ssafy.a208.domain.tag.service;

import com.ssafy.a208.domain.tag.entity.Tag;
import com.ssafy.a208.domain.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 태그 ElasticSearch 마이그레이션 서비스
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class TagMigrationService {

    private final TagRepository tagRepository;
    private final TagIndexService tagIndexService;

    /**
     * 모든 태그를 ElasticSearch에 마이그레이션
     */
    @Transactional(readOnly = true)
    public void migrateAllTagsToElasticsearch() {
        List<Tag> tags = tagRepository.findAll();

        log.info("태그 ES 마이그레이션 시작 - 총 {} 건", tags.size());

        tags.forEach(tag -> {
            try {
                tagIndexService.indexTag(tag);
            } catch (Exception e) {
                log.error("태그 인덱싱 실패 - tagId: {}", tag.getId(), e);
            }
        });

        log.info("태그 ES 마이그레이션 완료 - 총 {} 건", tags.size());
    }
}