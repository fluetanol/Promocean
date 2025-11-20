package com.ssafy.a208.domain.space.controller;

import com.ssafy.a208.domain.space.dto.request.FolderReq;
import com.ssafy.a208.domain.space.dto.response.folder.FolderInfoListRes;
import com.ssafy.a208.domain.space.dto.response.folder.FolderInfoRes;
import com.ssafy.a208.domain.space.service.FolderService;
import com.ssafy.a208.global.common.dto.ApiResponse;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
@RequestMapping("/api/v1/spaces/{spaceId}/folders")
@Tag(name = "폴더", description = "폴더 생성/수정/삭제/핀 API가 담겨있어요")
public class FolderRestController {

    private final FolderService folderService;

    @PostMapping
    @Operation(summary = "폴더 생성 API", description = "폴더를 생성하는 API입니다.")
    public ResponseEntity<ApiResponse<FolderInfoRes>> createFolder(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long spaceId,
            @RequestBody @Valid FolderReq folderReq
    ) {
        FolderInfoRes res = folderService.createFolder(userDetails, spaceId, folderReq);
        return ApiResponse.create(res);
    }

    @GetMapping
    @Operation(summary = "폴더 목록 조회 API", description = " 폴더 목록을 조회하는 API입니다.")
    public ResponseEntity<ApiResponse<FolderInfoListRes>> getTeamSpace(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long spaceId
    ) {
        FolderInfoListRes folders = folderService.getFolders(userDetails, spaceId);
        return ApiResponse.of(HttpStatus.OK, folders);
    }

    @PatchMapping("/{folderId}")
    @Operation(summary = "폴더 수정 API", description = "폴더를 수정하는 API입니다.")
    public ResponseEntity<ApiResponse<Void>> updateFolder(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long spaceId,
            @PathVariable Long folderId,
            @RequestBody @Valid FolderReq folderReq
    ) {
        folderService.updateFolder(userDetails, spaceId, folderId, folderReq);
        return ApiResponse.ok();
    }

    @DeleteMapping("/{folderId}")
    @Operation(summary = "폴더 삭제 API", description = "폴더를 삭제하는 API입니다.")
    public ResponseEntity<ApiResponse<Void>> deleteFolder(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long spaceId,
            @PathVariable Long folderId
    ) {
        folderService.deleteFolder(userDetails, spaceId, folderId);
        return ApiResponse.ok();
    }

    @PatchMapping("/{folderId}/pin")
    @Operation(summary = "폴더 핀찍기/삭제 API", description = "폴더에 핀 찍기/삭제하는 API입니다.")
    public ResponseEntity<ApiResponse<FolderInfoRes>> pinFolder(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long spaceId,
            @PathVariable Long folderId
    ) {
        FolderInfoRes res = folderService.pinFolder(userDetails, spaceId, folderId);
        return ApiResponse.ok(res);
    }

}
