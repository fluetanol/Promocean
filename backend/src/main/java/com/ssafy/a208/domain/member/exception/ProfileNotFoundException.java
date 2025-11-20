package com.ssafy.a208.domain.member.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class ProfileNotFoundException extends ApiException {

    private static final String MESSAGE = "프로필 정보를 찾을 수 없습니다.";

    public ProfileNotFoundException() {
        super(HttpStatus.NOT_FOUND, MESSAGE);
    }
}
