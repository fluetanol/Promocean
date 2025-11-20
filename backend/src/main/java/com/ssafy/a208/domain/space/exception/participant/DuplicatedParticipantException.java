package com.ssafy.a208.domain.space.exception.participant;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class DuplicatedParticipantException extends ApiException {

    private static final String MESSAGE = "스페이스에 이미 추가된 참가자입니다.";

    public DuplicatedParticipantException() {
        super(HttpStatus.BAD_REQUEST, MESSAGE);
    }
}
