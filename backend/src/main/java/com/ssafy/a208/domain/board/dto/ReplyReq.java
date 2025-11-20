package com.ssafy.a208.domain.board.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * 댓글 작성/수정 요청 DTO
 */
@Schema(description = "댓글 작성/수정 요청")
public record ReplyReq(

        @NotBlank(message = "댓글 내용은 필수입니다.")
        @Size(max = 1000, message = "댓글은 1000자까지 작성할 수 있습니다.")
        @Schema(description = "댓글 내용", example = "정말 유용한 프롬프트네요!", required = true)
        String content
) {}