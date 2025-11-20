package com.ssafy.a208.domain.tag.reader;

import com.ssafy.a208.domain.tag.entity.Tag;
import com.ssafy.a208.domain.tag.repository.TagRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TagReader {

    private final TagRepository tagRepository;

    public Optional<Tag> getTagByName(String name) {
        return tagRepository.findByName(name);
    }
}