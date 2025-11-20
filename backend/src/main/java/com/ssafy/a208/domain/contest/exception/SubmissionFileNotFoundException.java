package com.ssafy.a208.domain.contest.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class SubmissionFileNotFoundException extends ApiException {

    private static final String MESSAGE = "제출한 파일을 찾을 수 없습니다.";

    public SubmissionFileNotFoundException() {
        super(HttpStatus.NOT_FOUND, MESSAGE);
    }
}
