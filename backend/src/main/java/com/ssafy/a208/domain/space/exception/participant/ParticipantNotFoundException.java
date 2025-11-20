package com.ssafy.a208.domain.space.exception.participant;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class ParticipantNotFoundException extends ApiException {

    private static final String MESSAGE = "스페이스에 없는 회원입니다.";

    public ParticipantNotFoundException() {
        super(HttpStatus.NOT_FOUND, MESSAGE);
    }
}
