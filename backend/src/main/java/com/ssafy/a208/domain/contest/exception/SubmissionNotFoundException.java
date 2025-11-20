package com.ssafy.a208.domain.contest.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class SubmissionNotFoundException extends ApiException {

    private static final String MESSAGE = "제출 내역을 찾을 수 없습니다.";

    public SubmissionNotFoundException() {
        super(HttpStatus.NOT_FOUND, MESSAGE);
    }
}
