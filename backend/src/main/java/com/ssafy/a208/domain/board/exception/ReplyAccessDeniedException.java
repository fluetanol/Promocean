package com.ssafy.a208.domain.board.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

/**
 * 댓글에 대한 권한이 없을 때 발생하는 예외
 */
public class ReplyAccessDeniedException extends ApiException {

    private static final String MESSAGE = "댓글 접근 권한이 없습니다.";

    public ReplyAccessDeniedException() {
        super(HttpStatus.FORBIDDEN, MESSAGE);
    }
}