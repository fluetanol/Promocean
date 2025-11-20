package com.ssafy.a208.global.image.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class InvalidFilenameException extends ApiException {

    private static final String MESSAGE = "올바르지 않은 파일명입니다.";

    public InvalidFilenameException() {
        super(HttpStatus.BAD_REQUEST, MESSAGE);
    }
}
