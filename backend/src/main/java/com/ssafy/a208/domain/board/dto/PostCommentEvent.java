package com.ssafy.a208.domain.board.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostCommentEvent {
    private String eventId;
    private Long postId;
    private Long commentId;
    private Long userId;
    private CommentAction action;
    private LocalDateTime timestamp;

    public enum CommentAction {
        CREATE, DELETE
    }
}