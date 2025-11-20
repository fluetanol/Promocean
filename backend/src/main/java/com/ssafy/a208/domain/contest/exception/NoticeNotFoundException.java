package com.ssafy.a208.domain.contest.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class NoticeNotFoundException extends ApiException {

    private static final String MESSAGE = "공지를 찾을 수 없습니다.";

    public NoticeNotFoundException() {
        super(HttpStatus.NOT_FOUND, MESSAGE);
    }
}
