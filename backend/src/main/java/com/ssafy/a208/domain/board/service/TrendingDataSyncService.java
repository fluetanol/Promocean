package com.ssafy.a208.domain.board.service;

import com.ssafy.a208.domain.board.entity.Post;
import com.ssafy.a208.domain.board.reader.PostLikeReader;
import com.ssafy.a208.domain.board.reader.ReplyReader;
import com.ssafy.a208.domain.board.repository.PostRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class TrendingDataSyncService {

    private final PostRepository postRepository;
    private final PostLikeReader postLikeReader;
    private final ReplyReader replyReader;
    private final RedisTemplate<String, String> redisTemplate;

    private static final String TRENDING_KEY = "trending:posts";
    private static final String LIKE_COUNT_KEY = "post:%d:likes";
    private static final String COMMENT_COUNT_KEY = "post:%d:comments";

    /**
     * 애플리케이션 시작 시 초기 동기화
     * 최근 30일 게시글의 데이터를 Redis에 동기화
     */
    @PostConstruct
    public void syncInitialData() {
        LocalDateTime since = LocalDateTime.now().minusDays(30);
        List<Post> recentPosts = postRepository.findAllByCreatedAtAfterAndDeletedAtIsNull(since);

        int syncedCount = 0;
        for (Post post : recentPosts) {
            try {
                syncPost(post);
                syncedCount++;
            } catch (Exception e) {
                log.error("게시글 동기화 실패 - postId: {}", post.getId(), e);
            }
        }

        log.info("실시간 인기글 초기 데이터 동기화 완료 - {} posts", syncedCount);
    }

    /**
     * 주기적 동기화 (매시간 정각)
     * DB와 Redis 데이터 일관성 유지
     */
    @Scheduled(cron = "0 0 * * * *")
    public void scheduledSync() {
        log.info("실시간 인기글 주기적 동기화 시작...");
        syncInitialData();
    }

    /**
     * 특정 게시글 동기화
     * DB -> Redis
     */
    private void syncPost(Post post) {
        Long postId = post.getId();

        // 좋아요 수 동기화
        int likeCount = postLikeReader.countByPost(post);
        redisTemplate.opsForValue().set(
                String.format(LIKE_COUNT_KEY, postId),
                String.valueOf(likeCount)
        );

        // 댓글 수 동기화
        int commentCount = replyReader.getRepliesByPost(post).size();
        redisTemplate.opsForValue().set(
                String.format(COMMENT_COUNT_KEY, postId),
                String.valueOf(commentCount)
        );

        // 인기도 점수 계산 및 Sorted Set 저장
        double score = calculateTrendingScore(likeCount, commentCount, post.getCreatedAt());
        redisTemplate.opsForZSet().add(TRENDING_KEY, postId.toString(), score);

        log.debug("게시글 동기화 완료 - postId: {}, likes: {}, comments: {}, score: {}",
                postId, likeCount, commentCount, score);
    }

    /**
     * 인기도 점수 계산
     * Consumer와 동일한 로직
     */
    private double calculateTrendingScore(int likeCount, int commentCount, LocalDateTime createdAt) {
        // 기본 점수 (좋아요 가중치 3, 댓글 가중치 1)
        double baseScore = (likeCount * 3.0) + commentCount;

        // 시간 가중치
        long hoursAgo = ChronoUnit.HOURS.between(createdAt, LocalDateTime.now());

        double timeWeight;
        if (hoursAgo < 1) {
            timeWeight = 1.5;  // 1시간 이내
        } else if (hoursAgo < 24) {
            timeWeight = 1.3;  // 24시간 이내
        } else if (hoursAgo < 168) {  // 7일
            timeWeight = 1.0;  // 일주일 이내
        } else {
            timeWeight = 0.5;  // 오래된 글 페널티
        }

        return baseScore * timeWeight;
    }
}