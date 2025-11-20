package com.ssafy.a208.domain.board.dto.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.*;

/**
 * 게시글 작성 요청의 유효성을 검증하는 커스텀 어노테이션
 * 프롬프트 타입에 따라 필수 필드를 다르게 검증합니다.
 */
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PostCreateReqValidator.class)
@Documented
public @interface ValidPostRequest {
    String message() default "유효하지 않은 게시글 요청입니다";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}