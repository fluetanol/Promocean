package com.ssafy.a208.global.image.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class S3OperationException extends ApiException {

    private static final String MESSAGE = "S3 처리 중 오류가 발생했습니다.";

    public S3OperationException(HttpStatus status) {
        super(status, MESSAGE);
    }

    public S3OperationException() {
        super(HttpStatus.INTERNAL_SERVER_ERROR, MESSAGE);
    }
}
