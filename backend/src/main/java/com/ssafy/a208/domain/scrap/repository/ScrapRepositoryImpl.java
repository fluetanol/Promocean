package com.ssafy.a208.domain.scrap.repository;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.scrap.dto.QScrapPostProjection;
import com.ssafy.a208.domain.scrap.dto.ScrapPostProjection;
import com.ssafy.a208.domain.scrap.dto.ScrapQueryDto;
import com.ssafy.a208.domain.scrap.entity.Scrap;
import com.ssafy.a208.domain.tag.entity.PostTag;
import com.ssafy.a208.global.common.enums.PostCategory;
import com.ssafy.a208.global.common.enums.PromptType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.a208.domain.board.entity.QPost.post;
import static com.ssafy.a208.domain.board.entity.QPostFile.postFile;
import static com.ssafy.a208.domain.member.entity.QMember.member;
import static com.ssafy.a208.domain.member.entity.QProfile.profile;
import static com.ssafy.a208.domain.scrap.entity.QScrap.scrap;
import static com.ssafy.a208.domain.tag.entity.QPostTag.postTag;
import static com.ssafy.a208.domain.tag.entity.QTag.tag;

/**
 * 스크랩 Repository Custom 구현체
 * QueryDSL을 사용한 동적 쿼리 구현
 */
@Repository
@RequiredArgsConstructor
public class ScrapRepositoryImpl implements ScrapRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<ScrapPostProjection> findScrapsByMemberWithFilters(Member memberEntity, ScrapQueryDto query, Pageable pageable) {

        // Projection 기반으로 필요한 컬럼만 select
        List<ScrapPostProjection> scraps = queryFactory
                .select(new QScrapPostProjection(
                        post.id,
                        post.author.nickname,
                        profile.filePath,
                        post.title,
                        post.type,
                        post.category,
                        postFile.filePath,
                        scrap.createdAt,
                        post.deletedAt.isNotNull()
                ))
                .from(scrap)
                .join(scrap.post, post)
                .join(post.author, member)
                .leftJoin(member.profile, profile)
                .leftJoin(post.postFile, postFile)
                .where(
                        scrapMemberEq(memberEntity),
                        scrapNotDeleted(),
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

        // 전체 개수 조회
        Long total = queryFactory
                .select(scrap.countDistinct())
                .from(scrap)
                .join(scrap.post, post)
                .where(
                        scrapMemberEq(memberEntity),
                        scrapNotDeleted()
                )
                .fetchOne();

        return new PageImpl<>(scraps, pageable, total != null ? total : 0L);
    }

    /**
     * 스크랩 소유자 조건
     */
    private BooleanExpression scrapMemberEq(Member memberEntity) {
        return scrap.member.eq(memberEntity);
    }

    /**
     * 스크랩 삭제되지 않음 조건
     */
    private BooleanExpression scrapNotDeleted() {
        return scrap.deletedAt.isNull();
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
     * - latest: 최신순 (스크랩 생성일 기준 내림차순) 이게 기본!!!
     * - oldest: 오래된순 (스크랩 생성일 기준 오름차순)
     */
    private OrderSpecifier<?> getOrderSpecifier(String sorter) {
        if ("oldest".equals(sorter)) {
            return scrap.createdAt.asc();
        }
        return scrap.createdAt.desc();
    }

    /**
     * 태그 배치 처리..
     * */
    @Override
    public List<PostTag> findPostTagsByPostIds(List<Long> postIds) {
        if (postIds == null || postIds.isEmpty()) {
            return List.of();
        }

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