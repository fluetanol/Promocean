package com.ssafy.a208.domain.contest.entity;

import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.global.common.BaseEntity;
import com.ssafy.a208.global.common.enums.ContestStatus;
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
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Contest extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Comment("대회명")
    @Column(nullable = false, length = 100)
    private String title;

    @Comment("대회 설명")
    @Column(columnDefinition = "TEXT")
    private String content;

    @Comment("대회 종류")
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private PromptType type;

    @Comment("개최 일시")
    @Column(nullable = false)
    private LocalDateTime startAt;

    @Comment("종료 일시")
    @Column(nullable = false)
    private LocalDateTime endAt;

    @Comment("투표 종료 일시")
    @Column(nullable = false)
    private LocalDateTime voteEndAt;

    @Comment("대회 상태")
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ContestStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "host_id", nullable = false)
    private Member host;

    @Builder
    public Contest(String title, String content, PromptType type, LocalDateTime startAt,
            LocalDateTime endAt, LocalDateTime voteEndAt, Member host) {
        this.title = title;
        this.content = content;
        this.type = type;
        this.startAt = startAt;
        this.endAt = endAt;
        this.voteEndAt = voteEndAt;
        this.status = ContestStatus.SCHEDULED;
        this.host = host;
    }
    
    public void updateContest(
            String title,
            String content,
            LocalDateTime startAt,
            LocalDateTime endAt,
            LocalDateTime voteEndAt
    ) {
        this.title = title;
        this.content = content;
        this.startAt = startAt;
        this.endAt = endAt;
        this.voteEndAt = voteEndAt;
    }
}