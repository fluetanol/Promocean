package com.ssafy.a208.domain.board.service;

import com.ssafy.a208.domain.board.dto.PostCommentEvent;
import com.ssafy.a208.domain.board.dto.PostLikeEvent;
import com.ssafy.a208.domain.board.entity.Post;
import com.ssafy.a208.domain.board.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
@Slf4j
public class TrendingPostConsumerService {

    private final RedisTemplate<String, String> redisTemplate;
    private final PostRepository postRepository;

    private static final String TRENDING_KEY = "trending:posts";
    private static final String LIKE_COUNT_KEY = "post:%d:likes";
    private static final String COMMENT_COUNT_KEY = "post:%d:comments";

    /**
     * 좋아요 이벤트 소비
     */
    @KafkaListener(
            topics = "post-likes",
            groupId = "trending-post-group",
            containerFactory = "postLikeKafkaListenerContainerFactory"
    )
    public void consumeLikeEvent(PostLikeEvent event, Acknowledgment ack) {
        try {
            String likeKey = String.format(LIKE_COUNT_KEY, event.getPostId());

            // 좋아요 증가
            redisTemplate.opsForValue().increment(likeKey);
            log.debug("좋아요 증가 - postId: {}", event.getPostId());

            // 인기도 점수 업데이트
            updateTrendingScore(event.getPostId());

            // 수동 커밋
            ack.acknowledge();

        } catch (Exception e) {
            log.error("Failed to process like event - postId: {}", event.getPostId(), e);
        }
    }

    /**
     * 댓글 이벤트 소비
     */
    @KafkaListener(
            topics = "post-comments",
            groupId = "trending-post-group",
            containerFactory = "postCommentKafkaListenerContainerFactory"
    )
    public void consumeCommentEvent(PostCommentEvent event, Acknowledgment ack) {
        try {
            String commentKey = String.format(COMMENT_COUNT_KEY, event.getPostId());

            if (event.getAction() == PostCommentEvent.CommentAction.CREATE) {
                redisTemplate.opsForValue().increment(commentKey);
                log.debug("댓글 증가 - postId: {}", event.getPostId());
            } else if (event.getAction() == PostCommentEvent.CommentAction.DELETE) {
                redisTemplate.opsForValue().decrement(commentKey);
                log.debug("댓글 감소 - postId: {}", event.getPostId());
            }

            // 인기도 점수 업데이트
            updateTrendingScore(event.getPostId());

            // 수동 커밋
            ack.acknowledge();

        } catch (Exception e) {
            log.error("댓글 event 처리 실패 - postId: {}", event.getPostId(), e);
        }
    }

    /**
     * 인기도 점수 업데이트
     */
    private void updateTrendingScore(Long postId) {
        try {
            String likeKey = String.format(LIKE_COUNT_KEY, postId);
            String commentKey = String.format(COMMENT_COUNT_KEY, postId);

            Long likeCount = getLongValue(redisTemplate.opsForValue().get(likeKey));
            Long commentCount = getLongValue(redisTemplate.opsForValue().get(commentKey));

            // DB에서 게시글 조회
            Post post = postRepository.findById(postId).orElse(null);
            if (post == null || post.getDeletedAt() != null) {
                log.warn("Post not found or deleted - postId: {}", postId);
                return;
            }

            // 인기도 점수 계산
            double score = calculateTrendingScore(likeCount, commentCount, post.getCreatedAt());

            // Redis Sorted Set에 저장
            redisTemplate.opsForZSet().add(TRENDING_KEY, postId.toString(), score);

            log.debug("인기도 점수 업데이트 - postId: {}, score: {}", postId, score);

        } catch (Exception e) {
            log.error("인기도 점수 업데이트 실패 - postId: {}", postId, e);
        }
    }

    /**
     * 인기도 점수 계산
     *
     * 점수 = (좋아요 * 2 + 댓글 * 3) * 시간가중치
     *
     * 시간 가중치:
     * - 1시간 이내: 1.5배
     * - 24시간 이내: 1.3배
     * - 7일 이내: 1.0배
     * - 7일 이후: 0.5배
     */
    private double calculateTrendingScore(Long likeCount, Long commentCount, LocalDateTime createdAt) {
        // 기본 점수 (좋아요 가중치 3, 댓글 가중치 1)
        double baseScore = (likeCount * 3.0) + commentCount;

        // 시간 가중치
        long hoursAgo = ChronoUnit.HOURS.between(createdAt, LocalDateTime.now());

        double timeWeight;
        if (hoursAgo < 1) {
            timeWeight = 1.5;  // 1시간 이내 - 최신글 우대
        } else if (hoursAgo < 24) {
            timeWeight = 1.3;  // 24시간 이내
        } else if (hoursAgo < 168) {  // 7일
            timeWeight = 1.0;  // 일주일 이내
        } else {
            timeWeight = 0.5;  // 오래된 글 페널티
        }

        return baseScore * timeWeight;
    }

    /**
     * Redis 값을 Long으로 변환
     */
    private Long getLongValue(String value) {
        return value != null ? Long.parseLong(value) : 0L;
    }
}