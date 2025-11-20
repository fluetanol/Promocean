package com.ssafy.a208.domain.space.repository;

import com.ssafy.a208.domain.space.entity.Space;
import com.ssafy.a208.global.common.enums.SpaceType;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpaceRepository extends JpaRepository<Space, Long> {

    Optional<Space> findByIdAndDeletedAtIsNull(Long id);
    List<Space> findAllByIdInAndTypeAndDeletedAtIsNull(Collection<Long> ids, SpaceType type);

}
