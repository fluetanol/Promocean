package com.ssafy.a208.domain.scrap.repository;

import com.ssafy.a208.domain.scrap.document.ScrapDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScrapElasticsearchRepository extends ElasticsearchRepository<ScrapDocument, String> {

    /**
     * 특정 회원의 모든 스크랩 삭제 - 탈퇴할 때를 위해...
     */
    void deleteByMemberId(Long memberId);

    /**
     * 특정 게시글의 모든 스크랩 삭제
     */
    void deleteByPostId(Long postId);
}