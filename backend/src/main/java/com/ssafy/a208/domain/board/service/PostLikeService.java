package com.ssafy.a208.domain.board.service;

import com.ssafy.a208.domain.board.dto.PostLikeEvent;
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
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

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

    private final KafkaTemplate<String, PostLikeEvent> postLikeKafkaTemplate;
    private final RedisTemplate<String, String> redisTemplate;

    private static final String TOPIC = "post-likes";
    private static final String TRENDING_KEY = "trending:posts";
    private static final String LIKE_COUNT_KEY = "post:%d:likes";

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

        // Kafka 이벤트 발행 추가 (Redis용)
        publishLikeEvent(post.getId(), member.getId());
        
        log.info("게시글 좋아요 완료 - postId: {}, memberId: {}", postId, member.getId());
    }

    /**
     * 게시글 삭제 시 연결된 좋아요 soft delete
     */
    @Transactional
    public void deleteLikesByPost(Post post) {
        List<PostLike> postLikes = postLikeReader.getPostLikesByPost(post);
        postLikes.forEach(PostLike::deletePostLike);

        Long postId = post.getId();
        // 인기글 목록에서 제거
        redisTemplate.opsForZSet().remove(TRENDING_KEY, postId.toString());

        // 좋아요 카운트 삭제
        redisTemplate.delete(String.format(LIKE_COUNT_KEY, postId));

        log.info("게시글 연결 좋아요 soft delete 완료 - postId: {}", post.getId());
    }
    /**
     * Kafka 이벤트 발행
     */
    private void publishLikeEvent(Long postId, Long userId) {
        PostLikeEvent event = PostLikeEvent.builder()
                .eventId(UUID.randomUUID().toString())
                .postId(postId)
                .userId(userId)
                .timestamp(LocalDateTime.now())
                .build();

        postLikeKafkaTemplate.send(TOPIC, postId.toString(), event)
                .whenComplete((result, ex) -> {
                    if (ex != null) {
                        log.error("event를 보내는 것을 실패하였습니다.: postId={}", postId, ex);
                    } else {
                        log.debug("좋아요 event가 보내졌습니다.: postId={}", postId);
                    }
                });
    }
}