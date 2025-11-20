package com.ssafy.a208.domain.space.repository;

import com.ssafy.a208.domain.space.entity.SpaceCover;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpaceCoverRepository extends JpaRepository<SpaceCover, Long> {
    Optional<SpaceCover> findBySpaceIdAndDeletedAtIsNull(Long spaceId);
}