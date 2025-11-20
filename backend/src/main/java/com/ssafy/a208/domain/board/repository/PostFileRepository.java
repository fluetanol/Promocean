package com.ssafy.a208.domain.board.repository;

import com.ssafy.a208.domain.board.entity.Post;
import com.ssafy.a208.domain.board.entity.PostFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostFileRepository extends JpaRepository<PostFile, Long> {

    /** 게시물에 연결된 파일 중 삭제되지 않은 것 조회 */
    Optional<PostFile> findByPostAndDeletedAtIsNull(Post post);

}
