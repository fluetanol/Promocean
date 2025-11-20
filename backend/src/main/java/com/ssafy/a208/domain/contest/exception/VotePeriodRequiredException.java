package com.ssafy.a208.domain.contest.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class VotePeriodRequiredException extends ApiException {

    private static final String MESSAGE = "투표 기간이 아닙니다.";

    public VotePeriodRequiredException() {
        super(HttpStatus.BAD_REQUEST, MESSAGE);
    }
}
