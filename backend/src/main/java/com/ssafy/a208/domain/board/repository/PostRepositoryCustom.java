package com.ssafy.a208.domain.board.repository;

import com.ssafy.a208.domain.board.dto.PostDetailProjection;
import com.ssafy.a208.domain.board.dto.PostListItemProjection;
import com.ssafy.a208.domain.board.dto.PostListQueryDto;
import com.ssafy.a208.domain.board.dto.ReplyProjection;
import com.ssafy.a208.domain.board.entity.Post;
import com.ssafy.a208.domain.board.entity.Reply;
import com.ssafy.a208.domain.tag.entity.PostTag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * 게시글 Repository Custom 인터페이스
 * QueryDSL을 사용한 동적 쿼리 메서드 정의
 */
public interface PostRepositoryCustom {
    /** @deprecated V3로 대체됨 */
    @Deprecated
    Page<Post> findPostsWithFiltersV1(PostListQueryDto query, Pageable pageable);

    /** @deprecated V3로 대체됨 */
    @Deprecated
    Page<Post> findPostsWithFiltersV2(PostListQueryDto query, Pageable pageable);


    Page<PostListItemProjection> findPostsWithFiltersV3(PostListQueryDto query, Pageable pageable);

    List<PostTag> findPostTagsByPostIds(List<Long> postIds);

    Optional<PostDetailProjection> findPostDetailById(Long postId);

    List<ReplyProjection> findRepliesByPostId(Long postId);
}