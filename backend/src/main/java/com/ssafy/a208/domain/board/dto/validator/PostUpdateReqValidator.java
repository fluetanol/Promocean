package com.ssafy.a208.domain.board.dto.validator;

import com.ssafy.a208.domain.board.dto.PostUpdateReq;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.Objects;

/**
 * 게시글 수정 요청 유효성 검증기
 * 텍스트 프롬프트는 filePath 불가, 이미지 프롬프트는 예시 질문/답변 불가
 */
public class PostUpdateReqValidator implements ConstraintValidator<ValidPostUpdateRequest, PostUpdateReq> {

    @Override
    public boolean isValid(PostUpdateReq req, ConstraintValidatorContext context) {
        if (req == null || req.promptType() == null) {
            return true;
        }

        context.disableDefaultConstraintViolation();
        boolean isValid = true;

        // 텍스트 프롬프트(1)인 경우 filePath 불가
        if (req.promptType() == 1) {
            if (Objects.nonNull(req.filePath()) && !req.filePath().isBlank()) {
                context.buildConstraintViolationWithTemplate("텍스트 프롬프트는 파일을 첨부할 수 없습니다")
                        .addPropertyNode("filePath")
                        .addConstraintViolation();
                isValid = false;
            }
        }

        // 이미지 프롬프트(2)인 경우 sampleQuestion, sampleAnswer 불가
        if (req.promptType() == 2) {
            if (Objects.nonNull(req.sampleQuestion()) && !req.sampleQuestion().isBlank()) {
                context.buildConstraintViolationWithTemplate("이미지 프롬프트는 예시 질문을 작성할 수 없습니다")
                        .addPropertyNode("sampleQuestion")
                        .addConstraintViolation();
                isValid = false;
            }

            if (Objects.nonNull(req.sampleAnswer()) && !req.sampleAnswer().isBlank()) {
                context.buildConstraintViolationWithTemplate("이미지 프롬프트는 예시 답변을 작성할 수 없습니다")
                        .addPropertyNode("sampleAnswer")
                        .addConstraintViolation();
                isValid = false;
            }
        }

        return isValid;
    }
}