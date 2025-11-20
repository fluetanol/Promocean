package com.ssafy.a208.domain.member.event;

public record MemberUpdatedEvent(
        String oldNickname,
        String newNickname,
        String profileFilePath
) {
}
