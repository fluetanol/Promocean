package com.ssafy.a208.domain.space.dto.response;

import java.util.List;
import lombok.Builder;

@Builder
public record ArticleListRes(
        List<ArticleInfo> articles,
        int currentPage,
        int currentCnt,
        int totalPage,
        long totalCnt
) {

}
