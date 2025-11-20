package com.ssafy.a208.domain.space.controller;

import com.ssafy.a208.domain.space.dto.request.ParticipantListReq;
import com.ssafy.a208.domain.space.dto.request.ParticipantNicknameUpdateReq;
import com.ssafy.a208.domain.space.dto.request.ParticipantReq;
import com.ssafy.a208.domain.space.dto.response.participant.ParticipantInfoListRes;
import com.ssafy.a208.domain.space.service.ParticipantService;
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
@RequestMapping("/api/v1/spaces/{spaceId}/participants")
@Tag(name = "참가자", description = "참가자 추가, 조회, 수정, 삭제 API가 담겨있어요")
public class ParticipantRestController {

    private final ParticipantService participantService;

    @PostMapping
    @Operation(summary = "참가자들 추가", description = "참가자들을 초대하는 API입니다.")
    public ResponseEntity<ApiResponse<Void>> createParticipants(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long spaceId,
            @RequestBody @Valid ParticipantListReq participantListReq
    ) {
        participantService.saveParticipants(userDetails, participantListReq, spaceId);
        return ApiResponse.ok();
    }

    @GetMapping
    @Operation(summary = "참가자 목록 조회", description = "참가자 목록을 조회하는 API입니다.")
    public ResponseEntity<ApiResponse<ParticipantInfoListRes>> getParticipants(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long spaceId
    ) {
        ParticipantInfoListRes participants = participantService.getParticipants(userDetails,
                spaceId);
        return ApiResponse.ok(participants);
    }

    @PatchMapping
    @Operation(summary = "참가자 권한 수정", description = "참가자의 권한을 수정하는 API입니다.")
    public ResponseEntity<ApiResponse<Void>> updateParticipantsRole(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long spaceId,
            @RequestBody @Valid ParticipantReq participantReq
    ) {
        participantService.updateParticipantRole(userDetails, participantReq, spaceId);
        return ApiResponse.ok();
    }

    @PatchMapping("/me")
    @Operation(summary = "참가자 이름 수정", description = "참가자 본인의 닉네임을 수정하는 API입니다.")
    public ResponseEntity<ApiResponse<Void>> updateParticipantNickname(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long spaceId,
            @RequestBody @Valid ParticipantNicknameUpdateReq  participantNicknameUpdateReq
    ) {
        participantService.updateParticipantNickname(userDetails, participantNicknameUpdateReq, spaceId);
        return ApiResponse.ok();
    }

    @DeleteMapping("/{participantId}")
    @Operation(summary = "참가자 삭제", description = "참가자를 삭제하는 API입니다.")
    public ResponseEntity<ApiResponse<Void>> deleteParticipants(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long spaceId,
            @PathVariable Long participantId
    ) {
        participantService.deleteParticipant(userDetails, spaceId, participantId);
        return ApiResponse.ok();
    }

    @DeleteMapping("/withdrawal")
    @Operation(summary = "참가자 탈퇴", description = "참가자가 탈퇴하는 API입니다.")
    public ResponseEntity<ApiResponse<Void>> withdrawalParticipants(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long spaceId
    ) {
        participantService.withdrawalParticipant(userDetails, spaceId);
        return ApiResponse.ok();
    }

}
