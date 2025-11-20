package com.ssafy.a208.domain.contest.dto;

import java.util.List;
import org.springframework.data.domain.Page;

public record ContestListRes(
        List<ContestListItem> contests,
        int itemCnt,
        long totalCnt,
        int totalPages,
        int currentPage
) {
    public static ContestListRes from(Page<ContestListItem> page) {
        return new ContestListRes(
                page.getContent(),
                page.getNumberOfElements(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.getNumber() + 1
        );
    }
}
