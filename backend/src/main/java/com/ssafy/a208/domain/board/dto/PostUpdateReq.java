package com.ssafy.a208.domain.board.dto;

import com.ssafy.a208.domain.board.dto.validator.ValidPostUpdateRequest;
import com.ssafy.a208.global.common.validation.AllowedValues;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import java.util.List;

/**
 * 게시글 수정 요청 DTO
 */
@ValidPostUpdateRequest
@Schema(description = "게시글 수정 요청")
public record PostUpdateReq(

        @NotBlank(message = "제목은 필수입니다.")
        @Size(max = 100, message = "제목은 100자까지 작성할 수 있습니다.")
        @Schema(description = "게시글 제목", example = "고라파덕 말투 프롬프트", required = true)
        String title,

        @Size(max = 300, message = "설명은 300자까지 작성할 수 있습니다.")
        @Schema(description = "게시글 설명", example = "고라파덕처럼 귀엽게 말하는 프롬프트입니다")
        String description,

        @NotNull(message = "카테고리는 필수입니다.")
        @AllowedValues(value = {100, 200, 300, 400, 500, 600, 700},
                message = "유효하지 않은 카테고리입니다")
        @Schema(description = "카테고리 (100:업무, 200:개발, 300:디자인/창작, 400:취업, 500:교육, 600:일상, 700:기타)",
                example = "600", required = true)
        Integer category,

        @NotBlank(message = "프롬프트 내용은 필수입니다.")
        @Schema(description = "프롬프트 내용",
                example = "고라파덕 말투로 말해줘. 고라파덕 말투란 문장 끝에 파덕을 붙이는거야.",
                required = true)
        String prompt,

        @NotNull(message = "프롬프트 타입은 필수입니다.")
        @AllowedValues(value = {1, 2},
                message = "유효하지 않은 프롬프트 타입입니다")
        @Schema(description = "프롬프트 타입 (1:텍스트, 2:이미지)", example = "1", required = true)
        Integer promptType,

        @Schema(description = "예시 질문 (텍스트 프롬프트인 경우 필수)", example = "오늘 옷 추천해줘")
        String sampleQuestion,

        @Schema(description = "예시 답변 (텍스트 프롬프트인 경우 필수)",
                example = "오늘은 추워서 패딩 입는게 좋을 것 같아 파덕")
        String sampleAnswer,

        @Schema(description = "파일 경로 (이미지 프롬프트인 경우, 변경 시에만 전달)",
                example = "tmp/550e8400-e29b-41d4-a716-446655440000_sample.png")
        String filePath,

        @Schema(description = "태그 목록 (선택사항)", example = "[\"일상\", \"재미\", \"캐릭터\"]")
        List<@Size(max = 12, message = "태그는 12자 이하로 작성해야 합니다.") String> tags
) {}