package com.ssafy.a208.domain.space.reader;

import com.ssafy.a208.domain.space.entity.SpaceCover;
import com.ssafy.a208.domain.space.exception.spacecover.SpaceCoverNotFoundException;
import com.ssafy.a208.domain.space.repository.SpaceCoverRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SpaceCoverReader {
    private final SpaceCoverRepository spaceCoverRepository;

    public SpaceCover getSpaceCoverBySpaceId(Long spaceId) {
        return spaceCoverRepository.findBySpaceIdAndDeletedAtIsNull(spaceId).orElseThrow(
                SpaceCoverNotFoundException::new);

    }
}
