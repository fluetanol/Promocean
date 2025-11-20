package com.ssafy.a208.domain.member.service;

import com.ssafy.a208.domain.member.dto.response.ProfileRes;
import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.member.entity.Profile;
import com.ssafy.a208.domain.member.reader.ProfileReader;
import com.ssafy.a208.domain.member.repository.ProfileRepository;
import com.ssafy.a208.global.common.enums.ImageDirectory;
import com.ssafy.a208.global.image.dto.FileMetaData;
import com.ssafy.a208.global.image.service.S3Service;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import com.ssafy.a208.global.security.exception.InvalidFilePathException;
import jakarta.validation.constraints.NotBlank;
import java.util.Objects;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final S3Service s3Service;
    private final ProfileReader profileReader;
    private final ProfileRepository profileRepository;

    private static final String[] DEFAULT_PROFILE_KEYS = {
            "profiles/default/Profile1.png", "profiles/default/Profile2.png",
            "profiles/default/Profile3.png", "profiles/default/Profile4.png",
            "profiles/default/Profile5.png"
    };

    public String getProfileUrl(Member member) {
        Profile profile = profileReader.getProfile(member.getId());
        return s3Service.getCloudFrontUrl(profile.getFilePath());
    }

    @Transactional
    public ProfileRes updateProfileToDefault(CustomUserDetails userDetails) {
        Profile profile = profileReader.getProfile(userDetails.memberId());
        if (!this.isDefaultProfile(profile.getFilePath())) {
            s3Service.deleteFile(profile.getFilePath());
        }

        String defaultUrl = this.getRandomDefaultProfile();
        FileMetaData profileMetaData = s3Service.getFileMetadata(defaultUrl);
        profile.updateFile(profileMetaData);

        return ProfileRes.builder()
                .profileUrl(s3Service.getCloudFrontUrl(defaultUrl))
                .build();
    }

    @Transactional
    public void createProfile(String filePath, Member member) {
        String movedPath = this.extractProfilePath(filePath);
        FileMetaData fileMetaData = s3Service.getFileMetadata(movedPath);
        Profile profile = Profile.builder()
                .member(member)
                .contentType(fileMetaData.contentType())
                .size(fileMetaData.size())
                .filePath(fileMetaData.filePath())
                .originalName(fileMetaData.originalName())
                .build();
        profileRepository.save(profile);
    }

    @Transactional
    public void updateProfile(@NotBlank String filePath, Long memberId) {
        Profile profile = profileReader.getProfile(memberId);
        if (!this.isDefaultProfile(profile.getFilePath())) {
            this.deleteProfile(memberId);
        }
        String movedPath = this.extractProfilePath(filePath);
        FileMetaData profileMetaData = s3Service.getFileMetadata(movedPath);
        profile.updateFile(profileMetaData);
    }

    @Transactional
    public void deleteProfile(Long memberId) {
        Profile profile = profileReader.getProfile(memberId);
        s3Service.deleteFile(profile.getFilePath());
        profile.deleteFile();
    }

    private boolean isDefaultProfile(@NotBlank String filePath) {
        if (!filePath.startsWith("profiles/default")) {
            return false;
        }

        return Stream.of(DEFAULT_PROFILE_KEYS)
                .anyMatch(key -> key.equals(filePath));
    }

    private String extractProfilePath(String filePath) {
        if (Objects.isNull(filePath) || filePath.isBlank()) {
            return this.getRandomDefaultProfile();
        }

        if (!filePath.startsWith("tmp")) {
            throw new InvalidFilePathException();
        }

        return s3Service.moveObject(filePath, ImageDirectory.PROFILES);
    }

    private String getRandomDefaultProfile() {
        int idx = ThreadLocalRandom.current().nextInt(DEFAULT_PROFILE_KEYS.length);
        return DEFAULT_PROFILE_KEYS[idx];
    }
}
