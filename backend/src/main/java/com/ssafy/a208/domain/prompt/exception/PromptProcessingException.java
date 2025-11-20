package com.ssafy.a208.domain.prompt.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;


/**
 * 프롬프트 처리 중 발생하는 예외
 * GPT API 호출 실패, 응답 파싱 실패 등의 상황에서 발생
 */
public class PromptProcessingException extends ApiException {
    public PromptProcessingException(String message) {
        super(HttpStatus.INTERNAL_SERVER_ERROR, message);
    }
}