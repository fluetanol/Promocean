package com.ssafy.a208.domain.contest.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class ViewPeriodRequiredException extends ApiException {

    private static final String MESSAGE = "조회 기간이 아닙니다.";

    public ViewPeriodRequiredException() {
        super(HttpStatus.BAD_REQUEST, MESSAGE);
    }
}
