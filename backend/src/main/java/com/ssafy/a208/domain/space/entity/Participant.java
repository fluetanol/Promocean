package com.ssafy.a208.domain.space.entity;

import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.global.common.BaseEntity;
import com.ssafy.a208.global.common.enums.ParticipantRole;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Participant extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Comment("닉네임")
    @Column(nullable = false, length = 10)
    private String nickname;

    @Comment("참가자 접근권한")
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ParticipantRole role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "space_id", nullable = false)
    private Space space;

    @Builder
    public Participant(String nickname, ParticipantRole role, Member member, Space space) {
        this.nickname = nickname;
        this.role = role;
        this.member = member;
        this.space = space;
    }

    public void updateParticipantNickname(String nickname) {
        this.nickname = nickname;
    }

    public void updateParticipantRole(ParticipantRole role) {
        this.role = role;
    }

    public void deleteParticipant() {
        this.delete();
    }

}
