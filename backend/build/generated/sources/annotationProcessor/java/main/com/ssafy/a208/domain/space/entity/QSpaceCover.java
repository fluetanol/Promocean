package com.ssafy.a208.domain.space.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.dsl.StringTemplate;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSpaceCover is a Querydsl query type for SpaceCover
 */
@SuppressWarnings("this-escape")
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSpaceCover extends EntityPathBase<SpaceCover> {

    private static final long serialVersionUID = 618368920L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSpaceCover spaceCover = new QSpaceCover("spaceCover");

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

    //inherited
    public final StringPath originalName = _super.originalName;

    //inherited
    public final NumberPath<Long> size = _super.size;

    public final QSpace space;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QSpaceCover(String variable) {
        this(SpaceCover.class, forVariable(variable), INITS);
    }

    public QSpaceCover(Path<? extends SpaceCover> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QSpaceCover(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QSpaceCover(PathMetadata metadata, PathInits inits) {
        this(SpaceCover.class, metadata, inits);
    }

    public QSpaceCover(Class<? extends SpaceCover> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.space = inits.isInitialized("space") ? new QSpace(forProperty("space")) : null;
    }

}

