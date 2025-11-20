package com.ssafy.a208.domain.board.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

/**
 * 게시글 작성 요청이 유효하지 않을 때 발생하는 예외
 */
public class InvalidPostRequestException extends ApiException {
    public InvalidPostRequestException(String message) {
        super(HttpStatus.BAD_REQUEST, message);
    }
}
