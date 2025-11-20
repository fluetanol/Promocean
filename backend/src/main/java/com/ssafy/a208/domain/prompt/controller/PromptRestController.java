package com.ssafy.a208.domain.prompt.controller;

import com.ssafy.a208.domain.prompt.dto.ImagePromptReq;
import com.ssafy.a208.domain.prompt.dto.ImagePromptRes;
import com.ssafy.a208.domain.prompt.dto.TextPromptReq;
import com.ssafy.a208.domain.prompt.dto.TextPromptRes;
import com.ssafy.a208.domain.prompt.service.PromptService;
import com.ssafy.a208.global.common.dto.ApiResponse;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

/**
 * AI 프롬프트 처리 컨트롤러
 * GMS(GPT-5, Gemini)를 활용한 텍스트 및 이미지 생성 API를 제공
 */
@Slf4j
@RestController
@RequestMapping("/api/v1/prompt")
@RequiredArgsConstructor
@Tag(name = "AI 프롬프트 답변/이미지 생성", description = "GMS 기반 AI 프롬프트 텍스트/이미지 처리 API가 담겨있어요")
public class PromptRestController {

    private final PromptService promptService;

    /**
     * 텍스트 프롬프트 처리 API
     * GPT-5를 사용하여 주어진 프롬프트와 예상 질문에 대한 답변을 생성합니다.
     *
     * @param request 프롬프트와 예상 질문이 포함된 요청 DTO
     * @return 생성된 답변을 포함한 응답
     */
    @PostMapping("/text")
    @Operation(
            summary = "텍스트 프롬프트 처리 API",
            description = "GPT-5를 사용하여 프롬프트와 예상 질문에 대한 답변을 생성합니다."
    )
    public ResponseEntity<ApiResponse<TextPromptRes>> processTextPrompt(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody TextPromptReq request
    ) {
        TextPromptRes response = promptService.processTextPrompt(userDetails, request);
        return ApiResponse.create(response);
    }

    /**
     * 이미지 생성 프롬프트 API
     * Gemini를 사용하여 텍스트 프롬프트로 이미지를 생성하고 S3에 업로드합니다.
     *
     * @param request 이미지 생성을 위한 텍스트 프롬프트
     * @return S3에 업로드된 이미지의 CloudFront URL과 S3 Key
     */
    @PostMapping("/image")
    @Operation(
            summary = "이미지 생성 프롬프트 API",
            description = "Gemini를 사용하여 텍스트 프롬프트로 이미지를 생성하고 S3에 업로드합니다."
    )
    public ResponseEntity<ApiResponse<ImagePromptRes>> processImagePrompt(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody ImagePromptReq request
    ) {
        ImagePromptRes response = promptService.processImagePrompt(userDetails, request);
        return ApiResponse.create(response);
    }

}