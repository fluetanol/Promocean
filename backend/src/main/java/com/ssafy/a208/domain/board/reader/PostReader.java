package com.ssafy.a208.domain.board.reader;

import com.ssafy.a208.domain.board.dto.PostDetailProjection;
import com.ssafy.a208.domain.board.dto.PostListItemProjection;
import com.ssafy.a208.domain.board.dto.PostListQueryDto;
import com.ssafy.a208.domain.board.dto.ReplyProjection;
import com.ssafy.a208.domain.board.entity.Post;
import com.ssafy.a208.domain.board.exception.PostNotFoundException;
import com.ssafy.a208.domain.board.repository.PostRepository;
import com.ssafy.a208.domain.tag.entity.PostTag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

/**
 * 게시글 조회 전용 Reader 클래스.
 * - 삭제되지 않은 게시글만 조회합니다.
 */
@Component
@RequiredArgsConstructor
public class PostReader {

    private final PostRepository postRepository;

    /**
     * 게시글 ID로 게시글 조회 (삭제되지 않은 것만)
     * @param postId 게시글 ID
     * @return Post 엔티티
     * @throws PostNotFoundException 존재하지 않거나 삭제된 경우
     */
    public Post getPostById(Long postId) {
        return postRepository.findByIdAndDeletedAtIsNull(postId)
                .orElseThrow(PostNotFoundException::new);
    }

    /**
     * 게시글 목록을 동적 조건으로 조회
     *
     * @param query 검색 조건
     * @param pageable 페이징 정보
     * @return 게시글 페이지
     */
    public Page<Post> getPostsWithFiltersV1(PostListQueryDto query, Pageable pageable) {
        return postRepository.findPostsWithFiltersV1(query, pageable);
    }

    public Page<Post> getPostsWithFiltersV2(PostListQueryDto query, Pageable pageable) {
        return postRepository.findPostsWithFiltersV2(query, pageable);
    }

    public Page<PostListItemProjection> getPostsWithFiltersV3(PostListQueryDto query, Pageable pageable) {
        return postRepository.findPostsWithFiltersV3(query, pageable);
    }

    /**
     * 게시글 ID 목록으로 태그 배치 조회 (목록 조회 최적화용)
     *
     * @param postIds 게시글 ID 목록
     * @return 게시글들의 태그 목록
     */
    public List<PostTag> getPostTagsByPostIds(List<Long> postIds) {
        return postRepository.findPostTagsByPostIds(postIds);
    }

    /**
     * 게시글 상세 조회
     *
     * @param postId 게시글 ID
     * @return 게시글 상세 Projection
     */
    public Optional<PostDetailProjection> getPostDetailById(Long postId) {
        return postRepository.findPostDetailById(postId);
    }

    /**
     * 게시글의 댓글 목록 조회
     *
     * @param postId 게시글 ID
     * @return 댓글 목록 Projection
     */
    public List<ReplyProjection> getRepliesByPostId(Long postId) {
        return postRepository.findRepliesByPostId(postId);
    }
}
