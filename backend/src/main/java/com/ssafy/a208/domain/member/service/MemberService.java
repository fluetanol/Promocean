package com.ssafy.a208.domain.member.service;

import com.ssafy.a208.domain.member.dto.request.SignupReq;
import com.ssafy.a208.domain.member.dto.request.UpdateMemberReq;
import com.ssafy.a208.domain.member.dto.response.CheckDuplicateRes;
import com.ssafy.a208.domain.member.dto.response.SearchMemberRes;
import com.ssafy.a208.domain.member.dto.response.UsableTokenRes;
import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.member.exception.AlreadyExistEmailException;
import com.ssafy.a208.domain.member.exception.AlreadyExistNicknameException;
import com.ssafy.a208.domain.member.exception.InvalidMemberCheckRequestException;
import com.ssafy.a208.domain.member.reader.MemberReader;
import com.ssafy.a208.domain.member.repository.MemberRepository;
import com.ssafy.a208.domain.space.entity.Space;
import com.ssafy.a208.domain.space.service.SpaceService;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final PasswordEncoder encoder;
    private final SpaceService spaceService;
    private final MemberReader memberReader;
    private final ProfileService profileService;
    private final MemberRepository memberRepository;

    private static final int TOKEN_AMOUNT = 5;


    @Transactional
    public void signup(SignupReq signupReq) {
        Space space = spaceService.createPersonalSpace(signupReq.nickname());
        Member member = this.createMember(signupReq, space);
        profileService.createProfile(signupReq.filePath(), member);
    }

    @Transactional
    public void withdrawal(CustomUserDetails userDetails) {
        Member member = memberReader.getMemberById(userDetails.memberId());
        member.deleteMember();

        profileService.deleteProfile(member.getId());
        // TODO Member 연결된 Entity 삭제 필요
    }

    @Transactional
    public void updateMember(CustomUserDetails userDetails, UpdateMemberReq memberReq) {
        Member member = memberReader.getMemberById(userDetails.memberId());

        if (!Objects.isNull(memberReq.nickname()) && !memberReq.nickname().isBlank()) {
            member.updateNickname(memberReq.nickname());
        }

        if (!Objects.isNull(memberReq.password()) && !memberReq.password().isBlank()) {
            String encodedPassword = encoder.encode(memberReq.password());
            member.updatePassword(encodedPassword);
        }

        if (!Objects.isNull(memberReq.filePath()) && !memberReq.filePath().isBlank()) {
            profileService.updateProfile(memberReq.filePath(), userDetails.memberId());
        }
    }

    @Transactional(readOnly = true)
    public SearchMemberRes searchMember(String email, String nickname) {
        if ((Objects.isNull(email) && Objects.isNull(nickname))
                || (!Objects.isNull(email) && !Objects.isNull(nickname))) {
            throw new InvalidMemberCheckRequestException();
        }

        if (!Objects.isNull(email)) {
            Member member = memberReader.getMemberByEmail(email);
            return SearchMemberRes.builder()
                    .email(member.getEmail())
                    .nickname(member.getNickname())
                    .profileUrl(member.getProfileImage())
                    .build();
        }

        Member member = memberReader.getMemberByNickname(nickname);
        return SearchMemberRes.builder()
                .email(member.getEmail())
                .nickname(member.getNickname())
                .profileUrl(member.getProfileImage())
                .build();

    }

    @Transactional(readOnly = true)
    public CheckDuplicateRes checkDuplicate(String email, String nickname) {
        if ((Objects.isNull(email) && Objects.isNull(nickname))
                || (!Objects.isNull(email) && !Objects.isNull(nickname))) {
            throw new InvalidMemberCheckRequestException();
        }

        if (!Objects.isNull(email)) {
            boolean isDuplicated = memberReader.checkEmailExist(email);
            return CheckDuplicateRes.builder()
                    .isDuplicated(isDuplicated)
                    .build();
        }

        boolean isDuplicated = memberReader.checkNicknameExist(nickname);
        return CheckDuplicateRes.builder()
                .isDuplicated(isDuplicated)
                .build();
    }

    @Transactional(readOnly = true)
    public UsableTokenRes getUsableToken(CustomUserDetails userDetails) {
        Member member = memberReader.getMemberById(userDetails.memberId());
        return UsableTokenRes.builder().usableToken(member.getUsableCnt()).build();
    }

    private Member createMember(SignupReq signupReq, Space space) {
        String encodedPassword = encoder.encode(signupReq.password());
        this.validateEmailAndNickname(signupReq.email(), signupReq.nickname());

        Member member = Member.builder()
                .email(signupReq.email())
                .nickname(signupReq.nickname())
                .password(encodedPassword)
                .usableCnt(TOKEN_AMOUNT)
                .personalSpace(space)
                .build();
        return memberRepository.save(member);
    }

    private void validateEmailAndNickname(String email, String nickname) {
        if (memberReader.checkEmailExist(email)) {
            throw new AlreadyExistEmailException();
        }

        if (memberReader.checkNicknameExist(nickname)) {
            throw new AlreadyExistNicknameException();
        }
    }

}
