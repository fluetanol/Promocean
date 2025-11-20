package com.ssafy.a208.domain.board.controller;

import com.ssafy.a208.domain.board.dto.ReplyReq;
import com.ssafy.a208.domain.board.service.ReplyService;
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
 * 댓글 관련 REST API 컨트롤러
 */
@Slf4j
@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
@Tag(name = "게시글 댓글", description = "게시글 댓글 작성/수정/삭제 API가 담겨있어요")
public class ReplyRestController {

    private final ReplyService replyService;

    /**
     * 댓글 작성 API
     * 로그인한 사용자가 게시글에 댓글을 작성합니다.
     *
     * @param userDetails 인증된 사용자 정보
     * @param postId 게시글 ID
     * @param req 댓글 작성 요청 DTO
     * @return 응답 없음
     */
    @PostMapping("/{postId}/replies")
    @Operation(
            summary = "댓글 작성 API",
            description = "로그인한 사용자가 게시글에 댓글을 작성합니다."
    )
    public ResponseEntity<ApiResponse<Void>> createReply(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long postId,
            @Valid @RequestBody ReplyReq req
    ) {
        replyService.createReply(userDetails, postId, req);
        return ApiResponse.create();
    }

    /**
     * 댓글 수정 API
     * 댓글 작성자가 댓글을 수정합니다.
     *
     * @param userDetails 인증된 사용자 정보
     * @param postId 게시글 ID
     * @param replyId 댓글 ID
     * @param req 댓글 수정 요청 DTO
     * @return 응답 없음
     */
    @PutMapping("/{postId}/replies/{replyId}")
    @Operation(
            summary = "댓글 수정 API",
            description = "댓글 작성자가 댓글을 수정합니다."
    )
    public ResponseEntity<ApiResponse<Void>> updateReply(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long postId,
            @PathVariable Long replyId,
            @Valid @RequestBody ReplyReq req
    ) {
        replyService.updateReply(userDetails, postId, replyId, req);
        return ApiResponse.ok();
    }

    /**
     * 댓글 삭제 API
     * 댓글 작성자가 댓글을 삭제합니다.
     *
     * @param userDetails 인증된 사용자 정보
     * @param postId 게시글 ID
     * @param replyId 댓글 ID
     * @return 응답 없음
     */
    @DeleteMapping("/{postId}/replies/{replyId}")
    @Operation(
            summary = "댓글 삭제 API",
            description = "댓글 작성자가 댓글을 삭제합니다. 소프트 딜리트 방식으로 처리됩니다."
    )
    public ResponseEntity<ApiResponse<Void>> deleteReply(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long postId,
            @PathVariable Long replyId
    ) {
        replyService.deleteReply(userDetails, postId, replyId);
        return ApiResponse.ok();
    }
}