package com.ssafy.a208.domain.space.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.dsl.StringTemplate;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QParticipant is a Querydsl query type for Participant
 */
@SuppressWarnings("this-escape")
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QParticipant extends EntityPathBase<Participant> {

    private static final long serialVersionUID = 804695756L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QParticipant participant = new QParticipant("participant");

    public final com.ssafy.a208.global.common.QBaseEntity _super = new com.ssafy.a208.global.common.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> deletedAt = _super.deletedAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.ssafy.a208.domain.member.entity.QMember member;

    public final StringPath nickname = createString("nickname");

    public final EnumPath<com.ssafy.a208.global.common.enums.ParticipantRole> role = createEnum("role", com.ssafy.a208.global.common.enums.ParticipantRole.class);

    public final QSpace space;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QParticipant(String variable) {
        this(Participant.class, forVariable(variable), INITS);
    }

    public QParticipant(Path<? extends Participant> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QParticipant(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QParticipant(PathMetadata metadata, PathInits inits) {
        this(Participant.class, metadata, inits);
    }

    public QParticipant(Class<? extends Participant> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new com.ssafy.a208.domain.member.entity.QMember(forProperty("member"), inits.get("member")) : null;
        this.space = inits.isInitialized("space") ? new QSpace(forProperty("space")) : null;
    }

}

