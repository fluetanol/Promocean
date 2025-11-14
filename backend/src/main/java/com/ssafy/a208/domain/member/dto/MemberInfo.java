package com.ssafy.a208.domain.member.dto;

import lombok.Builder;

@Builder
public record MemberInfo(
        String nickname,
        String email,
        String profileUrl,
        Long personalSpaceId,
        boolean isRead
) {

}