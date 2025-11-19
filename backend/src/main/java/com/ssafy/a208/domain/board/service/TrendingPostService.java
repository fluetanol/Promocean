package com.ssafy.a208.domain.board.service;

import com.ssafy.a208.domain.board.dto.TrendingPostItemDto;
import com.ssafy.a208.domain.board.dto.TrendingPostRes;
import com.ssafy.a208.domain.board.entity.Post;
import com.ssafy.a208.domain.board.repository.PostRepository;
import com.ssafy.a208.global.image.service.S3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class TrendingPostService {

    private final RedisTemplate<String, String> redisTemplate;
    private final PostRepository postRepository;
    private final S3Service s3Service;

    private static final String TRENDING_KEY = "trending:posts";
    private static final String LIKE_COUNT_KEY = "post:%d:likes";
    private static final String COMMENT_COUNT_KEY = "post:%d:comments";

    /**
     * 실시간 인기글 조회
     *
     * @param limit 조회할 게시글 개수 (최대 20개)
     * @return 인기글 목록
     */
    @Transactional(readOnly = true)
    public TrendingPostRes getTrendingPosts(int limit) {
        // Redis Sorted Set에서 상위 N개 조회 (점수 높은 순)
        Set<ZSetOperations.TypedTuple<String>> topPosts =
                redisTemplate.opsForZSet().reverseRangeWithScores(TRENDING_KEY, 0, limit - 1);

        if (topPosts == null || topPosts.isEmpty()) {
            log.info("실시간 인기글 없음");
            return TrendingPostRes.builder()
                    .posts(List.of())
                    .itemCnt(0)
                    .build();
        }

        List<TrendingPostItemDto> posts = new ArrayList<>();

        for (ZSetOperations.TypedTuple<String> tuple : topPosts) {
            try {
                Long postId = Long.parseLong(tuple.getValue());

                // DB에서 게시글 상세 정보 조회
                Post post = postRepository.findById(postId).orElse(null);
                if (post == null || post.getDeletedAt() != null) {
                    log.debug("게시글 없음 또는 삭제됨 - postId: {}", postId);
                    continue;
                }

                // 썸네일 URL 생성
                String fileUrl = null;
                if (post.getPostFile() != null) {
                    fileUrl = s3Service.getCloudFrontUrl(post.getPostFile().getFilePath());
                }

                // 태그 리스트 생성
                List<String> tags = post.getPostTags().stream()
                        .filter(pt -> pt.getDeletedAt() == null)
                        .map(pt -> pt.getTag().getName())
                        .toList();

                // Redis에서 실시간 카운트 조회
                Long likeCount = getLongValue(
                        redisTemplate.opsForValue().get(String.format(LIKE_COUNT_KEY, postId))
                );
                Long commentCount = getLongValue(
                        redisTemplate.opsForValue().get(String.format(COMMENT_COUNT_KEY, postId))
                );

                // DTO 생성
                TrendingPostItemDto dto = TrendingPostItemDto.builder()
                        .postId(postId)
                        .title(post.getTitle())
                        .tags(tags)
                        .likeCnt(likeCount.intValue())
                        .replyCnt(commentCount.intValue())
                        .fileUrl(fileUrl)
                        .build();

                posts.add(dto);

            } catch (Exception e) {
                log.error("인기글 아이템 생성 실패 - postId: {}", tuple.getValue(), e);
            }
        }

        log.info("실시간 인기글 조회 완료 - count: {}", posts.size());

        return TrendingPostRes.builder()
                .posts(posts)
                .itemCnt(posts.size())
                .build();
    }

    /**
     * Redis 값을 Long으로 변환
     */
    private Long getLongValue(String value) {
        return value != null ? Long.parseLong(value) : 0L;
    }
}