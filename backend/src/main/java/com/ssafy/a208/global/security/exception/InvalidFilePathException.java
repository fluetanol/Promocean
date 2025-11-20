package com.ssafy.a208.global.security.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class InvalidFilePathException extends ApiException {

    private static final String MESSAGE = "유효하지 않은 파일 경로입니다.";

    public InvalidFilePathException() {
        super(HttpStatus.BAD_REQUEST, MESSAGE);
    }
}
