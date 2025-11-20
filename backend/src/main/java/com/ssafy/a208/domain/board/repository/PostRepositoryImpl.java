package com.ssafy.a208.domain.board.repository;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.a208.domain.board.dto.*;
import com.ssafy.a208.domain.board.entity.*;
import com.ssafy.a208.domain.member.entity.QMember;
import com.ssafy.a208.domain.member.entity.QProfile;
import com.ssafy.a208.domain.tag.entity.PostTag;
import com.ssafy.a208.domain.tag.entity.QPostTag;
import com.ssafy.a208.domain.tag.entity.QTag;
import com.ssafy.a208.global.common.enums.PostCategory;
import com.ssafy.a208.global.common.enums.PromptType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static com.ssafy.a208.domain.board.entity.QPost.post;
import static com.ssafy.a208.domain.board.entity.QPostFile.postFile;
import static com.ssafy.a208.domain.board.entity.QPostLike.postLike;
import static com.ssafy.a208.domain.board.entity.QReply.reply;
import static com.ssafy.a208.domain.member.entity.QMember.member;
import static com.ssafy.a208.domain.member.entity.QProfile.profile;
import static com.ssafy.a208.domain.tag.entity.QPostTag.postTag;
import static com.ssafy.a208.domain.tag.entity.QTag.tag;

/**
 * 게시글 Repository Custom 구현체
 * QueryDSL을 사용한 동적 쿼리 구현
 */
