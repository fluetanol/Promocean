package com.ssafy.a208.domain.contest.repository;

import com.ssafy.a208.domain.contest.document.SubmissionDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubmissionElasticsearchRepository
        extends ElasticsearchRepository<SubmissionDocument, Long>, SubmissionElasticsearchRepositoryCustom {

}
