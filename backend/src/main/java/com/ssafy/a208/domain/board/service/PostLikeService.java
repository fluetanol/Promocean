package com.ssafy.a208.domain.board.service;

import com.ssafy.a208.domain.board.entity.Post;
import com.ssafy.a208.domain.board.entity.PostLike;
import com.ssafy.a208.domain.board.exception.PostLikeAlreadyExistsException;
import com.ssafy.a208.domain.board.reader.PostLikeReader;
import com.ssafy.a208.domain.board.reader.PostReader;
import com.ssafy.a208.domain.board.reader.ReplyReader;
import com.ssafy.a208.domain.board.repository.PostLikeRepository;
import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.member.reader.MemberReader;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PostLikeService {

    private final PostReader postReader;
    private final PostLikeReader postLikeReader;
    private final MemberReader memberReader;
    private final ReplyReader replyReader;
    private final PostLikeRepository postLikeRepository;
    private final PostIndexService postIndexService;

    /**
     * 게시글 좋아요 생성
     *
     * @param userDetails 인증된 사용자 정보
     * @param postId 게시글 ID
     */
    @Transactional
    public void createPostLike(CustomUserDetails userDetails, Long postId) {
        // 게시글 조회 (삭제되지 않은 게시글만)
        Post post = postReader.getPostById(postId);

        // 멤버 조회
        Member member = memberReader.getMemberById(userDetails.memberId());

        // 이미 좋아요를 눌렀는지 확인
        postLikeReader.getPostLikeByPostAndMember(post, member)
                .ifPresent(existing -> {
                    throw new PostLikeAlreadyExistsException();
                });

        // 좋아요 저장
        PostLike postLike = PostLike.builder()
                .post(post)
                .member(member)
                .build();

        postLikeRepository.save(postLike);

        //es 업데이트
        int likeCount = postLikeReader.countByPost(post);
        int replyCount = replyReader.getRepliesByPost(post).size();
        postIndexService.updatePostCounts(postId, likeCount, replyCount);

        log.info("게시글 좋아요 완료 - postId: {}, memberId: {}", postId, member.getId());
    }

    /**
     * 게시글 삭제 시 연결된 좋아요 soft delete
     */
    @Transactional
    public void deleteLikesByPost(Post post) {
        List<PostLike> postLikes = postLikeReader.getPostLikesByPost(post);
        postLikes.forEach(PostLike::deletePostLike);
        log.info("게시글 연결 좋아요 soft delete 완료 - postId: {}", post.getId());
    }
}