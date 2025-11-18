package com.ssafy.a208.domain.board.service;

import com.ssafy.a208.domain.alarm.dto.AlarmReq;
import com.ssafy.a208.domain.alarm.service.AlarmService;
import com.ssafy.a208.domain.board.dto.ReplyReq;
import com.ssafy.a208.domain.board.entity.Post;
import com.ssafy.a208.domain.board.entity.Reply;
import com.ssafy.a208.domain.board.exception.ReplyAccessDeniedException;
import com.ssafy.a208.domain.board.exception.ReplyNotFoundException;
import com.ssafy.a208.domain.board.reader.PostLikeReader;
import com.ssafy.a208.domain.board.reader.PostReader;
import com.ssafy.a208.domain.board.reader.ReplyReader;
import com.ssafy.a208.domain.board.repository.ReplyRepository;
import com.ssafy.a208.domain.member.entity.Member;
import com.ssafy.a208.domain.member.reader.MemberReader;
import com.ssafy.a208.global.common.enums.AlarmCategory;
import com.ssafy.a208.global.security.dto.CustomUserDetails;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 댓글 서비스 댓글 생성, 수정, 삭제 등 핵심 비즈니스 로직을 담당합니다.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ReplyService {

    private final MemberReader memberReader;
    private final PostReader postReader;
    private final ReplyReader replyReader;
    private final AlarmService alarmService;
    private final ReplyRepository replyRepository;
    private final PostIndexService postIndexService;
    private final PostLikeReader postLikeReader;
    /**
     * 댓글을 생성합니다.
     *
     * @param userDetails 인증된 사용자 정보
     * @param postId      게시글 ID
     * @param req         댓글 작성 요청 DTO
     */
    @Transactional
    public void createReply(CustomUserDetails userDetails, Long postId, ReplyReq req) {
        // 작성자 조회
        Member author = memberReader.getMemberById(userDetails.memberId());

        // 게시글 조회
        Post post = postReader.getPostById(postId);

        // 댓글 생성
        Reply reply = Reply.builder()
                .content(req.content())
                .post(post)
                .author(author)
                .build();

        replyRepository.save(reply);

        //es 카운트 업데이트
        int likeCount = postLikeReader.countByPost(post);
        int replyCount = replyReader.getRepliesByPost(post).size();
        postIndexService.updatePostCounts(postId, likeCount, replyCount);

        // 게시글 작성자에게 알림 전송
        AlarmReq alarmReq = AlarmReq.builder()
                .category(AlarmCategory.POST_REPLY)
                .postId(postId)
                .postTitle(post.getTitle())
                .replyId(reply.getId())
                .replyContent(reply.getContent())
                .build();
        Member receiver = post.getAuthor();
        alarmService.send(receiver, alarmReq);

        log.info("댓글 생성 완료 - replyId: {}, postId: {}, authorId: {}",
                reply.getId(), postId, author.getId());
    }

    /**
     * 댓글을 수정합니다.
     *
     * @param userDetails 인증된 사용자 정보
     * @param postId      게시글 ID
     * @param replyId     댓글 ID
     * @param req         댓글 수정 요청 DTO
     * @throws ReplyNotFoundException     댓글을 찾을 수 없을 때
     * @throws ReplyAccessDeniedException 수정 권한이 없을 때
     */
    @Transactional
    public void updateReply(CustomUserDetails userDetails, Long postId, Long replyId,
            ReplyReq req) {
        // 게시글 존재 여부 먼저 확인
        Post post = postReader.getPostById(postId);

        // 댓글 조회
        Reply reply = replyReader.getReplyById(replyId);

        // 댓글이 해당 게시글에 속하는지 확인
        if (!reply.getPost().getId().equals(postId)) {
            throw new ReplyNotFoundException();
        }

        // 작성자 확인
        if (!reply.isAuthor(userDetails.memberId())) {
            throw new ReplyAccessDeniedException();
        }

        // 댓글 내용 수정
        reply.updateContent(req.content());

        log.info("댓글 수정 완료 - replyId: {}, postId: {}", replyId, postId);
    }

    /**
     * 댓글을 삭제합니다.
     *
     * @param userDetails 인증된 사용자 정보
     * @param postId      게시글 ID
     * @param replyId     댓글 ID
     * @throws ReplyNotFoundException     댓글을 찾을 수 없을 때
     * @throws ReplyAccessDeniedException 삭제 권한이 없을 때
     */
    @Transactional
    public void deleteReply(CustomUserDetails userDetails, Long postId, Long replyId) {
        // 게시글 존재 여부 먼저 확인(여기에서 없으면 throw)
        Post post = postReader.getPostById(postId);

        // 댓글 조회
        Reply reply = replyReader.getReplyById(replyId);

        // 게시글 ID 검증 (댓글이 해당 게시글에 속하는지 확인)
        if (!reply.getPost().getId().equals(postId)) {
            throw new ReplyNotFoundException();
        }

        // 작성자 확인
        if (!reply.isAuthor(userDetails.memberId())) {
            throw new ReplyAccessDeniedException();
        }

        // 댓글 소프트 딜리트
        reply.deleteReply();

        int likeCount = postLikeReader.countByPost(post);
        int replyCount = replyReader.getRepliesByPost(post).size();
        postIndexService.updatePostCounts(postId, likeCount, replyCount);

        log.info("댓글 삭제 완료 - replyId: {}, postId: {}", replyId, postId);
    }

    /**
     * 게시글의 모든 댓글을 소프트 딜리트합니다.
     *
     * @param post 게시글 엔티티
     */
    @Transactional
    public void deleteRepliesByPost(Post post) {
        List<Reply> replies = replyReader.getRepliesByPost(post);
        replies.forEach(Reply::deleteReply);
        log.info("게시글의 댓글 삭제 완료 - postId: {}, 댓글 수: {}", post.getId(), replies.size());
    }
}