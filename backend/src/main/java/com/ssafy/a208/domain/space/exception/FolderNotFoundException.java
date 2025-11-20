package com.ssafy.a208.domain.space.exception;

import com.ssafy.a208.global.common.exception.ApiException;
import org.springframework.http.HttpStatus;

public class FolderNotFoundException extends ApiException {

    private static final String MESSAGE = "폴더 정보를 찾을 수 없습니다.";

    public FolderNotFoundException() {
        super(HttpStatus.NOT_FOUND, MESSAGE);
    }
}
