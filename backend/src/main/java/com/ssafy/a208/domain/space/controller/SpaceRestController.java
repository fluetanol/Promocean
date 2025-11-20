package com.ssafy.a208.domain.space.controller;

import com.ssafy.a208.domain.space.dto.request.SpaceReq;
import com.ssafy.a208.domain.space.dto.request.SpaceUpdateReq;
import com.ssafy.a208.domain.space.dto.response.space.SpaceDetailRes;
import com.ssafy.a208.domain.space.dto.response.space.SpaceInfoListRes;
import com.ssafy.a208.domain.space.dto.response.space.SpaceRes;
import com.ssafy.a208.domain.space.service.SpaceService;
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
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/spaces")
@Tag(name = "스페이스", description = "스페이스 생성/조회/수정/삭제 API가 담겨있어요")
public class SpaceRestController {
    private final SpaceService spaceService;

    @PostMapping
    @Operation(summary = "팀스페이스 생성", description = "팀스페이스를 생성하는 API입니다.")
    public ResponseEntity<ApiResponse<SpaceRes>> createTeamSpace(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody @Valid SpaceReq spaceReq
    ) {
        SpaceRes spaceSummaryRes = spaceService.createTeamSpace(userDetails, spaceReq);
        return ApiResponse.create(spaceSummaryRes);
    }

    @GetMapping
    @Operation(summary = "팀스페이스 목록조회", description = "팀스페이스 목록을 조회하는 API입니다.")
    public ResponseEntity<ApiResponse<SpaceInfoListRes>> getTeamSpaces(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        SpaceInfoListRes teamSpaces = spaceService.getTeamSpaces(userDetails);
        return ApiResponse.ok(teamSpaces);
    }

    @PatchMapping("/{spaceId}")
    @Operation(summary = "스페이스 수정", description = "스페이스의 제목과 커버 이미지를 수정하는 API입니다.")
    public ResponseEntity<ApiResponse<SpaceDetailRes>> updateSpace(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long spaceId,
            @RequestBody @Valid SpaceUpdateReq spaceUpdateReq
    ) {
        spaceService.updateTeamSpace(userDetails, spaceId, spaceUpdateReq);
        return ApiResponse.ok();
    }

    @DeleteMapping("/{spaceId}")
    @Operation(summary = "팀스페이스 삭제", description = "팀스페이스를 삭제할 수 있습니다.")
    public ResponseEntity<ApiResponse<SpaceDetailRes>> deleteTeamSpace(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long spaceId
    ) {
        spaceService.deleteTeamSpace(userDetails, spaceId);
        return ApiResponse.ok();
    }

}
