// frontend/src/api/community.ts

import { apiFetch } from "@/api/fetcher";
import { CommunityBoardItemProps, CommunityBoardItemResponse, CommunityFloatingItemProps, CommunityPostItemResponse } from "@/types/itemType";
import { convertCategoryToApiCode } from "@/utils/categoryConvert";
import { ApiResponse } from "@/types/apiTypes/common";
import { SpaceScrapBoardItemProps } from "@/components/item/SpaceScrapBoardItem";


export interface GetPostScrapsRequest{
  page? :number;
  size? : number;
  author? : string;
  title? : string;
  tag? : string;
  sorter? : string;
  category? : string;
  type? : string;
}

export interface GetPostScrapsResponse{
  posts : SpaceScrapBoardItemProps[];
  itemCnt : number;
  totalCnt : number;
  totalPages : number;
  currentPage : number;
}

/**
 * communityAPI
 * @description 커뮤니티 페이지에서 사용되는 API입니다.
 */
export const CommunityAPI = {

  /**
   * 커뮤니티 페이지 데이터 조회하는 API입니다.
   * @page /community
   * @description 커뮤니티 페이지 데이터를 조회하는 API입니다.
   * @returns {Promise<{ communityBoardList: CommunityBoardItemProps[], popularPosts: CommunityFloatingItemProps[] }>}
   */
  async getCommunityPageData() {
    const [{ communityBoardList }, { popularPosts }] = await Promise.all([
      CommunityAPI.getCommunityBoardList(),
      CommunityAPI.getPopularPosts(),
    ]);
    return {
      communityBoardList,
      popularPosts,
    };
  },

  /**
   * 커뮤니티 게시판 목록 조회하는 API입니다.
   * @page /community
   * @endpoint /api/v1/posts?page={page}&size={size}&author={author}&title={title}&tag={tag}&sorter={sorter}&category={category}&type={type}
   * @description 커뮤니티 게시판 데이터를 조회하는 API입니다.
   * @returns {Promise<{ communityBoardList: CommunityBoardItemProps[] }>}
   */
  async getCommunityBoardList(params?: {
    page?: number;
    size?: number;
    author?: string;
    title?: string;
    tag?: string;
    sorter?: string;
    category?: string;
    type?: string;
  }) {
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
    
    // 카테고리 변환 후 추가
    const convertedCategory = convertCategoryToApiCode(params?.category);
    if (convertedCategory) {
      queryParams.set('category', convertedCategory);
    }
    
    interface ApiResponse {
      message: string | null;
      data: {
        posts: CommunityBoardItemResponse[],
        itemCnt: number,
        totalCnt: number,
        totalPages: number,
        currentPage: number,
      };
    }

    const response = await apiFetch<ApiResponse>(`/api/v1/posts?${queryParams.toString()}`);
    // const response = await apiFetch<ApiResponse>(`/mock/CommunityBoardListResponse.json`);

    const { posts, itemCnt, totalCnt, totalPages, currentPage } = response.data;
    const communityBoardList: CommunityBoardItemProps[] = posts.map((post) => ({ ...post, image: undefined }));

    return {
      communityBoardList,
      itemCnt,
      totalCnt,
      totalPages,
      currentPage,
    };
  },

  /**
   * 인기글 데이터 조회하는 API입니다.
   * @page /community
   * @endpoint 미정
   * @description 인기글 데이터를 조회하는 API입니다.
   * @returns {Promise<{ popularPosts: CommunityFloatingItemProps[] }>}
   */
  async getPopularPosts() {
    const response = await apiFetch<CommunityFloatingItemProps[]>(`/mock/CommunityPopularPost.json`);
    return {
      popularPosts: response,
    };
  },

  /**
   * 커뮤니티 게시글 상세 데이터 조회하는 API입니다.
   * @page /community/[postId]
   * @endpoint /api/v1/posts/{postId}
   * @description 커뮤니티 게시글 상세 데이터를 조회하는 API입니다.
   * @param {number} postId - 게시글 ID
   * @returns {Promise<{ communityPostDetailData: CommunityPostItemResponse }>}
   */
  async getCommunityPostDetailData(postId: number) {
    interface ApiResponse {
      message: string | null;
      data: CommunityPostItemResponse;
    }
    
    const response = await apiFetch<ApiResponse>(`/api/v1/posts/${postId}`);
    // const response = await fetch('http://localhost:3000/mock/CommunityPostDetailResponse.json',
    //   {
    //     cache: "no-store",
    //     next: { revalidate: 0 },
    //   }
    // ).then((res) => res.json());
    
    const communityPostDetailData = response.data;
    
    return {
      communityPostDetailData,
    };
  },

  /**
   * 커뮤니티 게시글 좋아요 추가하는 API입니다.
   * @page /community/[postId]
   * @endpoint POST /api/v1/posts/{postId}/likes
   * @description 커뮤니티 게시글에 좋아요를 추가하는 API입니다.
   * @param {number} postId - 게시글 ID
   * @returns {Promise<{ message: string | null, data: null }>}
   */
  async createPostLike(postId: number) {
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
  },

  /**
   * 커뮤니티 게시글 스크랩 추가하는 API입니다.
   * @page /community/[postId]
   * @endpoint POST /api/v1/posts/{postId}/scraps
   * @description 커뮤니티 게시글에 스크랩을 추가하는 API입니다.
   * @param {number} postId - 게시글 ID
   * @returns {Promise<{ message: string | null, data: null }>}
   */
  async createPostScrap(postId: number) {
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
  },

  /**
   * 커뮤니티 게시글 스크랩 해제하는 API입니다.
   * @page /community/[postId]
   * @endpoint DELETE /api/v1/posts/{postId}/scraps
   * @description 커뮤니티 게시글 스크랩을 해제하는 API입니다.
   * @param {number} postId - 게시글 ID
   * @returns {Promise<{ message: string | null, data: null }>}
   */
  async deletePostScrap(postId: number) {
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
  },


  /*
    * 내가 스크랩한 커뮤니티 게시글 스크랩 목록 조회하는 API입니다.
    */
  async getPostScraps(params?: GetPostScrapsRequest) : Promise< 
  GetPostScrapsResponse > {
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

    const res = await apiFetch<ApiResponse< GetPostScrapsResponse >>(`/api/v1/posts/scraps?${queryParams.toString()}`);

    return res.data;
  },


  /**
   * 커뮤니티 게시글 댓글 작성하는 API입니다.
   * @page /community/[postId]
   * @endpoint POST /api/v1/posts/{postId}/replies
   * @description 커뮤니티 게시글에 댓글을 작성하는 API입니다.
   * @returns {Promise<{ message: string | null, data: null }>}
   */
  async createReply(postId: number, content: string) {
    interface ApiResponse {
      message: string | null;
      data: null;
    }

    const response = await apiFetch<ApiResponse>(`/api/v1/posts/${postId}/replies`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });

    return {
      message: response.message,
      data: response.data,
    };
  },

  /**
   * 커뮤니티 게시글 댓글 수정하는 API입니다.
   * @page /community/[postId]
   * @endpoint PUT /api/v1/posts/{postId}/replies/{replyId}
   * @description 커뮤니티 게시글 댓글을 수정하는 API입니다.
   * @returns {Promise<{ message: string | null, data: null }>}
   */
  async updateReply(postId: number, replyId: number, content: string) {
    interface ApiResponse {
      message: string | null;
      data: null;
    }

    const response = await apiFetch<ApiResponse>(`/api/v1/posts/${postId}/replies/${replyId}`, {
      method: 'PUT',
      body: JSON.stringify({ content }),
    });

    return {
      message: response.message,
      data: response.data,
    };
  },

  /**
   * 커뮤니티 게시글 댓글 삭제하는 API입니다.
   * @page /community/[postId]
   * @endpoint DELETE /api/v1/posts/{postId}/replies/{replyId}
   * @description 커뮤니티 게시글 댓글을 삭제하는 API입니다.
   * @returns {Promise<{ message: string | null, data: null }>}
   */
  async deleteReply(postId: number, replyId: number) {
    interface ApiResponse {
      message: string | null;
      data: null;
    }

    const response = await apiFetch<ApiResponse>(`/api/v1/posts/${postId}/replies/${replyId}`, {
      method: 'DELETE',
    });

    return {
      message: response.message,
      data: response.data,
    };
  },
};