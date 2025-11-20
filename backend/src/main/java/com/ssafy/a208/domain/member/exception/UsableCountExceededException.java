package com.ssafy.a208.domain.member.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

/**
 * usableCnt(남은 사용 가능 횟수)가 0 이하일 때 발생하는 예외
 */
public class UsableCountExceededException extends ApiException {

    private static final String MESSAGE = "오늘 사용 가능한 횟수를 모두 소진했습니다.";

    public UsableCountExceededException() {
        super(HttpStatus.FORBIDDEN, MESSAGE);
    }
}