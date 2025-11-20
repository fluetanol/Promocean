package com.ssafy.a208.domain.prompt.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.member.exception.UsableCountExceededException;
import com.ssafy.a208.domain.prompt.dto.*;
import com.ssafy.a208.domain.prompt.exception.ImageGenerationException;
import com.ssafy.a208.domain.prompt.exception.PromptProcessingException;
import com.ssafy.a208.global.image.service.S3Service;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import com.ssafy.a208.domain.member.reader.MemberReader;

import java.util.*;

/**
 * AI 프롬프트 처리 서비스
 * GMS API(GPT-5, Gemini)를 활용하여 텍스트 생성 및 이미지 생성 기능을 제공
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class PromptService {

    private final WebClient webClient;
    private final S3Service s3Service;
    private final S3Client s3Client;
    private final MemberReader memberReader;


    @Value("${gms.api.key}")
    private String gmsApiKey;

    @Value("${gms.api.gpt.url}")
    private String gptUrl;

    @Value("${gms.api.gpt.model}")
    private String gptModel;

    @Value("${gms.api.gemini.url}")
    private String geminiUrl;

    @Value("${spring.cloud.aws.s3.bucket}")
    private String bucket;

    /**
     * GPT-5를 사용한 텍스트 프롬프트 처리
     * 주어진 프롬프트와 예상 질문을 기반으로 AI 답변을 생성합니다.
     *
     * @param request 프롬프트와 예상 질문이 포함된 요청 DTO
     * @return 생성된 답변
     * @throws PromptProcessingException API 호출 실패 또는 응답 처리 중 오류 발생 시
     */
    @Transactional
    public TextPromptRes processTextPrompt(CustomUserDetails userDetails, TextPromptReq request) {
        Member member = memberReader.getMemberById(userDetails.memberId());

        if (member.getUsableCnt() <= 0) {
            throw new UsableCountExceededException();
        }

        List<GptDto.Message> messages = new ArrayList<>();

        // System 메시지 한국어 답변 요청하기 위해
        messages.add(GptDto.Message.builder()
                .role("developer")
                .content("Answer in Korean")
                .build());

        // 사용자 프롬프트 + 예상 질문
        String userContent = request.prompt() + "\n\n질문: " + request.exampleQuestion();
        messages.add(GptDto.Message.builder()
                .role("user")
                .content(userContent)
                .build());

        // GPT 요청 생성
        GptDto.Request gptRequest = GptDto.Request.builder()
                .model(gptModel)
                .messages(messages)
                .build();

        try {
            // API 호출
            GptDto.Response response = webClient.post()
                    .uri(gptUrl)
                    .header("Authorization", "Bearer " + gmsApiKey)
                    .header("Content-Type", "application/json")
                    .bodyValue(gptRequest)
                    .retrieve()
                    .bodyToMono(GptDto.Response.class)
                    .block();

            if (response == null || response.choices() == null || response.choices().isEmpty()) {
                throw new PromptProcessingException("GPT API 응답이 비어있습니다.");
            }

            member.decreaseUsableCnt();

            String answer = response.choices().get(0).message().content();
            GptDto.Usage usage = response.usage();
            log.info("GPT API 호출 완료 - 토큰 사용량: {}", usage.totalTokens());

            return TextPromptRes.builder()
                    .exampleAnswer(answer)
                    .build();

        } catch (WebClientResponseException e) {
            log.error("=== GMS API 에러 응답 ===");
            log.error("Status Code: {}", e.getStatusCode());
            log.error("Response Body: {}", e.getResponseBodyAsString());
            throw new PromptProcessingException("GMS API 호출 실패: " + e.getResponseBodyAsString());
        } catch (Exception e) {
            log.error("GPT-5 API 호출 실패: {}", e.getMessage(), e);
            throw new PromptProcessingException("텍스트 프롬프트 처리 중 오류가 발생했습니다.");
        }
    }

    /**
     * Gemini를 사용한 이미지 생성 및 S3 업로드
     * 텍스트 프롬프트를 기반으로 이미지를 생성하고 S3에 업로드합니다.
     *
     * @param request 이미지 생성을 위한 텍스트 프롬프트
     * @return S3에 업로드된 이미지의 CloudFront URL과 S3 Key
     * @throws ImageGenerationException 이미지 생성 또는 업로드 중 오류 발생 시
     */
    @Transactional
    public ImagePromptRes processImagePrompt(CustomUserDetails userDetails, ImagePromptReq request) {
        Member member = memberReader.getMemberById(userDetails.memberId());

        if (member.getUsableCnt() <= 0) {
            throw new UsableCountExceededException();
        }

        GeminiDto.Request geminiRequest = GeminiDto.Request.builder()
                .contents(List.of(
                        GeminiDto.Content.builder()
                                .parts(List.of(
                                        GeminiDto.Part.builder()
                                                .text(request.prompt())
                                                .build()
                                ))
                                .build()
                ))
                .generationConfig(GeminiDto.GenerationConfig.builder()
                        .responseModalities(List.of("Text", "Image"))
                        .build())
                .build();

        try {
            JsonNode response = webClient.post()
                    .uri(geminiUrl + "?key=" + gmsApiKey)
                    .header("Content-Type", "application/json")
                    .bodyValue(geminiRequest)
                    .retrieve()
                    .bodyToMono(JsonNode.class)
                    .block();

            if (response == null) {
                throw new ImageGenerationException("Gemini API 응답이 비어있습니다.");
            }

            // 이미지 데이터 추출
            JsonNode candidates = response.get("candidates");
            if (candidates == null || candidates.isEmpty()) {
                throw new ImageGenerationException("응답에 candidates가 없습니다.");
            }

            JsonNode parts = candidates.get(0).get("content").get("parts");
            if (parts == null || parts.isEmpty()) {
                throw new ImageGenerationException("응답에 parts가 없습니다.");
            }

            // 이미지 찾기
            String base64Image = null;
            String mimeType = null;

            for (JsonNode part : parts) {
                JsonNode inlineData = part.get("inlineData");
                if (inlineData != null) {
                    base64Image = inlineData.get("data").asText();
                    mimeType = inlineData.get("mimeType").asText();
                    break;
                }
            }

            if (base64Image == null) {
                throw new ImageGenerationException("응답에 이미지가 없습니다.");
            }

            Map<String, String> result = uploadToS3(base64Image, mimeType);
            log.info("이미지 생성 완료 - URL: {}", result.get("imageUrl"));

            member.decreaseUsableCnt();
            return ImagePromptRes.builder()
                    .cloudfrontUrl(result.get("imageUrl"))
                    .key(result.get("s3Key"))
                    .build();

        } catch (WebClientResponseException e) {
            log.error("=== Gemini API 에러 ===");
            log.error("Status Code: {}", e.getStatusCode());
            log.error("Response Body: {}", e.getResponseBodyAsString());
            throw new ImageGenerationException("Gemini API 호출 실패");
        } catch (Exception e) {
            log.error("이미지 생성 실패: {}", e.getMessage(), e);
            throw new ImageGenerationException("이미지 프롬프트 처리 실패");
        }
    }

    /**
     * Base64 인코딩된 이미지를 S3에 업로드
     * 이미지를 디코딩하여 S3의 tmp 디렉토리에 업로드하고 CloudFront URL을 생성합니다.
     *
     * @param base64Image Base64로 인코딩된 이미지 데이터
     * @param mimeType 이미지의 MIME 타입 (예: image/png)
     * @return CloudFront URL과 S3 Key를 포함한 Map
     * @throws ImageGenerationException Base64 디코딩 실패 또는 S3 업로드 실패 시
     */
    private Map<String, String> uploadToS3(String base64Image, String mimeType) {
        try {

            // Base64 디코딩
            byte[] imageBytes = Base64.getDecoder().decode(base64Image);

            // 파일 확장자 결정
            String extension = mimeType.split("/")[1];
            String fileName = UUID.randomUUID().toString() + "." + extension;

            // S3 Key 생성 (tmp 디렉토리에)
            String s3Key = "tmp/" + fileName;

            // S3에 업로드
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucket)
                    .key(s3Key)
                    .contentType(mimeType)
                    .build();

            s3Client.putObject(putObjectRequest, RequestBody.fromBytes(imageBytes));

            // CloudFront URL 생성
            String imageUrl = s3Service.getCloudFrontUrl(s3Key);

            return Map.of("imageUrl", imageUrl, "s3Key", s3Key);

        } catch (IllegalArgumentException e) {
            log.error("Base64 디코딩 실패: {}", e.getMessage());
            throw new ImageGenerationException("이미지 디코딩에 실패했습니다.");
        } catch (Exception e) {
            log.error("S3 업로드 실패: {}", e.getMessage(), e);
            throw new ImageGenerationException("이미지 업로드에 실패했습니다.");
        }
    }
}