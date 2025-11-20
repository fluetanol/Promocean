package com.ssafy.a208.domain.auth.dto;

import com.ssafy.a208.global.common.validation.Password;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record LoginReq(
        @Email @Size(max = 100, message = "이메일은 100자를 넘을 수 없습니다.")
        @Schema(description = "이메일", example = "dlwnsfml@naver.com")
        String email,

        @Password
        @Schema(description = "비밀번호", example = "qwer1234")
        String password
) {

}