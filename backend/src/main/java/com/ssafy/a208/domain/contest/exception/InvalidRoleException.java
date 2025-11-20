package com.ssafy.a208.domain.contest.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class InvalidRoleException extends ApiException {

    private static final String MESSAGE = "권한이 없는 회원입니다.";

    public InvalidRoleException() { super(HttpStatus.FORBIDDEN, MESSAGE); }
}
