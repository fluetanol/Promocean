package com.ssafy.a208.domain.space.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.dsl.StringTemplate;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QArticleFile is a Querydsl query type for ArticleFile
 */
@SuppressWarnings("this-escape")
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QArticleFile extends EntityPathBase<ArticleFile> {

    private static final long serialVersionUID = 855083819L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QArticleFile articleFile = new QArticleFile("articleFile");

    public final com.ssafy.a208.global.common.QFileEntity _super = new com.ssafy.a208.global.common.QFileEntity(this);

    public final QArticle article;

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

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QArticleFile(String variable) {
        this(ArticleFile.class, forVariable(variable), INITS);
    }

    public QArticleFile(Path<? extends ArticleFile> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QArticleFile(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QArticleFile(PathMetadata metadata, PathInits inits) {
        this(ArticleFile.class, metadata, inits);
    }

    public QArticleFile(Class<? extends ArticleFile> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.article = inits.isInitialized("article") ? new QArticle(forProperty("article"), inits.get("article")) : null;
    }

}

