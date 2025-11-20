package com.ssafy.a208.domain.space.entity;

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
public class Article extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Comment("제목")
    @Column(nullable = false, length = 100)
    private String title;

    @Comment("설명")
    @Column(length = 300)
    private String description;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "folder_id", nullable = false)
    private Folder folder;

    @Builder
    public Article(String title, String description, String prompt, PromptType type,
            String exampleQuestion, String exampleAnswer, Folder folder) {
        this.title = title;
        this.description = description;
        this.prompt = prompt;
        this.type = type;
        this.exampleQuestion = exampleQuestion;
        this.exampleAnswer = exampleAnswer;
        this.folder = folder;
    }

    public void updateArticle(String title, String description, String prompt, PromptType type,
            String exampleQuestion, String exampleAnswer) {
        this.title = title;
        this.description = description;
        this.prompt = prompt;
        this.type = type;
        this.exampleQuestion = exampleQuestion;
        this.exampleAnswer = exampleAnswer;
    }

    public void deleteArticle() {
        this.delete();
    }
}
