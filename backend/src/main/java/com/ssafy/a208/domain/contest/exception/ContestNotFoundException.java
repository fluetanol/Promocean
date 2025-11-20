package com.ssafy.a208.domain.contest.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class ContestNotFoundException extends ApiException {

    private static final String MESSAGE = "대회 정보를 찾을 수 없습니다.";

    public ContestNotFoundException() {
        super(HttpStatus.NOT_FOUND, MESSAGE);
    }
}
