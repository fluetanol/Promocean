package com.ssafy.a208.domain.board.controller;

import com.ssafy.a208.domain.board.dto.TrendingPostRes;
import com.ssafy.a208.domain.board.service.TrendingPostService;
import com.ssafy.a208.global.common.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
@Tag(name = "실시간 인기글", description = "실시간 인기글 조회 API가 담겨있어요")
public class TrendingPostRestController {

    private final TrendingPostService trendingPostService;

    @GetMapping("/trending")
    @Operation(
            summary = "실시간 인기글 조회 API",
            description = "좋아요와 댓글 수를 기반으로 실시간 인기글을 조회합니다. 최근 게시글일수록 가중치가 높습니다."
    )
    public ResponseEntity<ApiResponse<TrendingPostRes>> getTrendingPosts(
            @Parameter(description = "조회할 게시글 개수 (기본값: 3, 최대: 10)", example = "3")
            @RequestParam(defaultValue = "3") int limit) {

        // limit 최대값 제한
        if (limit > 10) {
            limit = 10;
        }

        TrendingPostRes res = trendingPostService.getTrendingPosts(limit);
        return ApiResponse.ok(res);
    }
}