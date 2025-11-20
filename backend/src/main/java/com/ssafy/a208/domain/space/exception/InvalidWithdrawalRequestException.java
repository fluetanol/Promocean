package com.ssafy.a208.domain.space.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class InvalidWithdrawalRequestException extends ApiException {

    private static final String MESSAGE = "참가자가 1명인 경우에는 탈퇴할 수 없습니다. 스페이스를 삭제해주세요.";

    public InvalidWithdrawalRequestException() {
        super(HttpStatus.BAD_REQUEST, MESSAGE);
    }
}
