package com.ssafy.a208.domain.board.service;

import com.ssafy.a208.domain.board.entity.Post;
import com.ssafy.a208.domain.board.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 기존 DB 데이터를 ElasticSearch로 마이그레이션
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class PostMigrationService {

    private final PostRepository postRepository;
    private final PostIndexService postIndexService;

    /**
     * 모든 게시글을 ElasticSearch에 마이그레이션
     */
    @Transactional(readOnly = true)
    public void migrateAllPostsToElasticsearch() {
        int pageSize = 100;
        int pageNumber = 0;
        long totalMigrated = 0;

        // 전체 개수 조회
        long totalCount = postRepository.count();
        log.info("게시글 ES 마이그레이션 시작 - 총 {} 건", totalCount);

        while (true) {
            Page<Post> postPage = postRepository.findAll(PageRequest.of(pageNumber, pageSize));

            if (postPage.isEmpty()) {
                break;
            }

            postPage.getContent().forEach(post -> {
                if (post.getDeletedAt() == null) {
                    try {
                        postIndexService.indexPost(post);
                    } catch (Exception e) {
                        log.error("게시글 인덱싱 실패 - postId: {}", post.getId(), e);
                    }
                }
            });

            totalMigrated += postPage.getNumberOfElements();
            pageNumber++;

            double progress = (totalMigrated * 100.0) / totalCount;
            log.info("마이그레이션 진행 중 - {}/{} 건 ({:.1f}%)",
                    totalMigrated, totalCount, progress);
        }

        log.info("게시글 ES 마이그레이션 완료 - 총 {} 건", totalMigrated);
    }
}