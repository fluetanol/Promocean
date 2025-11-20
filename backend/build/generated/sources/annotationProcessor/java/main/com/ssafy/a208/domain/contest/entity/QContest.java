package com.ssafy.a208.domain.contest.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.dsl.StringTemplate;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QContest is a Querydsl query type for Contest
 */
@SuppressWarnings("this-escape")
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QContest extends EntityPathBase<Contest> {

    private static final long serialVersionUID = -954589089L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QContest contest = new QContest("contest");

    public final com.ssafy.a208.global.common.QBaseEntity _super = new com.ssafy.a208.global.common.QBaseEntity(this);

    public final StringPath content = createString("content");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> deletedAt = _super.deletedAt;

    public final DateTimePath<java.time.LocalDateTime> endAt = createDateTime("endAt", java.time.LocalDateTime.class);

    public final com.ssafy.a208.domain.member.entity.QMember host;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final DateTimePath<java.time.LocalDateTime> startAt = createDateTime("startAt", java.time.LocalDateTime.class);

    public final EnumPath<com.ssafy.a208.global.common.enums.ContestStatus> status = createEnum("status", com.ssafy.a208.global.common.enums.ContestStatus.class);

    public final StringPath title = createString("title");

    public final EnumPath<com.ssafy.a208.global.common.enums.PromptType> type = createEnum("type", com.ssafy.a208.global.common.enums.PromptType.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final DateTimePath<java.time.LocalDateTime> voteEndAt = createDateTime("voteEndAt", java.time.LocalDateTime.class);

    public QContest(String variable) {
        this(Contest.class, forVariable(variable), INITS);
    }

    public QContest(Path<? extends Contest> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QContest(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QContest(PathMetadata metadata, PathInits inits) {
        this(Contest.class, metadata, inits);
    }

    public QContest(Class<? extends Contest> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.host = inits.isInitialized("host") ? new com.ssafy.a208.domain.member.entity.QMember(forProperty("host"), inits.get("host")) : null;
    }

}

