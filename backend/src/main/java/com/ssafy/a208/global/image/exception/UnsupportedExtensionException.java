package com.ssafy.a208.global.image.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class UnsupportedExtensionException extends ApiException {

    private static final String MESSAGE = "지원하지 않는 확장자입니다.";

    public UnsupportedExtensionException() {
        super(HttpStatus.BAD_REQUEST, MESSAGE);
    }
}
