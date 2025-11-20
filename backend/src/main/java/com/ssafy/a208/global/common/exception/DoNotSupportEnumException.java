package com.ssafy.a208.global.common.exception;

import org.springframework.http.HttpStatus;

public class DoNotSupportEnumException extends ApiException {

    private static final String MESSAGE = "지원하지 않는 ENUM입니다.";

    public DoNotSupportEnumException() {
        super(HttpStatus.BAD_REQUEST, MESSAGE);
    }

    public DoNotSupportEnumException(String message) {
        super(HttpStatus.BAD_REQUEST, message);
    }
}
