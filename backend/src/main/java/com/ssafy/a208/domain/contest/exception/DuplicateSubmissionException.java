package com.ssafy.a208.domain.contest.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class DuplicateSubmissionException extends ApiException {

    private static final String MESSAGE = "이미 제출 이력이 있습니다.";

    public DuplicateSubmissionException() {
        super(HttpStatus.BAD_REQUEST, MESSAGE);
    }
}
