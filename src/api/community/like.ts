// frontend/src/api/community/like.ts

import { apiFetch } from "@/api/fetcher";

/**
 * LikeAPI
 * @description 커뮤니티 게시글 좋아요 관련 API입니다.
 */
export class LikeAPI {
  /**
   * 커뮤니티 게시글 좋아요 추가하는 API입니다.
   * @page /community/[postId]
   * @endpoint POST /api/v1/posts/{postId}/likes
   * @description 커뮤니티 게시글에 좋아요를 추가하는 API입니다.
   * @param {number} postId - 게시글 ID
   * @returns {Promise<{ message: string | null, data: null }>}
   */
  static async create(postId: number) {
    interface ApiResponse {
      message: string | null;
      data: null;
    }

    const response = await apiFetch<ApiResponse>(`/api/v1/posts/${postId}/likes`, {
      method: 'POST',
    });

    return {
      message: response.message,
      data: response.data,
    };
  }
}

