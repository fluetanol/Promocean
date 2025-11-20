package com.ssafy.a208.domain.contest.dto;

import java.util.List;
import org.springframework.data.domain.Page;

public record SubmissionListRes(
        List<SubmissionListItem> submissions,
        int itemCnt,
        long totalCnt,
        int totalPages,
        int currentPage
) {
    public static SubmissionListRes from(Page<SubmissionListItem> page) {
        return new SubmissionListRes(
                page.getContent(),
                page.getNumberOfElements(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.getNumber() + 1
        );
    }
}
