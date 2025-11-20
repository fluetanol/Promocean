package com.ssafy.a208.domain.contest.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.dsl.StringTemplate;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSubmission is a Querydsl query type for Submission
 */
@SuppressWarnings("this-escape")
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSubmission extends EntityPathBase<Submission> {

    private static final long serialVersionUID = 763988001L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSubmission submission = new QSubmission("submission");

    public final com.ssafy.a208.global.common.QBaseEntity _super = new com.ssafy.a208.global.common.QBaseEntity(this);

    public final QContest contest;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> deletedAt = _super.deletedAt;

    public final StringPath description = createString("description");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.ssafy.a208.domain.member.entity.QMember member;

    public final StringPath prompt = createString("prompt");

    public final StringPath result = createString("result");

    public final EnumPath<com.ssafy.a208.global.common.enums.PromptType> type = createEnum("type", com.ssafy.a208.global.common.enums.PromptType.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final NumberPath<Long> voteCount = createNumber("voteCount", Long.class);

    public QSubmission(String variable) {
        this(Submission.class, forVariable(variable), INITS);
    }

    public QSubmission(Path<? extends Submission> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QSubmission(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QSubmission(PathMetadata metadata, PathInits inits) {
        this(Submission.class, metadata, inits);
    }

    public QSubmission(Class<? extends Submission> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.contest = inits.isInitialized("contest") ? new QContest(forProperty("contest"), inits.get("contest")) : null;
        this.member = inits.isInitialized("member") ? new com.ssafy.a208.domain.member.entity.QMember(forProperty("member"), inits.get("member")) : null;
    }

}

