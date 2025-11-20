package com.ssafy.a208.domain.space.dto.response;

import java.time.LocalDate;
import java.util.Set;
import lombok.Builder;

@Builder
public record ArticleInfo(
        Long articleId,
        String title,
        String fileUrl,
        String type,
        LocalDate updatedAt,
        Set<String> tags
) {

}
