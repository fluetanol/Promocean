package com.ssafy.a208.domain.space.reader;

import com.ssafy.a208.domain.space.entity.Space;
import com.ssafy.a208.domain.space.exception.space.CannotDeletePersonalSpaceException;
import com.ssafy.a208.domain.space.exception.space.SpaceNotFoundException;
import com.ssafy.a208.domain.space.repository.SpaceRepository;
import com.ssafy.a208.global.common.enums.SpaceType;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SpaceReader {

    private final SpaceRepository spaceRepository;

    public Space getSpaceById(Long spaceId) {
        return spaceRepository.findByIdAndDeletedAtIsNull(spaceId)
                .orElseThrow(SpaceNotFoundException::new);
    }

    public List<Space> getTeamSpaces(List<Long> spaceIds) {
        if (Objects.isNull(spaceIds) || spaceIds.isEmpty()) {
            return Collections.emptyList();
        }
        return spaceRepository.findAllByIdInAndTypeAndDeletedAtIsNull(spaceIds, SpaceType.TEAM);
    }
}