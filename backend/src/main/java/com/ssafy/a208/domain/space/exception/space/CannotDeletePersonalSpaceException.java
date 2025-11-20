package com.ssafy.a208.domain.space.exception.space;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class CannotDeletePersonalSpaceException extends ApiException {
    private static final String MESSAGE = "개인 스페이스는 삭제할 수 없습니다.";
    public CannotDeletePersonalSpaceException() {
        super(HttpStatus.BAD_REQUEST, MESSAGE);
    }
}
