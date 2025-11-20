package com.ssafy.a208.domain.member.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class MemberNotFoundException extends ApiException {

    private static final String MESSAGE = "회원 정보를 찾을 수 없습니다";

    public MemberNotFoundException() {
        super(HttpStatus.NOT_FOUND, MESSAGE);
    }

}
