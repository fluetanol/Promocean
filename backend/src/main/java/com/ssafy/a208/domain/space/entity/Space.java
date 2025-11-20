package com.ssafy.a208.domain.space.entity;

import com.ssafy.a208.global.common.BaseEntity;
import com.ssafy.a208.global.common.enums.SpaceType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Space extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Comment("스페이스명")
    @Column(nullable = false, length = 50)
    private String name;

    @Comment("스페이스 타입")
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private SpaceType type;

    @Builder
    public Space(String name, SpaceType type) {
        this.name = name;
        this.type = type;
    }

    public void updateName(String name) {
        this.name = name;
    }

    public void deleteTeamSpace() {
        this.delete();
    }

}
