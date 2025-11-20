package com.ssafy.a208.domain.tag.repository;

import com.ssafy.a208.domain.tag.entity.PostTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostTagRepository extends JpaRepository<PostTag, Long> {

    /**게시글과 태그로 매핑 정보를 조회*/
    Optional<PostTag> findByPostIdAndTagId(Long postId, Long tagId);

    /**게시글에 연결된 모든 활성 태그를 조회*/
    List<PostTag> findAllByPostIdAndDeletedAtIsNull(Long postId);

    int countByTagIdAndDeletedAtIsNull(Long tagId);
}