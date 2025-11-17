package com.ssafy.a208.domain.space.dto.response;

import com.ssafy.a208.global.common.enums.PromptType;
import java.time.LocalDate;
import java.util.Set;

public record ArticleListItemQueryRes(
        Long articleId,
        String title,
        PromptType type,
        String filePath,
        Set<String> tags,
        LocalDate updatedAt
) {

}
