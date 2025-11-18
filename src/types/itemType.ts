// frontend/src/types/Item.ts

import React from 'react'

/**
 * PostCardItemProps interface
 * @description 메인 페이지에서 표시되는 포스트 카드 아이템 타입
 */
export interface PostCardItemProps {
  postId: number
  title: string
  hashtags: string[]
  category: string
  likeCount: number
  commentCount: number
  image: string
}

/**
 * SidebarItemProps interface
 * @description 사이드바에서 표시되는 아이템 타입
 */
export interface SidebarItemProps {
  icon: React.ReactNode
  title: string
  href?: string
  onClick?: () => void
  showBadge?: boolean
  isActive?: boolean
  buttonRef?: React.RefObject<HTMLButtonElement | null>
}

/**
 * CommunityBoardItemResponse interface
 * @page /community
 * @endpoint /api/v1/posts?page={page}&size={size}&author={author}&title={title}&tag={tag}&sorter={sorter}&category={category}&type={type}
 * @description API 응답의 게시글 목록 아이템 타입
 */
export interface CommunityBoardItemResponse {
  postId: number
  author: string
  profileUrl: string
  title: string
  type: string
  description: string
  category: string
  tags: string[]
  likeCnt: number
  replyCnt: number
}

/**
 * CommunityBoardItemProps interface
 * @page /community
 * @endpoint /api/v1/posts?page={page}&size={size}&author={author}&title={title}&tag={tag}&sorter={sorter}&category={category}&type={type}
 * @description API 응답의 게시글 목록 아이템 타입 (컴포넌트에서 사용)
 */
export interface CommunityBoardItemProps {
  postId: number
  author: string
  profileUrl: string
  title: string
  type: string
  description: string
  category: string
  tags: string[]
  likeCnt: number
  replyCnt: number
  fileUrl?: string
}

/**
 * CommunityFloatingItemProps interface
 * @description 커뮤니티 플로팅 아이템 타입 (인기글)
 */
export interface CommunityFloatingItemProps {
  postId: number
  title: string
  tags: string[]
  fileUrl: string | null
  likeCnt: number
  replyCnt: number
}

/**
 * PostingFloatingItemProps interface
 * @description 게시글 작성 플로팅 아이템 타입 (카테고리 등)
 */
export interface PostingFloatingItemProps {
  id: string
  icon: React.ReactNode
  label: string
  value: string
  checked?: boolean
}

/**
 * ContestCardItemProps interface
 * @page /contest
 * @endpoint /api/v1/contests?page={page}&size={size}&sorter={sorter}&status={status}&title={title}&tag={tag}
 * @description 대회 페이지에서 사용되는 대회 카드 아이템 타입입니다.
 */
export interface ContestCardItemProps {
  contestId: number
  author: string
  profileUrl: string
  title: string
  startAt: string
  endAt: string
  voteEndAt: string
  status: string // "개최전", "종료" 등 한글
  createdAt: string
  updatedAt: string
}

// TODO : 삭제 예정입니다.
/**
 * ContestInfoItemProps interface
 * @page /contest/post/[contestId]
 * @endpoint /api/v1/contests/{contestId}/info
 * @description 대회 상세 페이지 사이드바에서 사용되는 대회 정보 아이템 타입입니다.
 */
export interface ContestInfoItemProps {
  content: string | React.ReactNode
}

/**
 * ContestPostItemProps interface
 * @page /contest/post/[contestId]
 * @endpoint /api/v1/contests/{contestId}
 * @description 대회 상세 페이지에서 사용되는 대회 게시글 아이템 타입입니다.
 */
export interface ContestPostItemProps {
  contestId: number
  author: string
  profileUrl?: string
  title: string
  content: string
  type: string
  status: string
  startAt: string
  endAt: string
  voteEndAt: string
  createdAt: string
  updatedAt: string
}

// TODO : 삭제 예정입니다.
/**
 * LeaderboardItemProps interface
 * @page /contest/post/[contestId]
 * @endpoint /api/v1/contests/{contestId}/leaderboard
 * @description 대회 상세 페이지에서 사용되는 리더보드 아이템 타입입니다.
 */
export interface LeaderboardItemProps {
  rank: number
  nickName: string
  voteCount: number
  lastSubmit: string
}

/**
 * CommunityPostItemResponse interface
 * @description 커뮤니티 게시글 아이템 타입
 */
