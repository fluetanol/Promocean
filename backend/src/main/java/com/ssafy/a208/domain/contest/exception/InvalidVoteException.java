package com.ssafy.a208.domain.contest.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class InvalidVoteException extends ApiException {

    private static final String MESSAGE = "투표 시작일은 대회 종료일 이후여야 합니다.";

    public InvalidVoteException() {
        super(HttpStatus.BAD_REQUEST, MESSAGE);
    }
}
