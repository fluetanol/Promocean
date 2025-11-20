package com.ssafy.a208.global.common.enums;

import com.ssafy.a208.global.common.exception.DoNotSupportEnumException;
import lombok.Getter;

@Getter
public enum PostCategory {
    BUSINESS(100, "업무"),
    DEVELOPMENT(200, "개발"),
    DESIGN(300, "디자인/창작"),
    CAREER(400, "취업"),
    EDUCATION(500, "교육"),
    DAILY(600, "일상"),
    OTHER(700, "기타");

    @Getter
    private final int value;
    private final String name;

    PostCategory(int value, String name) {
        this.value = value;
        this.name = name;
    }

    public static PostCategory valueOf(int value) {
        for (PostCategory category : values()) {
            if (category.value == value) {
                return category;
            }
        }

        throw new DoNotSupportEnumException("카테고리 값이 유효하지 않습니다");
    }
}
