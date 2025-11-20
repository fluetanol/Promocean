package com.ssafy.a208.domain.space.repository;

import com.ssafy.a208.domain.space.entity.ArticleFile;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleFileRepository extends JpaRepository<ArticleFile, Long> {

    Optional<ArticleFile> findByArticleIdAndDeletedAtIsNull(Long articleId);
}
