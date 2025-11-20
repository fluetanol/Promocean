package com.ssafy.a208.domain.board.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

/**
 * 댓글을 찾을 수 없을 때 발생하는 예외
 */
public class ReplyNotFoundException extends ApiException {

    private static final String MESSAGE = "댓글 정보를 찾을 수 없습니다.";

    public ReplyNotFoundException() {
        super(HttpStatus.NOT_FOUND, MESSAGE);
    }
}