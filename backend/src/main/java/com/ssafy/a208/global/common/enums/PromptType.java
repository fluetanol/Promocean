package com.ssafy.a208.global.common.enums;

import com.ssafy.a208.global.common.exception.DoNotSupportEnumException;
import lombok.Getter;

@Getter
public enum PromptType {
    TEXT(1, "텍스트"), IMAGE(2, "이미지");

    private final int value;
    private final String name;

    PromptType(int value, String name) {
        this.value = value;
        this.name = name;
    }

    public static PromptType valueOf(int value) {
        for (PromptType type : values()) {
            if (type.value == value) {
                return type;
            }
        }

        throw new DoNotSupportEnumException("프롬프트 타입 값이 유효하지 않습니다");
    }
}
