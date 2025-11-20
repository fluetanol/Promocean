package com.ssafy.a208.domain.board.reader;

import com.ssafy.a208.domain.board.entity.Post;
import com.ssafy.a208.domain.board.entity.Reply;
import com.ssafy.a208.domain.board.exception.ReplyNotFoundException;
import com.ssafy.a208.domain.board.repository.ReplyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * 댓글 조회 전용 Reader 클래스.
 * - 삭제되지 않은 댓글만 조회합니다.
 */
@Component
@RequiredArgsConstructor
public class ReplyReader {

    private final ReplyRepository replyRepository;

    /**
     * 댓글 ID로 댓글 조회 (삭제되지 않은 것만)
     * @param replyId 댓글 ID
     * @return Reply 엔티티
     * @throws ReplyNotFoundException 존재하지 않거나 삭제된 경우
     */
    public Reply getReplyById(Long replyId) {
        return replyRepository.findByIdAndDeletedAtIsNull(replyId)
                .orElseThrow(ReplyNotFoundException::new);
    }

    /**
     * 특정 게시글의 모든 댓글 조회 (삭제되지 않은 것만)
     *
     * @param post 게시글 엔티티
     * @return 댓글 리스트
     */
    public List<Reply> getRepliesByPost(Post post) {
        return replyRepository.findByPostAndDeletedAtIsNull(post);
    }
}