package com.ssafy.a208.domain.space.repository;

import com.ssafy.a208.domain.space.entity.Folder;
import java.util.List;
import com.ssafy.a208.domain.space.entity.Space;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FolderRepository extends JpaRepository<Folder, Long> {

    Optional<Folder> findByIdAndDeletedAtIsNull(Long id);
    List<Folder> findBySpaceIdAndDeletedAtIsNull(Long spaceId);
    boolean existsBySpaceAndNameAndDeletedAtIsNull(Space space, String name);

}
