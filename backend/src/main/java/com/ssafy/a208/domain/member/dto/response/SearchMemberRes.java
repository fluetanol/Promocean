package com.ssafy.a208.domain.member.dto.response;

import lombok.Builder;

@Builder
public record SearchMemberRes(
        String nickname,
        String email,
        String profileUrl) {

}
