package com.ssafy.a208.global.common.enums;

import com.ssafy.a208.global.common.exception.DoNotSupportEnumException;
import lombok.Getter;

@Getter
public enum ParticipantRole {
    OWNER(30), READER(10), EDITOR(20);

    private final int value;

    ParticipantRole(int value) {
        this.value = value;
    }

    public static ParticipantRole valueOf(int value) {
        for (ParticipantRole type : values()) {
            if (type.value == value) {
                return type;
            }
        }

        throw new DoNotSupportEnumException();
    }

    public boolean canManage() {
        return this.value >= 30;
    }

    public boolean canEdit() {
        return this.value >= 20;
    }

    public boolean canRead() {
        return this.value >= 10;
    }

}
