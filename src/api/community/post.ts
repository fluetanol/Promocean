// frontend/src/api/community/post.ts

import { apiFetch } from "@/api/fetcher";
import {
  CommunityBoardItemProps,
  CommunityBoardItemResponse,
  CommunityPostItemResponse,
} from "@/types/itemType";
import { convertCategoryToApiCode } from "@/utils/categoryConvert";
import { ApiResponse } from "@/types/apiTypes/common";
import { CommunityFloatingItemProps } from "@/types/itemType";

/**
 * PostAPI
 * @description 커뮤니티 게시글 관련 API입니다.
 */
export class PostAPI {
  /**
   * 커뮤니티 페이지 데이터 조회하는 API입니다.
   * @page /community
   * @description 커뮤니티 페이지 데이터를 조회하는 API입니다.
   * @returns {Promise<{ communityBoardList: CommunityBoardItemProps[], popularPosts: CommunityFloatingItemProps[] }>}
   */
  static async getPageData() {
    const [{ communityBoardList }, { popularPosts }] = await Promise.all([
      PostAPI.getList(),
      PostAPI.getPopular(),
    ]);
    return {
      communityBoardList,
      popularPosts,
    };
  }

  /**
   * 커뮤니티 게시판 목록 조회하는 API입니다.
   * @page /community
   * @endpoint /api/v1/posts?page={page}&size={size}&author={author}&title={title}&tag={tag}&sorter={sorter}&category={category}&type={type}
   * @description 커뮤니티 게시판 데이터를 조회하는 API입니다.
   * @param {object} params - 쿼리 파라미터
   * @returns {Promise<{ communityBoardList: CommunityBoardItemProps[], itemCnt: number, totalCnt: number, totalPages: number, currentPage: number }>}
   */
  static async getList({
    page = 1,
    size = 10,
    author,
    title,
    tag,
    sorter,
    category,
    type,
  }: {
    page?: number;
    size?: number;
    author?: string;
    title?: string;
    tag?: string;
    sorter?: string;
    category?: string;
    type?: string;
  } = {}) {

    // 쿼리 파라미터 생성
    const queryParams = new URLSearchParams();
    [
      { key: 'page', value: page?.toString() || '1' },
      { key: 'size', value: size?.toString() || '10' },
      { key: 'author', value: author },
      { key: 'title', value: title },
      { key: 'tag', value: tag },
      { key: 'sorter', value: sorter },
      { key: 'type', value: type },
      { key: 'category', value: convertCategoryToApiCode(category) },
    ].forEach(({ key, value }) => value && queryParams.set(key, value));
    
    const response = await apiFetch<ApiResponse<{
      posts: CommunityBoardItemResponse[];
      itemCnt: number;
      totalCnt: number;
      totalPages: number;
      currentPage: number;
    }>>(`/api/v1/posts?${queryParams.toString()}`);

    const { posts, itemCnt, totalCnt, totalPages, currentPage } = response.data;
    const communityBoardList: CommunityBoardItemProps[] = posts.map((post) => ({ ...post}));
    
    return {
      communityBoardList,
      itemCnt,
      totalCnt,
      totalPages,
      currentPage,
    };
  }

  /**
   * 인기글 데이터 조회하는 API입니다.
   * @page /community
   * @endpoint 미정
   * @description 인기글 데이터를 조회하는 API입니다.
   * @returns {Promise<{ popularPosts: CommunityFloatingItemProps[] }>}
   */
  static async getPopular(page: string = "9") {
    const params = new URLSearchParams();
    params.set('page', page);
    const response = await apiFetch<ApiResponse<{ posts: CommunityFloatingItemProps[] }>>(`/api/v1/posts/trending?${params.toString()}`);
    return { popularPosts: response.data.posts };
  }

  /**
   * 커뮤니티 게시글 상세 데이터 조회하는 API입니다.
   * @page /community/[postId]
   * @endpoint /api/v1/posts/{postId}
   * @description 커뮤니티 게시글 상세 데이터를 조회하는 API입니다.
   * @param {number} postId - 게시글 ID
   * @param {string | null} [token] - 서버 환경에서 사용할 토큰 (선택사항)
   * @returns {Promise<{ communityPostDetailData: CommunityPostItemResponse }>}
   */
  static async getDetail(postId: number, token?: string | null) {
    const response = await apiFetch<ApiResponse<CommunityPostItemResponse>>(`/api/v1/posts/${postId}`, {
      token,
    });
    const communityPostDetailData = response.data;
    
    return {
      communityPostDetailData,
    };
  }
}

