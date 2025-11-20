package com.ssafy.a208.domain.contest.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class InvalidAuthorException extends ApiException {

    private static final String MESSAGE = "작성자와 일치하지 않습니다.";

    public InvalidAuthorException() { super(HttpStatus.FORBIDDEN, MESSAGE); }
}
