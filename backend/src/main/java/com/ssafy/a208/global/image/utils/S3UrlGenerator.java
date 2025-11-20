package com.ssafy.a208.global.image.utils;

import java.time.Duration;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;

@Component
@RequiredArgsConstructor
public class S3UrlGenerator {

    private final S3Presigner s3Presigner;
    private final FileMetadataUtil fileMetadataUtil;

    private static final int PUT_EXPIRATION_MINUTES = 5;

    @Value("${spring.cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloudfront.domain}")
    private String cloudFrontDomain;


    public PresignedPutObjectRequest generatePresignedPostUrl(String key) {
        String contentType = fileMetadataUtil.getContentType(key);
        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket(bucket)
                .key(key)
                .contentType(contentType)
                .build();

        return s3Presigner.presignPutObject(b ->
                b.putObjectRequest(objectRequest)
                        .signatureDuration(Duration.ofMinutes(PUT_EXPIRATION_MINUTES)));
    }

    public String generateCloudFrontGetUrl(String filePath) {
        return String.format("https://%s/%s", cloudFrontDomain, filePath);
    }

}
