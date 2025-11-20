package com.ssafy.a208.domain.space.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class AlreadyExistFolderException extends ApiException {

    private static final String MESSAGE = "이미 존재하는 폴더입니다.";

    public AlreadyExistFolderException() {
        super(HttpStatus.BAD_REQUEST, MESSAGE);
    }
}
