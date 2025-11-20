package com.ssafy.a208.domain.board.controller;

import com.ssafy.a208.domain.board.service.PostLikeService;
import com.ssafy.a208.global.common.dto.ApiResponse;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
@Tag(name = "게시글 좋아요", description = "게시글 좋아요 API가 담겨있어요")
public class PostLikeRestController {

    private final PostLikeService postLikeService;

    /**
     * 게시글 좋아요 API
     * 인증된 사용자가 게시글에 좋아요를 누릅니다.
     *
     * @param userDetails 인증된 사용자 정보
     * @param postId 게시글 ID
     * @return 응답 없음
     */
    @PostMapping("/{postId}/likes")
    @Operation(
            summary = "게시글 좋아요 API",
            description = "인증된 사용자가 게시글에 좋아요를 누릅니다. 중복 좋아요는 불가능합니다."
    )
    public ResponseEntity<ApiResponse<Void>> createPostLike(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long postId
    ) {
        postLikeService.createPostLike(userDetails, postId);
        return ApiResponse.ok();
    }
}