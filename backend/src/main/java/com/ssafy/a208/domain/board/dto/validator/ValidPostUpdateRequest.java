package com.ssafy.a208.domain.board.dto.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.*;

/**
 * 게시글 수정 요청의 유효성을 검증하는 커스텀 어노테이션
 */
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PostUpdateReqValidator.class)
@Documented
public @interface ValidPostUpdateRequest {
    String message() default "유효하지 않은 게시글 수정 요청입니다";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}