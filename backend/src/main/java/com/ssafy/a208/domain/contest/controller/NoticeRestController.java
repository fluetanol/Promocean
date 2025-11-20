package com.ssafy.a208.domain.contest.controller;

import com.ssafy.a208.domain.contest.dto.NoticeCreateReq;
import com.ssafy.a208.domain.contest.dto.NoticeDetailRes;
import com.ssafy.a208.domain.contest.dto.NoticeListRes;
import com.ssafy.a208.domain.contest.service.NoticeService;
import com.ssafy.a208.global.common.dto.ApiResponse;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/contests/{contestId}/notices")
@Tag(name = "대회 공지", description = "대회 공지 생성/조회/수정/삭제 API가 담겨있어요")
public class NoticeRestController {

    private final NoticeService noticeService;

    @PostMapping
    @Operation(summary = "공지 작성 API", description = "대회 공지를 작성하는 API입니다.")
    public ResponseEntity<ApiResponse<NoticeDetailRes>> createNotice(
            @PathVariable Long contestId,
            @Valid @RequestBody NoticeCreateReq noticeCreateReq,
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        NoticeDetailRes res = noticeService.createNotice(contestId, noticeCreateReq, customUserDetails);
        return ApiResponse.create(res);
    }

    @GetMapping
    @Operation(summary = "공지 목록조회 API", description = "공지 목록을 조회하는 API입니다.")
    public ResponseEntity<ApiResponse<List<NoticeListRes>>> getNoticeList(
            @PathVariable Long contestId
    ) {
        List<NoticeListRes> res = noticeService.getNoticeList(contestId);
        return ApiResponse.ok(res);
    }

    @GetMapping("/{noticeId}")
    @Operation(summary = "공지 상세조회 API", description = "공지 내용을 조회하는 API입니다.")
    public ResponseEntity<ApiResponse<NoticeDetailRes>> getNoticeDetail(
            @PathVariable Long contestId,
            @PathVariable Long noticeId
    ) {
        NoticeDetailRes res = noticeService.getNoticeDetail(contestId, noticeId);
        return ApiResponse.ok(res);
    }

    @PutMapping("/{noticeId}")
    @Operation(summary = "공지 수정 API", description = "공지 내용울 수정하는 API입니다.")
    public ResponseEntity<ApiResponse<Void>> updateNoticeDetail(
            @PathVariable Long contestId,
            @PathVariable Long noticeId,
            @Valid @RequestBody NoticeCreateReq noticeCreateReq,
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        noticeService.updateNotice(contestId, noticeId, noticeCreateReq, customUserDetails);
        return ApiResponse.ok();
    }

    @DeleteMapping("/{noticeId}")
    @Operation(summary = "공지 삭제 API", description = "대회 공지를 삭제하는 API입니다.")
    public ResponseEntity<ApiResponse<Void>> deleteNotice(
            @PathVariable Long contestId,
            @PathVariable Long noticeId,
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        noticeService.deleteNotice(contestId, noticeId, customUserDetails);
        return ApiResponse.ok();
    }
}
