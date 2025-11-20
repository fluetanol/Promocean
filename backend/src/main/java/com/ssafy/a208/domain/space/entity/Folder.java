package com.ssafy.a208.domain.space.entity;

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
public class Folder extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Comment("폴더명")
    @Column(nullable = false, length = 30)
    private String name;

    @Comment("폴더 색상")
    @Column(nullable = false, length = 6)
    private String color;

    @Comment("핀 여부")
    @Column(nullable = false)
    private boolean isPinned;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "space_id", nullable = false)
    private Space space;

    @Builder
    public Folder(String name, String color, Space space) {
        this.name = name;
        this.color = color;
        this.isPinned = false;
        this.space = space;
    }

    public void updateColor(String color){
        this.color = color;
    }

    public void updateFolder(String name, String color) {
        this.name = name;
        this.color = color;
    }

    public void updatePin() {
        if (this.isPinned) {
            this.isPinned = false;
            return;
        }

        this.isPinned = true;
    }

    public void deleteFolder() {
        this.delete();
    }
}
