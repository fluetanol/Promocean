package com.ssafy.a208.domain.space.repository;

import com.ssafy.a208.domain.space.entity.ArticleDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface ArticleElasticSearchRepository extends
        ElasticsearchRepository<ArticleDocument, Long> {

}
