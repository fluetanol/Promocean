// frontend/src/api/community/reply.ts

import { apiFetch } from "@/api/fetcher";
import { ApiResponse } from "@/types/apiTypes/common";

/**
 * ReplyAPI
 * @description 커뮤니티 게시글 댓글 관련 API입니다.
 */
export class ReplyAPI {
  /**
   * 커뮤니티 게시글 댓글 작성하는 API입니다.
   * @page /community/[postId]
   * @endpoint POST /api/v1/posts/{postId}/replies
   * @description 커뮤니티 게시글에 댓글을 작성하는 API입니다.
   * @param {number} postId - 게시글 ID
   * @param {string} content - 댓글 내용
   * @returns {Promise<{ message: string | null, data: null }>}
   */
  static async create(postId: number, content: string) {
    const response = await apiFetch<ApiResponse<null>>(`/api/v1/posts/${postId}/replies`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });

    return {
      message: response.message,
      data: response.data,
    };
  }

  /**
   * 커뮤니티 게시글 댓글 수정하는 API입니다.
   * @page /community/[postId]
   * @endpoint PUT /api/v1/posts/{postId}/replies/{replyId}
   * @description 커뮤니티 게시글 댓글을 수정하는 API입니다.
   * @param {number} postId - 게시글 ID
   * @param {number} replyId - 댓글 ID
   * @param {string} content - 댓글 내용
   * @returns {Promise<{ message: string | null, data: null }>}
   */
  static async update(postId: number, replyId: number, content: string) {
    const response = await apiFetch<ApiResponse<null>>(`/api/v1/posts/${postId}/replies/${replyId}`, {
      method: 'PUT',
      body: JSON.stringify({ content }),
    });

    return {
      message: response.message,
      data: response.data,
    };
  }

  /**
   * 커뮤니티 게시글 댓글 삭제하는 API입니다.
   * @page /community/[postId]
   * @endpoint DELETE /api/v1/posts/{postId}/replies/{replyId}
   * @description 커뮤니티 게시글 댓글을 삭제하는 API입니다.
   * @param {number} postId - 게시글 ID
   * @param {number} replyId - 댓글 ID
   * @returns {Promise<{ message: string | null, data: null }>}
   */
  static async delete(postId: number, replyId: number) {
    const response = await apiFetch<ApiResponse<null>>(`/api/v1/posts/${postId}/replies/${replyId}`, {
      method: 'DELETE',
    });

    return {
      message: response.message,
      data: response.data,
    };
  }
}

