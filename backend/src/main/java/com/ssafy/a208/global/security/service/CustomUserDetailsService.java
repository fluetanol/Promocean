package com.ssafy.a208.global.security.service;

import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.member.exception.MemberNotFoundException;
import com.ssafy.a208.domain.member.repository.MemberRepository;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Member member = memberRepository.findByEmailAndDeletedAtIsNull(email)
                .orElseThrow(MemberNotFoundException::new);
        return CustomUserDetails.builder()
                .memberId(member.getId())
                .email(member.getEmail())
                .role(member.getRole())
                .build();
    }
}