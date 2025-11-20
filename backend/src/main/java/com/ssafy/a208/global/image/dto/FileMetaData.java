package com.ssafy.a208.global.image.dto;

import lombok.Builder;

@Builder
public record FileMetaData(
        String filePath,
        String originalName,
        String contentType,
        Long size
) {

}
