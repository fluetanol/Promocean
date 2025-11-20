package com.ssafy.a208.domain.board.dto;

import lombok.Builder;

/**
 * 게시글 작성 응답 DTO
 */
@Builder
public record PostCreateRes(Long postId) {}