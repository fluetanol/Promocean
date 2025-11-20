package com.ssafy.a208.domain.space.exception.space;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class SpaceAccessDeniedException extends ApiException {

    private static final String MESSAGE = "스페이스 접근 권한이 없는 회원입니다.";

    public SpaceAccessDeniedException() {
        super(HttpStatus.FORBIDDEN, MESSAGE);
    }

    public SpaceAccessDeniedException(String message) {
        super(HttpStatus.FORBIDDEN, message);
    }
}