package com.ssafy.a208.domain.board.service;

import com.ssafy.a208.domain.board.document.PostDocument;
import com.ssafy.a208.domain.board.entity.Post;
import com.ssafy.a208.domain.board.reader.PostReader;
import com.ssafy.a208.domain.board.reader.ReplyReader;
import com.ssafy.a208.domain.board.repository.PostElasticsearchRepository;
import com.ssafy.a208.domain.tag.entity.PostTag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * ElasticSearch 동기화 서비스
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class PostIndexService {

    private final PostElasticsearchRepository postElasticsearchRepository;
    private final PostReader postReader;
    private final ReplyReader replyReader;

    /**
     * 게시글을 ES에 인덱싱
     */
    public void indexPost(Post post, String filePath, List<String> tags) {
        try {
            // 좋아요 수 계산
            int likeCount = (int) post.getPostLikes().stream()
                    .filter(like -> like.getDeletedAt() == null)
                    .count();

            // 댓글 수 계산
            int replyCount = replyReader.getRepliesByPost(post).size();

            // 프로필 경로
            String profilePath = null;
            if (post.getAuthor().getProfile() != null) {
                profilePath = post.getAuthor().getProfile().getFilePath();
            }

            PostDocument document = PostDocument.builder()
                    .id(post.getId())
                    .title(post.getTitle())
                    .description(post.getDescription())
                    .authorNickname(post.getAuthor().getNickname())
                    .category(post.getCategory().getName())
                    .type(post.getType().getName())
                    .tags(tags)
                    .createdAt(post.getCreatedAt())
                    .likeCount(likeCount)
                    .replyCount(replyCount)
                    .popularityScore(PostDocument.calculatePopularityScore(likeCount, replyCount))
                    .profilePath(profilePath)
                    .filePath(filePath)
                    .build();

            postElasticsearchRepository.save(document);
            log.info("게시글 ES 인덱싱 완료 - postId: {}", post.getId());
        } catch (Exception e) {
            log.error("게시글 ES 인덱싱 실패 - postId: {}, error: {}", post.getId(), e.getMessage(), e);
        }
    }

    /**
     * 게시글을 ES에서 삭제
     */
    public void deletePost(Long postId) {
        try {
            postElasticsearchRepository.deleteById(postId);
            log.info("게시글 ES 삭제 완료 - postId: {}", postId);
        } catch (Exception e) {
            log.error("게시글 ES 삭제 실패 - postId: {}, error: {}", postId, e.getMessage(), e);
        }
    }

    /**
     * 좋아요/댓글 수 업데이트
     */
    public void updatePostCounts(Long postId, Integer likeCount, Integer replyCount) {
        try {
            postElasticsearchRepository.findById(postId).ifPresent(document -> {
                PostDocument updated = PostDocument.builder()
                        .id(document.getId())
                        .title(document.getTitle())
                        .description(document.getDescription())
                        .authorNickname(document.getAuthorNickname())
                        .category(document.getCategory())
                        .type(document.getType())
                        .tags(document.getTags())
                        .createdAt(document.getCreatedAt())
                        .likeCount(likeCount)
                        .replyCount(replyCount)
                        .popularityScore(PostDocument.calculatePopularityScore(likeCount, replyCount))
                        .profilePath(document.getProfilePath())
                        .filePath(document.getFilePath())
                        .build();

                postElasticsearchRepository.save(updated);
                log.info("게시글 카운트 업데이트 완료 - postId: {}, likeCount: {}, replyCount: {}",
                        postId, likeCount, replyCount);
            });
        } catch (Exception e) {
            log.error("게시글 카운트 업데이트 실패 - postId: {}, error: {}", postId, e.getMessage(), e);
        }
    }
}