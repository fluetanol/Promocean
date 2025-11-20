package com.ssafy.a208.domain.space.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.dsl.StringTemplate;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QSpace is a Querydsl query type for Space
 */
@SuppressWarnings("this-escape")
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSpace extends EntityPathBase<Space> {

    private static final long serialVersionUID = -741632161L;

    public static final QSpace space = new QSpace("space");

    public final com.ssafy.a208.global.common.QBaseEntity _super = new com.ssafy.a208.global.common.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> deletedAt = _super.deletedAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath name = createString("name");

    public final EnumPath<com.ssafy.a208.global.common.enums.SpaceType> type = createEnum("type", com.ssafy.a208.global.common.enums.SpaceType.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QSpace(String variable) {
        super(Space.class, forVariable(variable));
    }

    public QSpace(Path<? extends Space> path) {
        super(path.getType(), path.getMetadata());
    }

    public QSpace(PathMetadata metadata) {
        super(Space.class, metadata);
    }

}

