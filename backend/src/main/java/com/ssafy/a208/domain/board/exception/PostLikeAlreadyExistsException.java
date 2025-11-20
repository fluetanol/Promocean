package com.ssafy.a208.domain.board.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

/**
 * 이미 좋아요를 누른 게시글에 다시 좋아요를 시도할 때 발생하는 예외
 */
public class PostLikeAlreadyExistsException extends ApiException {

    private static final String MESSAGE = "이미 좋아요를 누른 게시글입니다.";

    public PostLikeAlreadyExistsException() {
        super(HttpStatus.BAD_REQUEST, MESSAGE);
    }
}