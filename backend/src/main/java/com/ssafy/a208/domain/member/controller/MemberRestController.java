package com.ssafy.a208.domain.member.controller;

import com.ssafy.a208.domain.member.dto.request.SignupReq;
import com.ssafy.a208.domain.member.dto.request.UpdateMemberReq;
import com.ssafy.a208.domain.member.dto.response.CheckDuplicateRes;
import com.ssafy.a208.domain.member.dto.response.UsableTokenRes;
import com.ssafy.a208.domain.member.service.MemberService;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/members")
@Tag(name = "회원", description = "회원가입/탈퇴, 내정보 수정, 중복확인, 남은토큰 확인 API가 담겨있어요")
public class MemberRestController {

    private final MemberService memberService;

    @PostMapping("/join")
    @Operation(summary = "회원가입 API", description = "회원가입할 때 사용하는 API입니다")
    public ResponseEntity<ApiResponse<Void>> join(
            @RequestBody @Valid SignupReq signupReq
    ) {
        memberService.signup(signupReq);
        return ApiResponse.ok();
    }

    @DeleteMapping("/withdrawal")
    @Operation(summary = "탈퇴 API", description = "회원 탈퇴할 때 사용하는 API입니다")
    public ResponseEntity<ApiResponse<Void>> withdrawal(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        memberService.withdrawal(userDetails);
        return ApiResponse.ok();
    }

    @PatchMapping
    @Operation(summary = "회원정보 수정 API", description = "내 정보를 수정할 때 사용하는 API입니다")
    public ResponseEntity<ApiResponse<Void>> updateMemberInfo(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody @Valid UpdateMemberReq memberReq
    ) {
        memberService.updateMember(userDetails, memberReq);
        return ApiResponse.ok();
    }

    @GetMapping
    @Operation(summary = "닉네임/이메일 중복 확인 API", description = "닉네임/이메일 중복을 확인할 때 사용하는 API입니다")
    public ResponseEntity<ApiResponse<CheckDuplicateRes>> checkDuplicate(
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String nickname
    ) {
        CheckDuplicateRes res = memberService.checkDuplicate(email, nickname);
        return ApiResponse.ok(res);
    }

    @GetMapping("/token")
    @Operation(summary = "남은 토큰 확인 API", description = "생성형 AI를 사용할 때 필요한 토큰 잔량을 확인하는 API입니다")
    public ResponseEntity<ApiResponse<UsableTokenRes>> getUsableToken(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ){
        UsableTokenRes res = memberService.getUsableToken(userDetails);
        return ApiResponse.ok(res);
    }


}
