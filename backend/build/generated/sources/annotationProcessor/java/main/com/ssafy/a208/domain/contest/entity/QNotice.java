package com.ssafy.a208.domain.contest.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.dsl.StringTemplate;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QNotice is a Querydsl query type for Notice
 */
@SuppressWarnings("this-escape")
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QNotice extends EntityPathBase<Notice> {

    private static final long serialVersionUID = 1531221549L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QNotice notice = new QNotice("notice");

    public final com.ssafy.a208.global.common.QBaseEntity _super = new com.ssafy.a208.global.common.QBaseEntity(this);

    public final com.ssafy.a208.domain.member.entity.QMember author;

    public final StringPath content = createString("content");

    public final QContest contest;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> deletedAt = _super.deletedAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath title = createString("title");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QNotice(String variable) {
        this(Notice.class, forVariable(variable), INITS);
    }

    public QNotice(Path<? extends Notice> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QNotice(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QNotice(PathMetadata metadata, PathInits inits) {
        this(Notice.class, metadata, inits);
    }

    public QNotice(Class<? extends Notice> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.author = inits.isInitialized("author") ? new com.ssafy.a208.domain.member.entity.QMember(forProperty("author"), inits.get("author")) : null;
        this.contest = inits.isInitialized("contest") ? new QContest(forProperty("contest"), inits.get("contest")) : null;
    }

}

