package com.ssafy.a208.domain.member.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.dsl.StringTemplate;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QProfile is a Querydsl query type for Profile
 */
@SuppressWarnings("this-escape")
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QProfile extends EntityPathBase<Profile> {

    private static final long serialVersionUID = -1534578058L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QProfile profile = new QProfile("profile");

    public final com.ssafy.a208.global.common.QFileEntity _super = new com.ssafy.a208.global.common.QFileEntity(this);

    //inherited
    public final StringPath contentType = _super.contentType;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> deletedAt = _super.deletedAt;

    //inherited
    public final StringPath filePath = _super.filePath;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QMember member;

    //inherited
    public final StringPath originalName = _super.originalName;

    //inherited
    public final NumberPath<Long> size = _super.size;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QProfile(String variable) {
        this(Profile.class, forVariable(variable), INITS);
    }

    public QProfile(Path<? extends Profile> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QProfile(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QProfile(PathMetadata metadata, PathInits inits) {
        this(Profile.class, metadata, inits);
    }

    public QProfile(Class<? extends Profile> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member"), inits.get("member")) : null;
    }

}