export interface CommunityPostItemResponse {
  postId: number
  author: string
  profileUrl: string
  title: string
  description: string
  category: string
  prompt: string
  type: string
  sampleQuestion: string
  sampleAnswer: string
  fileUrl?: string | null
  tags: string[]
  likeCnt: number
  replyCnt: number
  isLiked: boolean
  createdAt: string
  replies: {
    replyId: number
    author: string
    profileUrl: string
    content: string
    createdAt: string
    updatedAt: string
  }[]
}

/**
 * CommunityPostItemProps interface
 * @param postId: 게시글 ID
 * @param author: 작성자
 * @param profileUrl: 작성자 프로필 이미지
 * @param title: 게시글 제목
 * @param description: 게시글 설명
 * @param category: 게시글 카테고리
 * @param prompt: 게시글 프롬프트
 * @param type: 게시글 타입
 * @param sampleQuestion: 게시글 샘플 질문
 * @param sampleAnswer: 게시글 샘플 답변
 * @param fileUrl: 게시글 첨부 파일 URL (클라우드 프론트에서 제공하는 URL)
 * @param tags: 게시글 해시태그
 * @param likeCnt: 게시글 좋아요 수
 * @param createdAt: 게시글 작성일시
 * @param replies: 게시글 댓글 목록
 * @description 커뮤니티 게시글 아이템 타입
 */
export interface CommunityPostItemProps {
  postId: number
  author: string
  profileUrl: string
  title: string
  description: string
  category: string
  prompt: string
  type: string
  sampleQuestion: string
  sampleAnswer: string
  fileUrl?: string | null
  createdAt: string
}

/**
 * HashtagItemProps interface
 * @description 해시태그 아이템 타입
 */
export interface HashtagItemProps {
  tag: string
}

/**
 * CommunityCommentItemProps interface
 * @description 커뮤니티 댓글 아이템 타입
 * @param author: 작성자
 * @param profileUrl: 작성자 프로필 이미지
 * @param content: 댓글 내용
 * @param createdAt: 댓글 작성일시
 * @param updatedAt: 댓글 수정일시
 */
export interface CommunityCommentItemProps {
  replyId: number
  author: string
  profileUrl: string
  content: string
  createdAt: string
  updatedAt?: string
}

/**
 * NoticeItemProps interface
 * @page /contest/post/[contestId]?tab=notice
 * @endpoint /api/v1/contests/{contestId}/notices
 * @description 대회 상세 페이지에서 사용되는 대회 공지사항 아이템 타입입니다.
 */
export interface ContestNoticeItemProps {
  noticeId: number
  title: string
  createdAt: string
  updatedAt: string
}

/**
 * ContestNoticeDetailItemProps interface
 * @page /contest/post/[contestId]/notice/[noticeId]
 * @endpoint /api/v1/contests/{contestId}/notices/{noticeId}
 * @description 대회 상세 페이지에서 사용되는 대회 공지사항 상세 아이템 타입입니다.
 */
export interface ContestNoticeDetailItemProps {
  contestId: number
  author: string
  profileUrl: string
  title: string
  content: string
  type: string
  status: string
  startAt: string
  endAt: string
  voteEndAt: string
  createdAt: string
  updatedAt: string
}

/**
 * ContestSubmissionItemProps interface
 * @page /contest/post/[contestId]?tab=submission
 * @endpoint /api/v1/contests/{contestId}/submissions
 * @description 대회 상세 페이지에서 사용되는 대회 제출 목록 아이템 타입입니다.
 */
export interface ContestSubmissionItemProps {
  submissionId: number
  author: string
  profileUrl: string
  description: string
  type: string
  submissionUrl: string
  voteCnt: number
}

/**
 * ContestSubmissionDetailData interface
 * @page /contest/post/[contestId]/submission/[submissionId]
 * @endpoint /api/v1/contests/{contestId}/submissions/{submissionId}
 * @description 대회 상세 페이지에서 사용되는 대회 제출 상세 데이터 타입입니다.
 */
export interface ContestSubmissionDetailData {
  submissionId: number
  author: string
  profileUrl: string
  description: string
  prompt: string
  type: string
  result: string
  updatedAt: string
  voteCnt: number
}

/**
 * ContestNoticeDetailData interface
 * @page /contest/post/[contestId]/notice/[noticeId]
 * @endpoint /api/v1/contests/{contestId}/notices/{noticeId}
 * @description 대회 상세 페이지에서 사용되는 대회 공지사항 상세 데이터 타입입니다.
 */
export interface ContestNoticeDetailData {
  noticeId: number;
  contestId: number;
  author: string;
  profileUrl: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}