package com.ssafy.a208.domain.board.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.dsl.StringTemplate;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPost is a Querydsl query type for Post
 */
@SuppressWarnings("this-escape")
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPost extends EntityPathBase<Post> {

    private static final long serialVersionUID = -437686009L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPost post = new QPost("post");

    public final com.ssafy.a208.global.common.QBaseEntity _super = new com.ssafy.a208.global.common.QBaseEntity(this);

    public final com.ssafy.a208.domain.member.entity.QMember author;

    public final EnumPath<com.ssafy.a208.global.common.enums.PostCategory> category = createEnum("category", com.ssafy.a208.global.common.enums.PostCategory.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> deletedAt = _super.deletedAt;

    public final StringPath description = createString("description");

    public final StringPath exampleAnswer = createString("exampleAnswer");

    public final StringPath exampleQuestion = createString("exampleQuestion");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QPostFile postFile;

    public final ListPath<PostLike, QPostLike> postLikes = this.<PostLike, QPostLike>createList("postLikes", PostLike.class, QPostLike.class, PathInits.DIRECT2);

    public final ListPath<com.ssafy.a208.domain.tag.entity.PostTag, com.ssafy.a208.domain.tag.entity.QPostTag> postTags = this.<com.ssafy.a208.domain.tag.entity.PostTag, com.ssafy.a208.domain.tag.entity.QPostTag>createList("postTags", com.ssafy.a208.domain.tag.entity.PostTag.class, com.ssafy.a208.domain.tag.entity.QPostTag.class, PathInits.DIRECT2);

    public final StringPath prompt = createString("prompt");

    public final StringPath title = createString("title");

    public final EnumPath<com.ssafy.a208.global.common.enums.PromptType> type = createEnum("type", com.ssafy.a208.global.common.enums.PromptType.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QPost(String variable) {
        this(Post.class, forVariable(variable), INITS);
    }

    public QPost(Path<? extends Post> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPost(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPost(PathMetadata metadata, PathInits inits) {
        this(Post.class, metadata, inits);
    }

    public QPost(Class<? extends Post> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.author = inits.isInitialized("author") ? new com.ssafy.a208.domain.member.entity.QMember(forProperty("author"), inits.get("author")) : null;
        this.postFile = inits.isInitialized("postFile") ? new QPostFile(forProperty("postFile"), inits.get("postFile")) : null;
    }

}

