package com.ssafy.a208.domain.contest.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class InvalidEndException extends ApiException {

    private static final String MESSAGE = "대회 종료일은 시작일 이후여야 합니다.";

    public InvalidEndException() { super(HttpStatus.BAD_REQUEST, MESSAGE); }
}
