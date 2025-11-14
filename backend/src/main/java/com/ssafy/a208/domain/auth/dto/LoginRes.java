package com.ssafy.a208.domain.auth.dto;

import lombok.Builder;

@Builder
public record LoginRes(
        String accessToken,
        String nickname,
        String email,
        String profileUrl,
        Long personalSpaceId,
        boolean isRead
) {

}