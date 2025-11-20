package com.ssafy.a208.domain.scrap.reader;

import com.ssafy.a208.domain.board.entity.Post;
import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.scrap.dto.ScrapPostProjection;
import com.ssafy.a208.domain.scrap.dto.ScrapQueryDto;
import com.ssafy.a208.domain.scrap.entity.Scrap;
import com.ssafy.a208.domain.scrap.exception.ScrapNotFoundException;
import com.ssafy.a208.domain.scrap.repository.ScrapRepository;
import com.ssafy.a208.domain.tag.entity.PostTag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

/**
 * 스크랩 조회 전용 Reader 클래스.
 * - 삭제되지 않은 스크랩만 조회합니다.
 */
@Component
@RequiredArgsConstructor
public class ScrapReader {

    private final ScrapRepository scrapRepository;

    /**
     * 특정 게시글과 멤버의 스크랩 조회 (삭제된 것 포함)
     *
     * @param post 게시글 엔티티
     * @param member 멤버 엔티티
     * @return Scrap (Optional)
     */
    public Optional<Scrap> getScrapByPostAndMemberIncludeDeleted(Post post, Member member) {
        return scrapRepository.findByPostAndMember(post, member);
    }

    /**
     * 특정 게시글과 멤버의 스크랩 조회 (삭제되지 않은 것만)
     *
     * @param post 게시글 엔티티
     * @param member 멤버 엔티티
     * @return Scrap 엔티티
     * @throws ScrapNotFoundException 존재하지 않거나 삭제된 경우
     */
    public Scrap getScrapByPostAndMemberOrThrow(Post post, Member member) {
        return scrapRepository.findByPostAndMemberAndDeletedAtIsNull(post, member)
                .orElseThrow(ScrapNotFoundException::new);
    }

    /**
     * 특정 게시글의 모든 스크랩 조회 (삭제되지 않은 것만)
     *
     * @param post 게시글 엔티티
     * @return 스크랩 리스트
     */
    public List<Scrap> getScrapsByPost(Post post) {
        return scrapRepository.findByPostAndDeletedAtIsNull(post);
    }

    /**
     * 회원의 스크랩 목록을 Projection 기반으로 조회합니다.
     *
     * @param member   조회 대상 회원
     * @param query    검색 조건 DTO
     * @param pageable 페이징 정보
     * @return 스크랩 Projection 페이지
     */
    public Page<ScrapPostProjection> getScrapsByMemberWithFilters(Member member, ScrapQueryDto query, Pageable pageable) {
        return scrapRepository.findScrapsByMemberWithFilters(member, query, pageable);
    }

    /**
     * 여러 게시글의 태그를 배치로 조회합니다.
     *
     * @param postIds 게시글 ID 목록
     * @return 게시글별 태그 목록
     */
    public List<PostTag> getPostTagsByPostIds(List<Long> postIds) {
        return scrapRepository.findPostTagsByPostIds(postIds);
    }

}