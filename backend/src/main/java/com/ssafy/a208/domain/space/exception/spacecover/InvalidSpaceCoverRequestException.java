package com.ssafy.a208.domain.space.exception.spacecover;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class InvalidSpaceCoverRequestException extends ApiException {

    private static final String MESSAGE = "유효하지 않은 스페이스 커버 요청입니다.";

    public InvalidSpaceCoverRequestException() {
        super(HttpStatus.BAD_REQUEST, MESSAGE);
    }
}
