package com.ssafy.a208.domain.tag.repository;

import com.ssafy.a208.domain.tag.entity.ArticleTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleTagRepository extends JpaRepository<ArticleTag, Long>,
        ArticleTagRepositoryCustom {
    int countByTagIdAndDeletedAtIsNull(Long tagId);

}
