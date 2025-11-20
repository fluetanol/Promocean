package com.ssafy.a208.domain.space.repository;

import com.ssafy.a208.domain.space.entity.Article;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long>, ArticleRepositoryCustom {

    Optional<Article> findByIdAndDeletedAtIsNull(Long id);

    Page<Article> findAllByDeletedAtIsNull(Pageable pageable);

}
