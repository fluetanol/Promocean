package com.ssafy.a208.domain.board.repository;

import com.ssafy.a208.domain.board.entity.Post;
import com.ssafy.a208.domain.board.entity.PostLike;
import com.ssafy.a208.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostLikeRepository extends JpaRepository<PostLike, Long> {
    /** 특정 게시글과 멤버 조합으로 좋아요 존재 여부 조회 */
    Optional<PostLike> findByPostAndMemberAndDeletedAtIsNull(Post post, Member member);

    List<PostLike> findByPostAndDeletedAtIsNull(Post post);

    boolean existsByPostIdAndMemberAndDeletedAtIsNull(Long postId, Member member);

    long countByPostAndDeletedAtIsNull(Post post);
}
