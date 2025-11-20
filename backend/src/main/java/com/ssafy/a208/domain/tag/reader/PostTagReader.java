package com.ssafy.a208.domain.tag.reader;

import com.ssafy.a208.domain.tag.entity.PostTag;
import com.ssafy.a208.domain.tag.repository.PostTagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class PostTagReader {

    private final PostTagRepository postTagRepository;

    /**
     * 게시글의 모든 활성 태그를 조회합니다.
     */
    public List<PostTag> getPostTags(Long postId) {
        return postTagRepository.findAllByPostIdAndDeletedAtIsNull(postId);
    }

    /**
     * 게시글과 태그로 매핑 정보를 조회합니다.
     */
    public Optional<PostTag> getPostTag(Long postId, Long tagId) {
        return postTagRepository.findByPostIdAndTagId(postId, tagId);
    }
}