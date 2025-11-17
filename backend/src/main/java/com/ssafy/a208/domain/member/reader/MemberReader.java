package com.ssafy.a208.domain.member.reader;

import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.member.exception.MemberNotFoundException;
import com.ssafy.a208.domain.member.repository.MemberRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class MemberReader {

    private final MemberRepository memberRepository;

    @Transactional(readOnly = true)
    public List<Member> getMembersById(List<Long> memberIds) {
        return memberRepository.findAllByIdInAndDeletedAtIsNull(memberIds);
    }

    @Transactional(readOnly = true)
    public Member getMemberById(Long memberId) {
        return memberRepository.findByIdAndDeletedAtIsNull(memberId).orElseThrow(
                MemberNotFoundException::new);
    }

    @Transactional(readOnly = true)
    public Member getMemberByNickname(String nickname) {
        return memberRepository.findByNicknameAndDeletedAtIsNull(nickname).orElseThrow(
                MemberNotFoundException::new);
    }

    @Transactional(readOnly = true)
    public Member getMemberByEmail(String email) {
        return memberRepository.findByEmailAndDeletedAtIsNull(email).orElseThrow(
                MemberNotFoundException::new);
    }

    public boolean checkEmailExist(String email) {
        return memberRepository.existsByEmail(email);
    }

    public boolean checkNicknameExist(String nickname) {
        return memberRepository.existsByNickname(nickname);
    }

}
