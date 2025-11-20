package com.ssafy.a208.global.image.controller;

import com.ssafy.a208.global.common.dto.ApiResponse;
import com.ssafy.a208.global.image.dto.S3Url;
import com.ssafy.a208.global.image.service.S3Service;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/images")
@Tag(name = "S3 이미지", description = "S3에 업로드할 URL 생성 API가 담겨있어요")
public class S3Controller {

    private final S3Service s3Service;

    @GetMapping
    @Operation(summary = "S3에 업로드할 URL 생성 API", description = "S3에 이미지를 업로드하기 위한 URL을 생성하는 API입니다.")
    public ResponseEntity<ApiResponse<S3Url>> getPostUrl(
            @RequestParam String filename
    ) {
        S3Url url = s3Service.getPostS3Url(filename);
        return ApiResponse.ok(url);
    }

}