@Repository
@RequiredArgsConstructor
public class PostRepositoryImpl implements PostRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    /**
     * 게시글 상세 조회
     */
    @Override
    public Optional<PostDetailProjection> findPostDetailById(Long postId) {
        PostDetailProjection result = queryFactory
                .select(new QPostDetailProjection(
                        post.id,
                        post.title,
                        post.description,
                        post.category,
                        post.prompt,
                        post.type,
                        post.exampleQuestion,
                        post.exampleAnswer,
                        post.createdAt,
                        member.nickname,
                        profile.filePath,
                        postFile.filePath,
                        JPAExpressions
                                .select(postLike.count())
                                .from(postLike)
                                .where(
                                        postLike.post.eq(post),
                                        postLike.deletedAt.isNull()
                                ),
                        // 댓글 수 서브쿼리
                        JPAExpressions
                                .select(reply.count())
                                .from(reply)
                                .where(
                                        reply.post.eq(post),
                                        reply.deletedAt.isNull()
                                )
                ))
                .from(post)
                .leftJoin(post.author, member)
                .leftJoin(member.profile, profile)
                .leftJoin(post.postFile, postFile)
                .where(
                        post.id.eq(postId),
                        post.deletedAt.isNull()
                )
                .fetchOne();

        return Optional.ofNullable(result);
    }

    /**
     * 게시글의 댓글 목록 조회
     */
    @Override
    public List<ReplyProjection> findRepliesByPostId(Long postId) {
        return queryFactory
                .select(new QReplyProjection(
                        reply.id,
                        member.nickname,
                        profile.filePath,
                        reply.content,
                        reply.createdAt,
                        reply.updatedAt
                ))
                .from(reply)
                .join(reply.author, member)
                .leftJoin(member.profile, profile)
                .where(
                        reply.post.id.eq(postId),
                        reply.deletedAt.isNull()
                )
                .orderBy(reply.createdAt.asc())
                .fetch();
    }

    /**
     * V1: 개선 전 - fetchJoin 없이 조회 (N+1 문제 발생)
     */
    /** @deprecated V3로 대체됨 */
    @Deprecated
    @Override
    public Page<Post> findPostsWithFiltersV1(PostListQueryDto query, Pageable pageable) {

        List<Post> posts = queryFactory
                .selectFrom(post)
                .join(post.author, member)
                .where(
                        postNotDeleted(),
                        authorContains(query.author()),
                        titleContains(query.title()),
                        categoryEq(query.category()),
                        typeEq(query.type()),
                        tagEquals(query.tag())
                )
                .orderBy(getOrderSpecifier(query.sorter()))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long total = queryFactory
                .select(post.countDistinct())
                .from(post)
                .join(post.author, member)
                .leftJoin(post.postTags, postTag)
                .leftJoin(postTag.tag, tag)
                .where(
                        postNotDeleted(),
                        authorContains(query.author()),
                        titleContains(query.title()),
                        categoryEq(query.category()),
                        typeEq(query.type()),
                        tagEquals(query.tag())
                )
                .fetchOne();

        return new PageImpl<>(posts, pageable, total != null ? total : 0L);
    }

    /**
     * V2: 개선 1차 시도 - fetchJoin 사용(하지만..메모리를 더 많이 쓰는 문제 발생 ㅠㅠ)
     */
    /** @deprecated V3로 대체됨 */
    @Deprecated
    @Override
    public Page<Post> findPostsWithFiltersV2(PostListQueryDto query, Pageable pageable) {
        List<Post> posts;

        // 인기순일 때만 groupBy
        if ("popular".equalsIgnoreCase(query.sorter())) {
            posts = queryFactory
                    .select(post)
                    .from(post)
                    .join(post.author, member)
                    .leftJoin(post.postLikes, postLike)
                    .leftJoin(post.postTags, postTag)
                    .leftJoin(postTag.tag, tag)
                    .where(
                            postNotDeleted(),
                            authorContains(query.author()),
                            titleContains(query.title()),
                            categoryEq(query.category()),
                            typeEq(query.type()),
                            tagEquals(query.tag())
                    )
                    .groupBy(post.id)
                    .orderBy(postLike.count().desc(), post.createdAt.desc())
                    .offset(pageable.getOffset())
                    .limit(pageable.getPageSize())
                    .fetch();
        } else {
            // 최신순, 오래된순일 때는 fetchJoin + distinct 사용
            posts = queryFactory
                    .selectFrom(post)
                    .distinct()
                    .join(post.author, member).fetchJoin()
                    .leftJoin(member.profile, profile).fetchJoin()
                    .leftJoin(post.postTags, postTag).fetchJoin()
                    .leftJoin(postTag.tag, tag).fetchJoin()
                    .leftJoin(post.postFile, postFile).fetchJoin()
                    .where(
                            postNotDeleted(),
                            authorContains(query.author()),
                            titleContains(query.title()),
                            categoryEq(query.category()),
                            typeEq(query.type()),
                            tagEquals(query.tag())
                    )
                    .orderBy(getOrderSpecifier(query.sorter()))
                    .offset(pageable.getOffset())
                    .limit(pageable.getPageSize())
                    .fetch();
        }

        Long total = queryFactory
                .select(post.countDistinct())
                .from(post)
                .join(post.author, member)
                .leftJoin(post.postTags, postTag)
                .leftJoin(postTag.tag, tag)
                .where(
                        postNotDeleted(),
                        authorContains(query.author()),
                        titleContains(query.title()),
                        categoryEq(query.category()),
                        typeEq(query.type()),
                        tagEquals(query.tag())
                )
                .fetchOne();

        return new PageImpl<>(posts, pageable, total != null ? total : 0L);
    }

    /**
     * V3: Projection 사용 - 필요한 데이터만 select (최종 개선!! 야호!!^0^)
     */
    @Override
    public Page<PostListItemProjection> findPostsWithFiltersV3(PostListQueryDto query, Pageable pageable) {

        // 인기순일 때는 좋아요 수를 select에 포함하여 정렬
        if ("popular".equalsIgnoreCase(query.sorter())) {
            List<PostListItemProjection> posts = queryFactory
                    .select(new QPostListItemProjection(
                            post.id,
                            member.nickname,
                            profile.filePath,
                            post.title,
                            post.description,
                            post.type.stringValue(),
                            post.category.stringValue(),
                            postFile.filePath,
                            post.createdAt,
                            // 좋아요 수 서브쿼리
                            JPAExpressions
                                    .select(postLike.count())
                                    .from(postLike)
                                    .where(
                                            postLike.post.eq(post),
                                            postLike.deletedAt.isNull()
                                    ),
                            // 댓글 수 서브쿼리
                            JPAExpressions
                                    .select(reply.count())
                                    .from(reply)
                                    .where(
                                            reply.post.eq(post),
                                            reply.deletedAt.isNull()
                                    )
                    ))
                    .from(post)
                    .join(post.author, member)
                    .leftJoin(member.profile, profile)
                    .leftJoin(post.postFile, postFile)
                    .leftJoin(post.postLikes, postLike)
                    .where(
                            postNotDeleted(),
                            authorContains(query.author()),
                            titleContains(query.title()),
                            categoryEq(query.category()),
                            typeEq(query.type()),
                            tagEqualsV3(query.tag())
                    )
                    .groupBy(post.id, member.nickname, profile.filePath, post.title,
                            post.description, post.type, post.category, postFile.filePath, post.createdAt)
                    .orderBy(postLike.count().desc(), post.createdAt.desc())
                    .offset(pageable.getOffset())
                    .limit(pageable.getPageSize())
                    .fetch();

            Long total = getTotalCount(query);
            return new PageImpl<>(posts, pageable, total != null ? total : 0L);
        }

        // 최신순, 오래된순
        List<PostListItemProjection> posts = queryFactory
                .select(new QPostListItemProjection(
                        post.id,
                        member.nickname,
                        profile.filePath,
                        post.title,
                        post.description,
                        post.type.stringValue(),
                        post.category.stringValue(),
                        postFile.filePath,
                        post.createdAt,
                        // 좋아요 수 서브쿼리
                        JPAExpressions
                                .select(postLike.count())
                                .from(postLike)
                                .where(
                                        postLike.post.eq(post),
                                        postLike.deletedAt.isNull()
                                ),
                        // 댓글 수 서브쿼리
                        JPAExpressions
                                .select(reply.count())
                                .from(reply)
                                .where(
                                        reply.post.eq(post),
                                        reply.deletedAt.isNull()
                                )
                ))
                .from(post)
                .join(post.author, member)
                .leftJoin(member.profile, profile)
                .leftJoin(post.postFile, postFile)
                .where(
                        postNotDeleted(),
                        authorContains(query.author()),
                        titleContains(query.title()),
                        categoryEq(query.category()),
                        typeEq(query.type()),
                        tagEqualsV3(query.tag())
                )
                .orderBy(getOrderSpecifierV3Simple(query.sorter()))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long total = getTotalCount(query);
        return new PageImpl<>(posts, pageable, total != null ? total : 0L);
    }

    /**
     * V3용 태그 검색 조건 (서브쿼리 사용)
     */
    private BooleanExpression tagEqualsV3(String tagName) {
        if (tagName == null || tagName.isBlank()) {
            return null;
        }

        return post.id.in(
                JPAExpressions
                        .select(postTag.post.id)
                        .from(postTag)
                        .join(postTag.tag, tag)
                        .where(
                                tag.name.equalsIgnoreCase(tagName),
                                postTag.deletedAt.isNull()
                        )
        );
    }

    /**
     * V3용 간단한 정렬 (인기순 제외)
     */
    private OrderSpecifier<?> getOrderSpecifierV3Simple(String sorter) {
        if ("oldest".equalsIgnoreCase(sorter)) {
            return post.createdAt.asc();
        }

        return post.createdAt.desc();
    }

    /**
     * 전체 개수 조회
     */
    private Long getTotalCount(PostListQueryDto query) {
        return queryFactory
                .select(post.countDistinct())
                .from(post)
                .join(post.author, member)
                .leftJoin(post.postTags, postTag)
                .leftJoin(postTag.tag, tag)
                .where(
                        postNotDeleted(),
                        authorContains(query.author()),
                        titleContains(query.title()),
                        categoryEq(query.category()),
                        typeEq(query.type()),
                        tagEquals(query.tag())
                )
                .fetchOne();
    }

    /**
     * 게시글 삭제되지 않음 조건
     */
    private BooleanExpression postNotDeleted() {
        return post.deletedAt.isNull();
    }

    /**
     * 작성자 닉네임 검색 조건 (대소문자 무시)
     */
    private BooleanExpression authorContains(String author) {
        return author != null && !author.isBlank() ?
                post.author.nickname.equalsIgnoreCase(author) : null;
    }

    /**
     * 제목 검색 조건 (대소문자 무시)
     */
    private BooleanExpression titleContains(String title) {
        return title != null && !title.isBlank() ?
                post.title.containsIgnoreCase(title) : null;
    }

    /**
     * 카테고리 검색 조건
     */
    private BooleanExpression categoryEq(Integer category) {
        return category != null ?
                post.category.eq(PostCategory.valueOf(category)) : null;
    }

    /**
     * 프롬프트 타입 검색 조건
     */
    private BooleanExpression typeEq(Integer type) {
        return type != null ?
                post.type.eq(PromptType.valueOf(type)) : null;
    }

    /**
     * 태그 검색 조건 (대소문자 무시)
     */
    private BooleanExpression tagEquals(String tagName) {
        return tagName != null && !tagName.isBlank() ?
                tag.name.equalsIgnoreCase(tagName) : null;
    }

    /**
     * 정렬 조건
     * - latest: 최신순 (게시글 생성일 기준 내림차순) - 기본값
     * - oldest: 오래된순 (게시글 생성일 기준 오름차순)
     * - popular: 인기순 (좋아요 수 기준 내림차순, 동일 시 최신순)
     */
    @Deprecated
    private OrderSpecifier<?> getOrderSpecifier(String sorter) {
        if ("popular".equalsIgnoreCase(sorter)) {
            // 인기순
            return postLike.count().desc();
        } else if ("oldest".equalsIgnoreCase(sorter)) {
            // 오래된순
            return post.createdAt.asc();
        }

        // 기본은 ~ 최신순
        return post.createdAt.desc();
    }

    /**
     * 게시글 ID 목록으로 태그 배치 조회 (목록 조회 최적화를 위해 추가했음..)
     */
    public List<PostTag> findPostTagsByPostIds(List<Long> postIds) {
        return queryFactory
                .selectFrom(postTag)
                .join(postTag.tag, tag).fetchJoin()
                .where(
                        postTag.post.id.in(postIds),
                        postTag.deletedAt.isNull()
                )
                .fetch();
    }
}