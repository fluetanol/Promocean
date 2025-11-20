package com.ssafy.a208.domain.prompt.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

/**
 * 이미지 생성 중 발생하는 예외
 * Gemini API 호출 실패, 이미지 디코딩 실패, S3 업로드 실패 등의 상황에서 발생
 */

public class ImageGenerationException extends ApiException {
    public ImageGenerationException(String message) {
        super(HttpStatus.INTERNAL_SERVER_ERROR, message);
    }
}