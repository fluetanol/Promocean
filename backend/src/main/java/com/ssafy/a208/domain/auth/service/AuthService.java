package com.ssafy.a208.domain.auth.service;

import com.ssafy.a208.domain.alarm.dto.AlarmInfoRes;
import com.ssafy.a208.domain.auth.dto.LoginReq;
import com.ssafy.a208.domain.auth.dto.LoginRes;
import com.ssafy.a208.domain.auth.exception.InvalidPasswordException;
import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.member.entity.Profile;
import com.ssafy.a208.domain.member.reader.MemberReader;
import com.ssafy.a208.domain.member.reader.ProfileReader;
import com.ssafy.a208.global.image.service.S3Service;
import com.ssafy.a208.global.redis.repository.AlarmRedisRepository;
import com.ssafy.a208.global.security.util.JwtProvider;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final S3Service s3Service;
    private final JwtProvider provider;
    private final PasswordEncoder encoder;
    private final MemberReader memberReader;
    private final ProfileReader profileReader;
    private final AlarmRedisRepository alarmRedisRepository;

    public LoginRes login(LoginReq loginReq) {
        Member member = memberReader.getMemberByEmail(loginReq.email());

        if (!encoder.matches(loginReq.password(), member.getPassword())) {
            throw new InvalidPasswordException();
        }

        String aT = provider.generateToken(member);
        Profile profile = profileReader.getProfile(member.getId());

        LocalDateTime latestReadTime = alarmRedisRepository.findLatestAlarm(member.getId())
                .map(AlarmInfoRes::createdAt)
                .orElse(null);

        return LoginRes.builder()
                .accessToken("Bearer " + aT)
                .email(member.getEmail())
                .nickname(member.getNickname())
                .profileUrl(s3Service.getCloudFrontUrl(profile.getFilePath()))
                .personalSpaceId(member.getPersonalSpace().getId())
                .isRead(isAlarmRead(latestReadTime, member.getReadTime()))
                .build();

    }

    private boolean isAlarmRead(LocalDateTime latestAlarmTime, LocalDateTime memberReadTime) {
        if (latestAlarmTime == null) {
            return true;
        }

        return !latestAlarmTime.isAfter(memberReadTime);
    }

}
