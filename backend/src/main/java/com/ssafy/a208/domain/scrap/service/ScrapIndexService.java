package com.ssafy.a208.domain.scrap.service;

import com.ssafy.a208.domain.board.entity.Post;
import com.ssafy.a208.domain.board.reader.PostReader;
import com.ssafy.a208.domain.scrap.document.ScrapDocument;
import com.ssafy.a208.domain.scrap.entity.Scrap;
import com.ssafy.a208.domain.scrap.repository.ScrapElasticsearchRepository;
import com.ssafy.a208.domain.tag.entity.PostTag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 스크랩 ElasticSearch 동기화 서비스
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ScrapIndexService {

    private final ScrapElasticsearchRepository scrapElasticsearchRepository;
    private final PostReader postReader;

    /**
     * 스크랩을 ES에 인덱싱
     */
    public void indexScrap(Scrap scrap) {
        try {
            Post post = scrap.getPost();

            // 태그 목록 조회
            List<PostTag> postTags = postReader.getPostTagsByPostIds(List.of(post.getId()));
            List<String> tags = postTags.stream()
                    .map(pt -> pt.getTag().getName())
                    .toList();

            // 프로필 경로
            String profilePath = null;
            if (post.getAuthor().getProfile() != null) {
                profilePath = post.getAuthor().getProfile().getFilePath();
            }

            // 파일 경로
            String filePath = null;
            if (post.getPostFile() != null) {
                filePath = post.getPostFile().getFilePath();
            }

            ScrapDocument document = ScrapDocument.builder()
                    .id(scrap.getMember().getId() + "-" + post.getId())
                    .scrapId(scrap.getId())
                    .memberId(scrap.getMember().getId())
                    .postId(post.getId())
                    .title(post.getTitle())
                    .authorNickname(post.getAuthor().getNickname())
                    .category(post.getCategory().getName())
                    .type(post.getType().getName())
                    .tags(tags)
                    .scrapCreatedAt(scrap.getCreatedAt())
                    .isDeleted(post.getDeletedAt() != null)
                    .profilePath(profilePath)
                    .filePath(filePath)
                    .build();

            scrapElasticsearchRepository.save(document);
            log.info("스크랩 ES 인덱싱 완료 - scrapId: {}, memberId: {}, postId: {}",
                    scrap.getId(), scrap.getMember().getId(), post.getId());
        } catch (Exception e) {
            log.error("스크랩 ES 인덱싱 실패 - scrapId: {}, error: {}", scrap.getId(), e.getMessage(), e);
        }
    }

    /**
     * 스크랩을 ES에서 삭제
     */
    public void deleteScrap(Long memberId, Long postId) {
        try {
            String documentId = memberId + "-" + postId;
            scrapElasticsearchRepository.deleteById(documentId);
            log.info("스크랩 ES 삭제 완료 - memberId: {}, postId: {}", memberId, postId);
        } catch (Exception e) {
            log.error("스크랩 ES 삭제 실패 - memberId: {}, postId: {}, error: {}",
                    memberId, postId, e.getMessage(), e);
        }
    }

    /**
     * 게시글 삭제 시 모든 스크랩 삭제
     */
    public void deleteScrapsByPost(Long postId) {
        try {
            scrapElasticsearchRepository.deleteByPostId(postId);
            log.info("게시글의 모든 스크랩 ES 삭제 완료 - postId: {}", postId);
        } catch (Exception e) {
            log.error("게시글 스크랩 ES 삭제 실패 - postId: {}, error: {}", postId, e.getMessage(), e);
        }
    }
}