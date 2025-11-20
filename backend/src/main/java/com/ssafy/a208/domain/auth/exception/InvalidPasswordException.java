package com.ssafy.a208.domain.auth.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class InvalidPasswordException extends ApiException {

    private static final String MESSAGE = "비밀번호가 올바르지 않습니다.";

    public InvalidPasswordException() {
        super(HttpStatus.BAD_REQUEST, MESSAGE);
    }
}
