package com.ssafy.a208.domain.contest.controller;

import com.ssafy.a208.domain.contest.dto.SubmissionCreateReq;
import com.ssafy.a208.domain.contest.dto.SubmissionDetailRes;
import com.ssafy.a208.domain.contest.dto.SubmissionListRes;
import com.ssafy.a208.domain.contest.service.SubmissionService;
import com.ssafy.a208.global.common.dto.ApiResponse;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/contests/{contestId}/submissions")
@Tag(name = "대회 제출물", description = "대회 제출물 생성/조회/수정/삭제, 투표 API가 담겨있어요")
public class SubmissionRestController {

    private final SubmissionService submissionService;

    @PostMapping
    @Operation(summary = "제출물 생성 API", description = "대회 제출물을 생성하는 API입니다.")
    public ResponseEntity<ApiResponse<SubmissionDetailRes>> createSubmission(
            @PathVariable Long contestId,
            @Valid @RequestBody SubmissionCreateReq submissionCreateReq,
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        SubmissionDetailRes res = submissionService.createSubmission(contestId, submissionCreateReq, customUserDetails);
        return ApiResponse.create(res);
    }

    @GetMapping
    @Operation(summary = "제출물 목록 조회 API", description = "제출 목록을 조회하는 API입니다.")
    public ResponseEntity<ApiResponse<SubmissionListRes>> getSubmissionList(
            @PathVariable Long contestId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "") String sorter,
            @RequestParam(defaultValue = "") String author
    ) {
        SubmissionListRes res = submissionService.getSubmissionList(contestId, page, size, sorter, author);
        return ApiResponse.ok(res);
    }

    @GetMapping("/{submissionId}")
    @Operation(summary = "제출물 상세 조회 API", description = "제출물 정보를 조회하는 API입니다.")
    public ResponseEntity<ApiResponse<SubmissionDetailRes>> getSubmissionDetail(
            @PathVariable Long contestId,
            @PathVariable Long submissionId
    ) {
        SubmissionDetailRes res = submissionService.getSubmissionDetail(contestId, submissionId);
        return ApiResponse.ok(res);
    }

    @PutMapping("/{submissionId}")
    @Operation(summary = "제출물 수정 API", description = "제출물을 수정하는 API입니다.")
    public ResponseEntity<ApiResponse<Void>> updateSubmission(
            @PathVariable Long contestId,
            @PathVariable Long submissionId,
            @Valid @RequestBody SubmissionCreateReq submissionCreateReq,
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        submissionService.updateSubmission(contestId, submissionId, submissionCreateReq, customUserDetails);
        return ApiResponse.ok();
    }

    @DeleteMapping("/{submissionId}")
    @Operation(summary = "제출물 삭제 API", description = "제출물을 삭제하는 API입니다.")
    public ResponseEntity<ApiResponse<Void>> deleteSubmission(
            @PathVariable Long contestId,
            @PathVariable Long submissionId,
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        submissionService.deleteSubmission(contestId, submissionId, customUserDetails);
        return ApiResponse.ok();
    }
}
