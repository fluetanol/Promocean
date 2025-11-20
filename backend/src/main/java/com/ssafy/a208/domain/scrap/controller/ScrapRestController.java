package com.ssafy.a208.domain.scrap.controller;

import com.ssafy.a208.domain.scrap.dto.ScrapListRes;
import com.ssafy.a208.domain.scrap.dto.ScrapQueryDto;
import com.ssafy.a208.domain.scrap.service.ScrapService;
import com.ssafy.a208.global.common.dto.ApiResponse;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

/**
 * 스크랩 관련 REST API 컨트롤러
 */
@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
@Tag(name = "스크랩", description = "게시글 스크랩/취소/목록조회 API가 담겨있어요")
public class ScrapRestController {

    private final ScrapService scrapService;

    /**
     * 게시글 스크랩 API
     * 인증된 사용자가 게시글을 스크랩합니다.
     *
     * @param userDetails 인증된 사용자 정보
     * @param postId 게시글 ID
     * @return 응답 없음
     */
    @PostMapping("/{postId}/scraps")
    @Operation(
            summary = "게시글 스크랩 API",
            description = "인증된 사용자가 게시글을 스크랩합니다. 중복 스크랩은 불가능합니다."
    )
    public ResponseEntity<ApiResponse<Void>> createScrap(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long postId
    ) {
        scrapService.createScrap(userDetails, postId);
        return ApiResponse.create();
    }

    /**
     * 게시글 스크랩 취소 API
     * 인증된 사용자가 스크랩한 게시글의 스크랩을 취소합니다.
     *
     * @param userDetails 인증된 사용자 정보
     * @param postId 게시글 ID
     * @return 응답 없음
     */
    @DeleteMapping("/{postId}/scraps")
    @Operation(
            summary = "게시글 스크랩 취소 API",
            description = "인증된 사용자가 스크랩한 게시글의 스크랩을 취소합니다. 소프트 딜리트 방식으로 처리됩니다."
    )
    public ResponseEntity<ApiResponse<Void>> deleteScrap(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long postId
    ) {
        scrapService.deleteScrap(userDetails, postId);
        return ApiResponse.ok();
    }

    /**
     * 스크랩 목록 조회 API
     * 로그인한 사용자의 스크랩 목록을 조회합니다.
     *
     * @param userDetails 인증된 사용자 정보
     * @param query 검색 조건
     * @return 스크랩 목록
     */
    @GetMapping("/scraps")
    @Operation(
            summary = "스크랩 목록 조회 API",
            description = "로그인한 사용자의 스크랩 목록을 조회합니다. 작성자, 제목, 태그, 카테고리, 프롬프트 타입으로 필터링 가능하며, 최신순/오래된순 정렬을 지원합니다."
    )
    public ResponseEntity<ApiResponse<ScrapListRes>> getScraps(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @ModelAttribute @Valid ScrapQueryDto query
    ) {
        ScrapListRes res = scrapService.getScrapsV2(userDetails, query);
        return ApiResponse.ok(res);
    }
}