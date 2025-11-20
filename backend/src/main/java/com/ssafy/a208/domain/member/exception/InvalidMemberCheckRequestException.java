package com.ssafy.a208.domain.member.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class InvalidMemberCheckRequestException extends ApiException {

    private static final String MESSAGE = "유효하지 않은 회원 중복 확인 요청입니다.";

    public InvalidMemberCheckRequestException() {
        super(HttpStatus.BAD_REQUEST, MESSAGE);
    }
}
