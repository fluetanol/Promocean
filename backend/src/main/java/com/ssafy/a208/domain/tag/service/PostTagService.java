package com.ssafy.a208.domain.tag.service;

import com.ssafy.a208.domain.board.entity.Post;
import com.ssafy.a208.domain.tag.entity.PostTag;
import com.ssafy.a208.domain.tag.entity.Tag;
import com.ssafy.a208.domain.tag.exception.TagLimitExceededException;
import com.ssafy.a208.domain.tag.reader.PostTagReader;
import com.ssafy.a208.domain.tag.reader.TagReader;
import com.ssafy.a208.domain.tag.repository.PostTagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * 게시글 태그 관련 서비스
 * 태그 생성, 조회, 삭제를 담당합니다.
 */
@Service
@RequiredArgsConstructor
public class PostTagService {

    private final TagReader tagReader;
    private final TagService tagService;
    private final PostTagReader postTagReader;
    private final PostTagRepository postTagRepository;
    private final TagIndexService tagIndexService;
    /**
     * 게시글에 태그를 저장합니다.
     * Tag가 이미 있다면 매핑 정보만 저장하고, 새로운 Tag라면 생성 후 매핑합니다.
     * 기존 매핑 정보가 있으면 복원(restore)합니다.
     *
     * @param tags 태그 이름 목록
     * @param post 게시글 엔티티
     */
    @Transactional
    public void createTags(List<String> tags, Post post) {
        if (tags == null || tags.isEmpty()) {
            return;
        }

        // 태그 개수 제한 검증 - 하나의 게시글 당 최대 5개까지 등록 가능
        if (tags.size() > 5) {
            throw new TagLimitExceededException();
        }

        // 기존 매핑 정보 제거 (하드 딜리트)
        this.deleteTags(post);

        for (String tagName : tags) {
            Optional<Tag> tagOptional = tagReader.getTagByName(tagName);

            tagOptional.ifPresentOrElse(
                    // 태그가 존재하는 경우
                    existing -> {
                        saveNewPostTag(existing, post);
                        // ES 동기화
                        tagIndexService.updateTagUsageCount(existing.getId());
                    },
                    // 태그를 새로 만들어야 하는 경우
                    () -> {
                        // 태그 생성
                        Tag newTag = tagService.createTag(tagName);

                        // 매핑 정보 생성
                        saveNewPostTag(newTag, post);

                        // ES 동기화 (새 태그)
                        tagIndexService.indexTag(newTag);
                    }
            );
        }
    }

    /**
     * 게시글의 모든 태그 이름을 조회합니다.
     *
     * @param post 게시글 엔티티
     * @return 태그 이름 목록
     */
    @Transactional(readOnly = true)
    public List<String> getTags(Post post) {
        List<PostTag> postTags = postTagReader.getPostTags(post.getId());

        List<String> tags = new ArrayList<>();
        for (PostTag postTag : postTags) {
            tags.add(postTag.getTag().getName());
        }

        return tags;
    }

    /**
     * 게시글의 모든 태그를 소프트 딜리트합니다.
     *
     * @param post 게시글 엔티티
     */
    @Transactional
    public void deleteTags(Post post) {
        List<PostTag> postTags = postTagReader.getPostTags(post.getId());

        for (PostTag postTag : postTags) {
            // 하드 딜리트로 수정함~
            postTagRepository.delete(postTag);
            tagIndexService.updateTagUsageCount(postTag.getTag().getId());
        }
    }

    /**
     * 새 PostTag 저장
     */
    private void saveNewPostTag(Tag tag, Post post) {
        postTagRepository.save(
                PostTag.builder()
                        .tag(tag)
                        .post(post)
                        .build()
        );
    }
}