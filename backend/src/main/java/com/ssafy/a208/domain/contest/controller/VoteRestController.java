package com.ssafy.a208.domain.contest.controller;

import com.ssafy.a208.domain.contest.service.VoteService;
import com.ssafy.a208.global.common.dto.ApiResponse;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/contests/{contestId}/submissions/{submissionId}/votes")
@Tag(name = "투표", description = "대회 제출물에 투표하는 API가 담겨있어요")
public class VoteRestController {

    private final VoteService voteService;

    @PostMapping
    @Operation(summary = "투표 API", description = "제출물에 투표하는 API입니다.")
    public ResponseEntity<ApiResponse<Void>> createVote(
            @PathVariable Long contestId,
            @PathVariable Long submissionId,
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        voteService.createVote(contestId, submissionId, customUserDetails);
        return ApiResponse.ok();
    }
}
