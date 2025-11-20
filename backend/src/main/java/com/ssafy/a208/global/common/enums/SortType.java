package com.ssafy.a208.global.common.enums;

import lombok.Getter;
import org.springframework.data.domain.Sort;

@Getter
public enum SortType {
    latest(Sort.by(Sort.Direction.DESC, "createdAt")),
    oldest(Sort.by(Sort.Direction.ASC, "createdAt"));

    private final Sort sort;

    SortType(Sort sort) {
        this.sort = sort;
    }
}
