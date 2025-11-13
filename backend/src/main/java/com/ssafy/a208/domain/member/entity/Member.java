package com.ssafy.a208.domain.member.entity;

import com.ssafy.a208.domain.member.exception.UsableCountExceededException;
import com.ssafy.a208.domain.space.entity.Space;
import com.ssafy.a208.global.common.BaseEntity;
import com.ssafy.a208.global.common.enums.MemberRole;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Comment("닉네임")
    @Column(nullable = false, unique = true, length = 10)
    private String nickname;

    @Comment("이메일")
    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Comment("비밀번호")
    @Column(nullable = false)
    private String password;

    @Comment("하루 사용 가능한 잔여 횟수")
    @Column(nullable = false)
    private int usableCnt;

    @Comment("권한")
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private MemberRole role;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "personal_space_id", nullable = false)
    private Space personalSpace;

    @OneToOne(mappedBy = "member", fetch = FetchType.LAZY)
    private Profile profile;

    @Builder
    public Member(String nickname, String email, String password, int usableCnt,
            Space personalSpace) {
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.usableCnt = usableCnt;
        this.role = MemberRole.USER;
        this.personalSpace = personalSpace;
    }

    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }

    public void updatePassword(String password) {
        this.password = password;
    }

    public void deleteMember() {
        this.email = this.id + "_" + this.email;
        this.nickname = this.id + "_" + this.nickname;
        this.delete();
    }

    public void decreaseUsableCnt() {
        this.usableCnt -= 1;
    }

    public String getProfileImage() {
        if (this.profile != null && this.profile.getDeletedAt() == null) {
            return this.profile.getFilePath();
        }
        return null;
    }
}