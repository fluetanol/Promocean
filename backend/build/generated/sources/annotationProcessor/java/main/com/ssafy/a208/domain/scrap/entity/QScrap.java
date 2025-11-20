package com.ssafy.a208.domain.scrap.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.dsl.StringTemplate;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QScrap is a Querydsl query type for Scrap
 */
@SuppressWarnings("this-escape")
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QScrap extends EntityPathBase<Scrap> {

    private static final long serialVersionUID = -1230620353L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QScrap scrap = new QScrap("scrap");

    public final com.ssafy.a208.global.common.QBaseEntity _super = new com.ssafy.a208.global.common.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> deletedAt = _super.deletedAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.ssafy.a208.domain.member.entity.QMember member;

    public final com.ssafy.a208.domain.board.entity.QPost post;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QScrap(String variable) {
        this(Scrap.class, forVariable(variable), INITS);
    }

    public QScrap(Path<? extends Scrap> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QScrap(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QScrap(PathMetadata metadata, PathInits inits) {
        this(Scrap.class, metadata, inits);
    }

    public QScrap(Class<? extends Scrap> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new com.ssafy.a208.domain.member.entity.QMember(forProperty("member"), inits.get("member")) : null;
        this.post = inits.isInitialized("post") ? new com.ssafy.a208.domain.board.entity.QPost(forProperty("post"), inits.get("post")) : null;
    }

}

