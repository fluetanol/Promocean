package com.ssafy.a208.domain.board.dto;

import lombok.Builder;

/**
 * 게시글 수정 응답 DTO
 */
@Builder
public record PostUpdateRes(Long postId) {}