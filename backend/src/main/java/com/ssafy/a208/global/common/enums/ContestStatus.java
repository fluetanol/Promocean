package com.ssafy.a208.global.common.enums;

import lombok.Getter;

@Getter
public enum ContestStatus {
    SCHEDULED("개최전"),
    ONGOING("진행중"),
    VOTING("투표중"),
    FINISHED("종료");

    private final String name;

    ContestStatus(String name) {
        this.name = name;
    }

    public static ContestStatus fromName(String name) {
        if(name == null || name.isBlank()) {
            return null;
        }

        for(ContestStatus contestStatus : ContestStatus.values()) {
            if(name.equals(contestStatus.getName())) {
                return contestStatus;
            }
        }

        return null;
    }
}
