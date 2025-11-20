package com.ssafy.a208.domain.scrap.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

/**
 * 스크랩을 찾을 수 없을 때 발생하는 예외
 */
public class ScrapNotFoundException extends ApiException {

    private static final String MESSAGE = "존재하지 않는 스크랩입니다.";

    public ScrapNotFoundException() {
        super(HttpStatus.NOT_FOUND, MESSAGE);
    }
}