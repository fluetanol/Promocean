package com.ssafy.a208.domain.scrap.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

/**
 * 이미 스크랩한 게시글에 다시 스크랩을 시도할 때 발생하는 예외
 */
public class ScrapAlreadyExistsException extends ApiException {

    private static final String MESSAGE = "이미 스크랩한 게시글입니다.";

    public ScrapAlreadyExistsException() {
        super(HttpStatus.BAD_REQUEST, MESSAGE);
    }
}