package com.ssafy.a208.domain.contest.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class DuplicateVoteException extends ApiException {

    private static final String MESSAGE = "이미 투표한 프롬프트입니다.";

    public DuplicateVoteException() {
        super(HttpStatus.BAD_REQUEST, MESSAGE);
    }
}
