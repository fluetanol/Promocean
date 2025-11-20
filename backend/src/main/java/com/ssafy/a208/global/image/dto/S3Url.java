package com.ssafy.a208.global.image.dto;

import lombok.Builder;

@Builder
public record S3Url(
        String presignedUrl,
        String key
) {

}
