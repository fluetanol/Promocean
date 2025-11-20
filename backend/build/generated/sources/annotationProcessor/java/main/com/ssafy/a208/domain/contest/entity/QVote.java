package com.ssafy.a208.domain.contest.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.dsl.StringTemplate;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QVote is a Querydsl query type for Vote
 */
@SuppressWarnings("this-escape")
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QVote extends EntityPathBase<Vote> {

    private static final long serialVersionUID = 1239819135L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QVote vote = new QVote("vote");

    public final com.ssafy.a208.global.common.QBaseEntity _super = new com.ssafy.a208.global.common.QBaseEntity(this);

    public final QContest contest;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> deletedAt = _super.deletedAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.ssafy.a208.domain.member.entity.QMember member;

    public final QSubmission submission;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QVote(String variable) {
        this(Vote.class, forVariable(variable), INITS);
    }

    public QVote(Path<? extends Vote> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QVote(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QVote(PathMetadata metadata, PathInits inits) {
        this(Vote.class, metadata, inits);
    }

    public QVote(Class<? extends Vote> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.contest = inits.isInitialized("contest") ? new QContest(forProperty("contest"), inits.get("contest")) : null;
        this.member = inits.isInitialized("member") ? new com.ssafy.a208.domain.member.entity.QMember(forProperty("member"), inits.get("member")) : null;
        this.submission = inits.isInitialized("submission") ? new QSubmission(forProperty("submission"), inits.get("submission")) : null;
    }

}

