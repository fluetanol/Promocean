package com.ssafy.a208.domain.space.exception.participant;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class OwnerConstraintViolationException extends ApiException {

    private static final String MESSAGE = "관리자는 최소 한 명 있어야 합니다.";

    public OwnerConstraintViolationException() {
        super(HttpStatus.BAD_REQUEST, MESSAGE);
    }
}
