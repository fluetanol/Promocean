package com.ssafy.a208.domain.scrap.repository;

import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.scrap.dto.ScrapPostProjection;
import com.ssafy.a208.domain.scrap.dto.ScrapQueryDto;
import com.ssafy.a208.domain.tag.entity.PostTag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * 스크랩 Repository Custom 인터페이스
 * QueryDSL을 사용한 동적 쿼리 메서드 정의
 */
public interface ScrapRepositoryCustom {

    Page<ScrapPostProjection> findScrapsByMemberWithFilters(Member member, ScrapQueryDto query, Pageable pageable);

    List<PostTag> findPostTagsByPostIds(List<Long> postIds);
}