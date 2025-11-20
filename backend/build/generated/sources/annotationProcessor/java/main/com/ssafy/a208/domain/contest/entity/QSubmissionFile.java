package com.ssafy.a208.domain.contest.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.dsl.StringTemplate;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSubmissionFile is a Querydsl query type for SubmissionFile
 */
@SuppressWarnings("this-escape")
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSubmissionFile extends EntityPathBase<SubmissionFile> {

    private static final long serialVersionUID = -1082656451L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSubmissionFile submissionFile = new QSubmissionFile("submissionFile");

    public final com.ssafy.a208.global.common.QFileEntity _super = new com.ssafy.a208.global.common.QFileEntity(this);

    //inherited
    public final StringPath contentType = _super.contentType;

    public final QContest contest;

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

    public final QSubmission submission;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QSubmissionFile(String variable) {
        this(SubmissionFile.class, forVariable(variable), INITS);
    }

    public QSubmissionFile(Path<? extends SubmissionFile> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QSubmissionFile(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QSubmissionFile(PathMetadata metadata, PathInits inits) {
        this(SubmissionFile.class, metadata, inits);
    }

    public QSubmissionFile(Class<? extends SubmissionFile> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.contest = inits.isInitialized("contest") ? new QContest(forProperty("contest"), inits.get("contest")) : null;
        this.submission = inits.isInitialized("submission") ? new QSubmission(forProperty("submission"), inits.get("submission")) : null;
    }

}

