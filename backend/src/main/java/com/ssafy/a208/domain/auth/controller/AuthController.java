package com.ssafy.a208.domain.auth.controller;


import com.ssafy.a208.domain.auth.dto.LoginReq;
import com.ssafy.a208.domain.auth.dto.LoginRes;
import com.ssafy.a208.domain.auth.service.AuthService;
import com.ssafy.a208.domain.member.dto.MemberInfo;
import com.ssafy.a208.global.common.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
@Tag(name = "Auth", description = "회원 인증 관련 API")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    @Operation(summary = "로그인")
    public ResponseEntity<ApiResponse<MemberInfo>> login(
            @RequestBody @Valid LoginReq loginReq
    ) {
        LoginRes loginRes = authService.login(loginReq);
        MemberInfo memberInfo = MemberInfo.builder()
                .email(loginRes.email())
                .nickname(loginRes.nickname())
                .profileUrl(loginRes.profileUrl())
                .personalSpaceId(loginRes.personalSpaceId())
                .isRead(loginRes.isRead())
                .build();
        return ApiResponse.ofToken(memberInfo, loginRes.accessToken());
    }

    @PostMapping("/logout")
    @Operation(summary = "로그아웃")
    public ResponseEntity<ApiResponse<Void>> logout() {
        return ApiResponse.ok();
    }

}