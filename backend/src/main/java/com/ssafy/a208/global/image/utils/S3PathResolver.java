package com.ssafy.a208.global.image.utils;

import com.ssafy.a208.global.common.enums.ImageDirectory;
import com.ssafy.a208.global.image.service.S3Service;
import com.ssafy.a208.global.security.exception.InvalidFilePathException;
import com.ssafy.a208.global.image.exception.S3OperationException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.util.Objects;

/**
 * S3 파일 경로 처리 유틸리티
 * tmp 경로의 파일을 지정된 디렉토리로 이동하거나 기본 이미지를 반환합니다.
 */
@Component
@RequiredArgsConstructor
public class S3PathResolver {

    private final S3Service s3Service;

    /**
     * S3 파일 경로를 검증하고 지정된 디렉토리로 이동합니다.
     *
     * @param filePath 이동할 파일 경로 (null 또는 빈 문자열인 경우 기본 이미지 경로 반환)
     * @param targetDirectory 대상 디렉토리
     * @param defaultKey 기본 이미지 키
     * @return 이동된 파일의 S3 키 또는 기본 이미지 키
     * @throws InvalidFilePathException 파일 경로가 tmp로 시작하지 않을 때
     * @throws S3OperationException S3 작업 중 오류 발생 시
     */
    public String resolveAndMove(String filePath, ImageDirectory targetDirectory, String defaultKey) {
        if (Objects.isNull(filePath) || filePath.isBlank()) {
            return defaultKey;
        }

        if (!filePath.startsWith("tmp/")) {
            throw new InvalidFilePathException();
        }

        try {
            return s3Service.moveObject(filePath, targetDirectory);
        } catch (S3Exception e) {
            throw new S3OperationException(HttpStatus.valueOf(e.statusCode()));
        }
    }
}