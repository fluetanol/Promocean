package com.ssafy.a208.domain.space.exception.participant;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class InvalidParticipantDeleteRequestException extends ApiException {

    private final static String MESSAGE = "잘못된 삭제 요청입니다.";

    public InvalidParticipantDeleteRequestException() {
        super(HttpStatus.BAD_REQUEST, MESSAGE);
    }
}
