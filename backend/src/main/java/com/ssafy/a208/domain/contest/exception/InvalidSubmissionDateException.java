package com.ssafy.a208.domain.contest.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class InvalidSubmissionDateException extends ApiException {

    private static final String MESSAGE = "제출 기간이 아닙니다.";

    public InvalidSubmissionDateException() {
        super(HttpStatus.BAD_REQUEST, MESSAGE);
    }
}
