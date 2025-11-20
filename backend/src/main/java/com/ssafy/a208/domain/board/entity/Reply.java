package com.ssafy.a208.domain.board.entity;

import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.global.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
public class Reply extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Comment("내용")
    @Column(nullable = false, length = 1000)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = false)
    private Member author;

    @Builder
    public Reply(String content, Post post, Member author) {
        this.content = content;
        this.post = post;
        this.author = author;
    }

    public boolean isAuthor(Long memberId) {
        return this.author.getId().equals(memberId);
    }

    public void updateContent(String content) {
        this.content = content;
    }

    public void deleteReply() {
        this.delete();
    }
}
