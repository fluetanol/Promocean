// frontend/src/api/community/scrap.ts

import { apiFetch } from "@/api/fetcher";
import { ApiResponse } from "@/types/apiTypes/common";
import { SpaceScrapBoardItemProps } from "@/components/item/SpaceScrapBoardItem";

export interface GetPostScrapsRequest {
  page?: number;
  size?: number;
  author?: string;
  title?: string;
  tag?: string;
  sorter?: string;
  category?: string;
  type?: string;
}

export interface GetPostScrapsResponse {
  posts: SpaceScrapBoardItemProps[];
  itemCnt: number;
  totalCnt: number;
  totalPages: number;
  currentPage: number;
}

/**
 * ScrapAPI
 * @description 커뮤니티 게시글 스크랩 관련 API입니다.
 */
export class ScrapAPI {
  /**
   * 커뮤니티 게시글 스크랩 추가하는 API입니다.
   * @page /community/[postId]
   * @endpoint POST /api/v1/posts/{postId}/scraps
   * @description 커뮤니티 게시글에 스크랩을 추가하는 API입니다.
   * @param {number} postId - 게시글 ID
   * @returns {Promise<{ message: string | null, data: null }>}
   */
  static async create(postId: number) {
    interface ApiResponse {
      message: string | null;
      data: null;
    }

    const response = await apiFetch<ApiResponse>(`/api/v1/posts/${postId}/scraps`, {
      method: 'POST',
    });

    return {
      message: response.message,
      data: response.data,
    };
  }

  /**
   * 커뮤니티 게시글 스크랩 해제하는 API입니다.
   * @page /community/[postId]
   * @endpoint DELETE /api/v1/posts/{postId}/scraps
   * @description 커뮤니티 게시글 스크랩을 해제하는 API입니다.
   * @param {number} postId - 게시글 ID
   * @returns {Promise<{ message: string | null, data: null }>}
   */
  static async delete(postId: number) {
    interface ApiResponse {
      message: string | null;
      data: null;
    }

    const response = await apiFetch<ApiResponse>(`/api/v1/posts/${postId}/scraps`, {
      method: 'DELETE',
    });

    return {
      message: response.message,
      data: response.data,
    };
  }

  /**
   * 내가 스크랩한 커뮤니티 게시글 스크랩 목록 조회하는 API입니다.
   * @endpoint /api/v1/posts/scraps?page={page}&size={size}&...
   * @description 내가 스크랩한 게시글 목록을 조회하는 API입니다.
   * @param {object} params - 쿼리 파라미터
   * @returns {Promise<GetPostScrapsResponse>}
   */
  static async list(params?: GetPostScrapsRequest): Promise<GetPostScrapsResponse> {
    // 쿼리 파라미터 생성 (값이 있는 파라미터만 추가)
    const queryParams = new URLSearchParams();
    
    // 디폴트값 설정
    const defaultParams = {
      page: params?.page || 1,
      size: 10, // 응답이 10개보다 적더라도 항상 10으로 요청
    };
    
    // 디폴트값 추가
    queryParams.set('page', defaultParams.page.toString());
    queryParams.set('size', defaultParams.size.toString());
    
    // 나머지 파라미터는 값이 있을 때만 추가
    if (params?.author) queryParams.set('author', params.author);
    if (params?.title) queryParams.set('title', params.title);
    if (params?.tag) queryParams.set('tag', params.tag);
    if (params?.sorter) queryParams.set('sorter', params.sorter);
    if (params?.category) queryParams.set('category', params.category);
    if (params?.type) queryParams.set('type', params.type);

    const res = await apiFetch<ApiResponse<GetPostScrapsResponse>>(`/api/v1/posts/scraps?${queryParams.toString()}`);

    return res.data;
  }
}

