package com.ssafy.a208.domain.scrap.repository;

import com.ssafy.a208.domain.board.entity.Post;
import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.scrap.entity.Scrap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ScrapRepository extends JpaRepository<Scrap, Long>, ScrapRepositoryCustom{
    Optional<Scrap> findByPostAndMemberAndDeletedAtIsNull(Post post, Member member);

    List<Scrap> findByPostAndDeletedAtIsNull(Post post);

    Optional<Scrap> findByPostAndMember(Post post, Member member);
}