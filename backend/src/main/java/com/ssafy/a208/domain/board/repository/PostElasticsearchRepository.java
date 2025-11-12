package com.ssafy.a208.domain.board.repository;

import com.ssafy.a208.domain.board.document.PostDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostElasticsearchRepository extends ElasticsearchRepository<PostDocument, Long> {
}