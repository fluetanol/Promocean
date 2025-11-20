package com.ssafy.a208.domain.tag.service;

import com.ssafy.a208.domain.tag.document.TagDocument;
import com.ssafy.a208.domain.tag.entity.Tag;
import com.ssafy.a208.domain.tag.repository.ArticleTagRepository;
import com.ssafy.a208.domain.tag.repository.PostTagRepository;
import com.ssafy.a208.domain.tag.repository.TagElasticsearchRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * 태그 ElasticSearch 동기화 서비스
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class TagIndexService {

    private final TagElasticsearchRepository tagElasticsearchRepository;
    private final PostTagRepository postTagRepository;
    private final ArticleTagRepository articleTagRepository;

    /**
     * 태그를 ES에 인덱싱
     */
    public void indexTag(Tag tag) {
        try {
            // Post + Article 사용 횟수 합산
            int postUsageCount = postTagRepository.countByTagIdAndDeletedAtIsNull(tag.getId());
            int articleUsageCount = articleTagRepository.countByTagIdAndDeletedAtIsNull(tag.getId());
            int totalUsageCnt = postUsageCount + articleUsageCount;

            TagDocument document = TagDocument.builder()
                    .id(tag.getId())
                    .name(tag.getName())
                    .usageCnt(totalUsageCnt)
                    .build();

            tagElasticsearchRepository.save(document);
            log.info("태그 ES 인덱싱 완료 - tagId: {}, name: {}, usageCnt: {}",
                    tag.getId(), tag.getName(), totalUsageCnt);
        } catch (Exception e) {
            log.error("태그 ES 인덱싱 실패 - tagId: {}, error: {}", tag.getId(), e.getMessage(), e);
        }
    }

    /**
     * 태그 사용 횟수만 업데이트
     */
    public void updateTagUsageCount(Long tagId) {
        try {
            // Post + Article 사용 횟수 합산
            int postUsageCount = postTagRepository.countByTagIdAndDeletedAtIsNull(tagId);
            int articleUsageCount = articleTagRepository.countByTagIdAndDeletedAtIsNull(tagId);
            int totalUsageCnt = postUsageCount + articleUsageCount;

            tagElasticsearchRepository.findById(tagId).ifPresent(document -> {
                TagDocument updated = TagDocument.builder()
                        .id(document.getId())
                        .name(document.getName())
                        .usageCnt(totalUsageCnt)
                        .build();

                tagElasticsearchRepository.save(updated);
                log.info("태그 사용 횟수 업데이트 완료 - tagId: {}, usageCnt: {}",
                        tagId, totalUsageCnt);
            });
        } catch (Exception e) {
            log.error("태그 사용 횟수 업데이트 실패 - tagId: {}, error: {}", tagId, e.getMessage(), e);
        }
    }

    /**
     * 태그를 ES에서 삭제
     */
    // 지금은 안 쓰지만 일단 남겨두겠슴니다.
    public void deleteTag(Long tagId) {
        try {
            tagElasticsearchRepository.deleteById(tagId);
            log.info("태그 ES 삭제 완료 - tagId: {}", tagId);
        } catch (Exception e) {
            log.error("태그 ES 삭제 실패 - tagId: {}, error: {}", tagId, e.getMessage(), e);
        }
    }
}