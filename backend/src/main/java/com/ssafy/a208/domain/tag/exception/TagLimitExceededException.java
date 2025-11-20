package com.ssafy.a208.domain.tag.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

/**
 * 게시글당 태그 개수 제한을 초과했을 때 발생하는 예외
 */
public class TagLimitExceededException extends ApiException {

    private static final String MESSAGE = "게시글당 태그는 최대 5개까지만 등록할 수 있습니다";

    public TagLimitExceededException() {
        super(HttpStatus.BAD_REQUEST, MESSAGE);
    }
}