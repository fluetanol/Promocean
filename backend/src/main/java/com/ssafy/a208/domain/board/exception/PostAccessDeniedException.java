package com.ssafy.a208.domain.board.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

/**
 * 게시글 수정 권한이 없을 때 발생하는 예외
 */
public class PostAccessDeniedException extends ApiException {

    private static final String MESSAGE = "게시글 수정/삭제 권한이 없습니다";

    public PostAccessDeniedException() {
        super(HttpStatus.FORBIDDEN, MESSAGE);
    }
}