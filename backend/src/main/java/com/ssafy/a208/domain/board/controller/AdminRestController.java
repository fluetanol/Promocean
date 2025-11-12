package com.ssafy.a208.domain.board.controller;

import com.ssafy.a208.domain.board.service.PostMigrationService;
import com.ssafy.a208.domain.scrap.service.ScrapMigrationService;
import com.ssafy.a208.domain.tag.service.TagMigrationService;
import com.ssafy.a208.global.common.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@Tag(name = "관리자", description = "관리자 전용 API입니다. 현재는 ES 마이그레이션 API가 담겨있어요.")
public class AdminRestController {

    private final PostMigrationService postMigrationService;
    private final TagMigrationService tagMigrationService;
    private final ScrapMigrationService scrapMigrationService;

    /**
     * 게시글 ElasticSearch 마이그레이션
     */
    @PostMapping("/migrate-posts")
    @Operation(
            summary = "게시글 ES 마이그레이션 API",
            description = "기존 PostgreSQL의 게시글을 ElasticSearch로 마이그레이션합니다. 최초 1회만 실행하면 됩니다."
    )
    public ResponseEntity<ApiResponse<String>> migratePosts() {
        log.info("게시글 마이그레이션 API 호출");
        postMigrationService.migrateAllPostsToElasticsearch();
        return ApiResponse.ok("마이그레이션 완료");
    }

    /**
     *태그 ElasticSearch 마이그레이션
     */
    @PostMapping("/migrate-tags")
    @Operation(
            summary = "태그 ES 마이그레이션 API",
            description = "기존 PostgreSQL의 태그를 ElasticSearch로 마이그레이션합니다."
    )
    public ResponseEntity<ApiResponse<String>> migrateTags() {
        log.info("태그 마이그레이션 API 호출");
        tagMigrationService.migrateAllTagsToElasticsearch();
        return ApiResponse.ok("태그 마이그레이션 완료");
    }

    /**
     *스크랩 ElasticSearch 마이그레이션
     */
    @PostMapping("/migrate-scraps")
    @Operation(
            summary = "스크랩 ES 마이그레이션 API",
            description = "기존 PostgreSQL의 스크랩을 ElasticSearch로 마이그레이션합니다."
    )
    public ResponseEntity<ApiResponse<String>> migrateScraps() {
        log.info("스크랩 마이그레이션 API 호출");
        scrapMigrationService.migrateAllScrapsToElasticsearch();
        return ApiResponse.ok("스크랩 마이그레이션 완료");
    }
}