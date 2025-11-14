package com.ssafy.a208.domain.contest.entity;

import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.global.common.BaseEntity;
import com.ssafy.a208.global.common.enums.PromptType;
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
public class Submission extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Comment("프롬프트 내용")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String prompt;

    @Comment("프롬프트 설명")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Comment("프롬프트 실행 결과")
    @Column(columnDefinition = "TEXT")
    private String result;

    @Comment("프롬프트 타입")
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private PromptType type;

    @Comment("받은 투표 수")
    @Column(nullable = false)
    private long voteCount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contest_id", nullable = false)
    private Contest contest;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Builder
    public Submission(String prompt, String description, String result, PromptType type, Contest contest, Member member) {
        this.prompt = prompt;
        this.description = description;
        this.result = result;
        this.type = type;
        this.contest = contest;
        this.member = member;
    }

    public void updateSubmission(String prompt, String description, String result) {
        this.prompt = prompt;
        this.description = description;
        this.result = result;
    }

    public void increaseVoteCount() { this.voteCount++; }
}
