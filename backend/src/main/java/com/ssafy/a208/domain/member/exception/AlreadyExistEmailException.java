package com.ssafy.a208.domain.member.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class AlreadyExistEmailException extends ApiException {

    private static final String MESSAGE = "이미 존재하는 이메일입니다.";

    public AlreadyExistEmailException() {
        super(HttpStatus.BAD_REQUEST, MESSAGE);
    }
}
