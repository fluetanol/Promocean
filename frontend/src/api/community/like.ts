// frontend/src/api/community/like.ts

import { apiFetch } from "@/api/fetcher";
import { ApiResponse } from "@/types/apiTypes/common";

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
    const response = await apiFetch<ApiResponse<null>>(`/api/v1/posts/${postId}/likes`, {
      method: 'POST',
    });

    return {
      message: response.message,
      data: response.data,
    };
  }
}

