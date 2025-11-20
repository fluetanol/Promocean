package com.ssafy.a208.domain.space.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;

@Builder
public record ArticleDetailRes(
        Long articleId,
        String title,
        String description,
        String prompt,
        String type,
        String sampleQuestion,
        String sampleAnswer,
        String fileUrl,
        LocalDateTime updatedAt,
        List<String> tags
) {

}
