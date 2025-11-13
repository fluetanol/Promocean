package com.ssafy.a208.domain.contest.controller;

import com.ssafy.a208.domain.contest.dto.ContestCreateReq;
import com.ssafy.a208.domain.contest.dto.ContestDetailRes;
import com.ssafy.a208.domain.contest.dto.ContestListRes;
import com.ssafy.a208.domain.contest.service.ContestService;
import com.ssafy.a208.global.common.dto.ApiResponse;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/contests")
@Tag(name = "대회", description = "대회 생성/조회/수정 API가 담겨있어요")
public class ContestRestController {

    private final ContestService contestService;

    @PostMapping
    @Operation(summary = "대회 생성 API", description = "대회를 생성하는 API입니다.")
    public ResponseEntity<ApiResponse<ContestDetailRes>> createContest(
            @Valid @RequestBody ContestCreateReq contestCreateReq,
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        ContestDetailRes res = contestService.createContest(contestCreateReq, customUserDetails);

        return ApiResponse.create(res);
    }

    @GetMapping
    @Operation(summary = "대회 목록조회 API", description = "대회 목록을 조회하는 API입니다.")
    public ResponseEntity<ApiResponse<ContestListRes>> getContestList(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "") String sorter,
            @RequestParam(defaultValue = "") String status,
            @RequestParam(defaultValue = "") String title
    ) {
        ContestListRes res = contestService.getContestList(page, size, sorter, status, title);

        return ApiResponse.ok(res);
    }

    @GetMapping("/{contestId}")
    @Operation(summary = "대회 상세조회 API", description = "대회의 상세 정보를 조회하는 API입니다.")
    public ResponseEntity<ApiResponse<ContestDetailRes>> getContest(
            @PathVariable Long contestId
    ) {
        ContestDetailRes res = contestService.getContest(contestId);

        return ApiResponse.ok(res);
    }

    @PutMapping("/{contestId}")
    @Operation(summary = "대회 수정 API", description = "대회를 수정하는 API입니다.")
    public ResponseEntity<ApiResponse<ContestDetailRes>> updateContest(
            @PathVariable Long contestId,
            @Valid @RequestBody ContestCreateReq contestCreateReq,
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        contestService.updateContest(contestId, contestCreateReq, customUserDetails);

        return ApiResponse.ok();
    }
}
