package com.ssafy.a208.domain.member.reader;

import com.ssafy.a208.domain.member.entity.Profile;
import com.ssafy.a208.domain.member.exception.ProfileNotFoundException;
import com.ssafy.a208.domain.member.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProfileReader {

    private final ProfileRepository profileRepository;

    public Profile getProfile(Long memberId) {
        return profileRepository.findByMemberIdAndDeletedAtIsNull(memberId)
                .orElseThrow(ProfileNotFoundException::new);
    }
}
