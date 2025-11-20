package com.ssafy.a208.domain.board.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

/**
 * 게시글을 찾을 수 없을 때 발생하는 예외
 */
public class PostNotFoundException extends ApiException {

    private static final String MESSAGE = "게시글 정보를 찾을 수 없습니다.";

    public PostNotFoundException() {
        super(HttpStatus.NOT_FOUND, MESSAGE);
    }
}