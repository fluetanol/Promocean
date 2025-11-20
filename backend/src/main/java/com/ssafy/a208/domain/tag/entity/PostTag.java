package com.ssafy.a208.domain.tag.entity;

import com.ssafy.a208.domain.board.entity.Post;
import com.ssafy.a208.global.common.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(
        name = "post_tag",
        uniqueConstraints = @UniqueConstraint(
                name = "uq_post_tag",
                columnNames = {"post_id", "tag_id"}
        )
)
public class PostTag extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id", nullable = false)
    private Tag tag;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @Builder
    public PostTag(Tag tag, Post post) {
        this.tag = tag;
        this.post = post;
    }

    public void deletePostTag() {
        this.delete();
    }

    public void restorePostTag() {
        this.restore();
    }
}
