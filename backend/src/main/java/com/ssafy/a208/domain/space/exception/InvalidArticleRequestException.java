package com.ssafy.a208.domain.space.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class InvalidArticleRequestException extends ApiException {

    private static final String MESSAGE = "유효하지 않은 아티클 요청입니다.";

    public InvalidArticleRequestException() {
        super(HttpStatus.BAD_REQUEST, MESSAGE);
    }
}
