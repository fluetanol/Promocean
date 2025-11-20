package com.ssafy.a208.domain.contest.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class InvalidPromptTypeException extends ApiException {

    private static final String MESSAGE = "유효하지 않은 대회 유형입니다.";

    public InvalidPromptTypeException() { super(HttpStatus.BAD_REQUEST, MESSAGE); }
}
