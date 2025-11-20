package com.ssafy.a208.global.image.utils;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.HeadObjectRequest;
import software.amazon.awssdk.services.s3.model.HeadObjectResponse;

@Component
@RequiredArgsConstructor
public class S3Uploader {

    private final S3Client s3Client;

    @Value("${spring.cloud.aws.s3.bucket}")
    private String bucket;

    public String copyObject(String filePath, String destKey) {
        String normalized = filePath.replace("\\", "/");  // 구분자 통일
        String filename = normalized.substring(normalized.lastIndexOf("/") + 1);
        String destPath = destKey + "/" + filename;

        s3Client.copyObject(builder -> builder
                .sourceBucket(bucket)
                .sourceKey(filePath)
                .destinationBucket(bucket)
                .destinationKey(destPath)
        );

        return destPath;
    }

    public void deleteObject(String filePath) {
        s3Client.deleteObject(builder -> builder
                .bucket(bucket)
                .key(filePath)
        );
    }

    public HeadObjectResponse getMetaData(String key) {
        HeadObjectRequest request = HeadObjectRequest.builder()
                .bucket(bucket)
                .key(key)
                .build();

        return s3Client.headObject(request);
    }
}
