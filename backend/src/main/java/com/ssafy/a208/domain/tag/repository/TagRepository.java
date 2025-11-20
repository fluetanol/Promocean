package com.ssafy.a208.domain.tag.repository;

import com.ssafy.a208.domain.tag.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findByName(String name);
}
