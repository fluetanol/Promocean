package com.ssafy.a208.domain.member.dto.request;

import com.ssafy.a208.global.common.validation.Password;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;

public record UpdateMemberReq(
        @Password
        @Schema(description = "비밀번호", example = "qwer1234")
        String password,

        @Size(max = 10, message = "닉네임은 10자를 넘을 수 없습니다")
        @Schema(description = "닉네임", example = "상냥한 감자")
        String nickname,

        @Schema(description = "프로필사진 경로", example = "profiles/default-profile.png")
        String filePath
) {

}
