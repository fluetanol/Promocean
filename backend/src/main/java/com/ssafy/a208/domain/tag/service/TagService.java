package com.ssafy.a208.domain.tag.service;

import com.ssafy.a208.domain.tag.entity.Tag;
import com.ssafy.a208.domain.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TagService {

    private final TagRepository tagRepository;

    @Transactional
    public Tag createTag(String name) {
        Tag tag = Tag.builder()
                .name(name)
                .build();
        tagRepository.save(tag);
        return tag;
    }
}
