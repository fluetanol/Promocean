package com.ssafy.a208.domain.tag.repository;

import com.ssafy.a208.domain.tag.document.TagDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagElasticsearchRepository extends ElasticsearchRepository<TagDocument, Long> {
}