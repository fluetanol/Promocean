package com.ssafy.a208.domain.contest.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class InvalidStartException extends ApiException {

    private static final String MESSAGE = "대회 시작일은 현재일 이후여야 합니다.";

    public InvalidStartException() {
        super(HttpStatus.BAD_REQUEST, MESSAGE);
    }
}
