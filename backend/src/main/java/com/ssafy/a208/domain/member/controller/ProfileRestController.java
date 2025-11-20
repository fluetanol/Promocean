package com.ssafy.a208.domain.member.controller;

import com.ssafy.a208.domain.member.dto.response.ProfileRes;
import com.ssafy.a208.domain.member.service.ProfileService;
import com.ssafy.a208.global.common.dto.ApiResponse;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/members/profile")
@Tag(name = "프로필", description = "프로필 삭제(기본으로 변경) API가 담겨있어요")
public class ProfileRestController {

    private final ProfileService profileService;

    @PatchMapping
    @Operation(summary = "회원 프로필 삭제(기본으로 변경) API", description = "회원 프로필을 기본 프로필로 변경 API입니다")
    public ResponseEntity<ApiResponse<ProfileRes>> updateProfileToDefault(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        ProfileRes res = profileService.updateProfileToDefault(userDetails);
        return ApiResponse.ok(res);
    }
}
