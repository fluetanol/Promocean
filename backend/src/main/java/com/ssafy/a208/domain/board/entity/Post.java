package com.ssafy.a208.domain.board.entity;

import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.tag.entity.PostTag;
import com.ssafy.a208.global.common.BaseEntity;
import com.ssafy.a208.global.common.enums.PostCategory;
import com.ssafy.a208.global.common.enums.PromptType;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Post extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Comment("제목")
    @Column(nullable = false, length = 100)
    private String title;

    @Comment("설명")
    @Column(length = 300)
    private String description;

    @Comment("카테고리")
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private PostCategory category;

    @Comment("프롬프트 내용")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String prompt;

    @Comment("프롬프트 타입")
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private PromptType type;

    @Comment("예시 질문")
    @Column(columnDefinition = "TEXT")
    private String exampleQuestion;

    @Comment("예시 답변")
    @Column(columnDefinition = "TEXT")
    private String exampleAnswer;

    @Comment("작성자")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = false)
    private Member author;

    @OneToMany(mappedBy = "post", cascade = CascadeType.PERSIST, orphanRemoval = false)
    private List<PostLike> postLikes = new ArrayList<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.PERSIST, orphanRemoval = false)
    private List<PostTag> postTags = new ArrayList<>();

    @OneToOne(mappedBy = "post", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private PostFile postFile;

    @Builder
    public Post(String title, String description, PostCategory category, String prompt,
            PromptType type,
            String exampleQuestion, String exampleAnswer, Member author) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.prompt = prompt;
        this.type = type;
        this.exampleQuestion = exampleQuestion;
        this.exampleAnswer = exampleAnswer;
        this.author = author;
    }

    public void update(String title, String description, PostCategory category,
                       String prompt, PromptType type, String exampleQuestion, String exampleAnswer) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.prompt = prompt;
        this.type = type;
        this.exampleQuestion = exampleQuestion;
        this.exampleAnswer = exampleAnswer;
    }

    public boolean isAuthor(Long memberId) {
        return this.author.getId().equals(memberId);
    }

    public void deletePost() {
        this.delete();
    }
}
