package com.ssafy.a208.domain.board.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.dsl.StringTemplate;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPostFile is a Querydsl query type for PostFile
 */
@SuppressWarnings("this-escape")
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPostFile extends EntityPathBase<PostFile> {

    private static final long serialVersionUID = 38600483L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPostFile postFile = new QPostFile("postFile");

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

    public final QPost post;

    //inherited
    public final NumberPath<Long> size = _super.size;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QPostFile(String variable) {
        this(PostFile.class, forVariable(variable), INITS);
    }

    public QPostFile(Path<? extends PostFile> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPostFile(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPostFile(PathMetadata metadata, PathInits inits) {
        this(PostFile.class, metadata, inits);
    }

    public QPostFile(Class<? extends PostFile> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.post = inits.isInitialized("post") ? new QPost(forProperty("post"), inits.get("post")) : null;
    }

}

