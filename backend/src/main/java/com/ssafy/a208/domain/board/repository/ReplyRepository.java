package com.ssafy.a208.domain.board.repository;

import com.ssafy.a208.domain.board.entity.Post;
import com.ssafy.a208.domain.board.entity.Reply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReplyRepository extends JpaRepository<Reply, Long> {
    Optional<Reply> findByIdAndDeletedAtIsNull(Long replyId);

    List<Reply> findByPostAndDeletedAtIsNull(Post post);
}
