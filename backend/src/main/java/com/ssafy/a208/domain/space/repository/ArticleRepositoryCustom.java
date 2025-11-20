package com.ssafy.a208.domain.space.repository;

import com.ssafy.a208.domain.space.dto.response.ArticleListItemQueryRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ArticleRepositoryCustom {

    Page<ArticleListItemQueryRes> findAllArticles(Long folderId, Integer type, String tagName,
            String titleKeyword, Pageable pageable);
}
