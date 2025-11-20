package com.ssafy.a208.domain.contest.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class RequiredFileMissingException extends ApiException {

    private static final String MESSAGE = "이미지가 누락되었습니다.";

    public RequiredFileMissingException() {
        super(HttpStatus.BAD_REQUEST, MESSAGE);
    }
}
