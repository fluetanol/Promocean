package com.ssafy.a208.domain.board.controller;

import com.ssafy.a208.domain.board.dto.*;
import com.ssafy.a208.domain.board.service.PostService;
import com.ssafy.a208.global.common.dto.ApiResponse;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

/**
 * 게시글 관련 REST API 컨트롤러
 */
@Slf4j
@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
@Tag(name = "게시글", description = "게시글 작성/수정/삭제/상세 조회/목록 조회 API가 담겨있어요")
public class PostRestController {

    private final PostService postService;

    /**
     * 게시글 작성 API
     * 로그인한 사용자가 텍스트 또는 이미지 프롬프트 게시글을 작성합니다.
     *
     * @param userDetails 인증된 사용자 정보
     * @param req 게시글 작성 요청 DTO
     * @return 생성된 게시글의 ID
     */
    @PostMapping
    @Operation(
            summary = "게시글 작성 API",
            description = "로그인한 사용자가 텍스트 또는 이미지 프롬프트 게시글을 작성합니다."
    )
    public ResponseEntity<ApiResponse<PostCreateRes>> createPost(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody PostCreateReq req
    ) {
        PostCreateRes res = postService.createPost(userDetails, req);
        return ApiResponse.create(res);
    }

    /**
     * 게시글 수정 API
     * 게시글 작성자가 게시글을 수정합니다.
     *
     * @param userDetails 인증된 사용자 정보
     * @param postId 수정할 게시글 ID
     * @param req 게시글 수정 요청 DTO
     * @return 수정된 게시글의 ID
     */
    @PutMapping("/{postId}")
    @Operation(
            summary = "게시글 수정 API",
            description = "게시글 작성자가 게시글을 수정합니다."
    )
    public ResponseEntity<ApiResponse<PostUpdateRes>> updatePost(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long postId,
            @Valid @RequestBody PostUpdateReq req
    ) {
        PostUpdateRes res = postService.updatePost(userDetails, postId, req);
        return ApiResponse.ok(res);
    }

    /**
     * 게시글 삭제 API
     * 게시글 작성자가 게시글을 삭제합니다.
     *
     * @param userDetails 인증된 사용자 정보
     * @param postId 삭제할 게시글 ID
     * @return 응답 없음
     */
    @DeleteMapping("/{postId}")
    @Operation(
            summary = "게시글 삭제 API",
            description = "게시글 작성자가 게시글을 삭제합니다. 소프트 딜리트 방식으로 처리됩니다."
    )
    public ResponseEntity<ApiResponse<Void>> deletePost(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long postId
    ) {
        postService.deletePost(userDetails, postId);
        return ApiResponse.ok();
    }

    /**
     * 게시글 상세 조회 API
     * 게시글의 상세 정보를 조회합니다. 비로그인 사용자도 조회 가능합니다.
     *
     * @param userDetails 인증된 사용자 정보 (Optional)
     * @param postId 조회할 게시글 ID
     * @return 게시글 상세 정보
     */
    @GetMapping("/{postId}")
    @Operation(
            summary = "게시글 상세 조회 API",
            description = "게시글의 상세 정보를 조회합니다. 비로그인 사용자도 조회 가능합니다."
    )
    public ResponseEntity<ApiResponse<PostDetailRes>> getPostDetail(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long postId
    ) {
        PostDetailRes res = postService.getPostDetail(userDetails, postId);
        return ApiResponse.ok(res);
    }

    /**
     * 게시글 목록 조회 API
     * 게시글 목록을 조회합니다. 비로그인 사용자도 조회 가능합니다.
     *
     * @param query 검색 조건
     * @return 게시글 목록
     */
    @GetMapping
    @Operation(
            summary = "게시글 목록 조회 API",
            description = "게시글 목록을 조회합니다. 작성자, 제목, 태그, 카테고리, 프롬프트 타입으로 필터링 가능하며, 최신순/인기순 정렬을 지원합니다. 비로그인 사용자도 조회 가능합니다."
    )
    public ResponseEntity<ApiResponse<PostListRes>> getPosts(
            @ModelAttribute @Valid PostListQueryDto query
    ) {
        PostListRes res = postService.getPostsV4(query);
        return ApiResponse.ok(res);
    }
}
