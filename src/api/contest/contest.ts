// frontend/src/api/contest/contest.ts

import { apiFetch } from "@/api/fetcher";
import {
  ContestCardItemProps,
  ContestPostItemProps,
  ContestNoticeItemProps,
  ContestSubmissionItemProps,
} from "@/types/itemType";
import { NoticeAPI } from "./notice";
import { SubmissionAPI } from "./submission";

/**
 * ContestAPI
 * @description 대회 CRUD 관련 API입니다.
 */
export class ContestAPI {
  /**
   * 대회 페이지 조회 시 필요한 데이터 조회하는 API입니다.
   * @page /contest/[contestId]
   * @description 대회 상세 페이지 데이터를 조회하는 API입니다.
   * @param {number} contestId - 대회 ID (contestId)
   * @returns {Promise<{ contestPostData: ContestPostItemProps, contestInfoTitles: string[], contestNoticeList: ContestNoticeItemProps[], contestSubmissionList: ContestSubmissionItemProps[] }>}
   */
  static async getPostPageData(contestId: number) {
    const [
      { contestData: contestPostData },
      { contestNoticeList },
      { contestSubmissionList },
    ] = await Promise.all([
      ContestAPI.getDetail(contestId),
      NoticeAPI.list(contestId),
      SubmissionAPI.list(contestId),
    ]);

    return {
      contestPostData,
      contestInfoTitles: ["대회 정보", "상금 유형", "참여 통계", "해시태그"],
      contestNoticeList: contestNoticeList || [],
      contestSubmissionList: contestSubmissionList || [],
    };
  }

  /**
   * 대회 목록 데이터 조회하는 API입니다.
   * @page /contest?page=1&size=10&sorter=&status=&title=&tag=
   * @endpoint /api/v1/contests?page={page}&size={size}&sorter={sorter}&status={status}&title={title}&tag={tag}
   * @description 대회 목록 데이터를 조회하는 API입니다.
   * @returns {Promise<{ contestCardList: ContestCardItemProps[] }>}
   */
  static async getList(params?: {
    page?: number;
    size?: number;
    sorter?: string;
    status?: string;
    title?: string;
    tag?: string;
  }) {
    // 쿼리 파라미터 생성 (값이 있는 파라미터만 추가)
    const queryParams = new URLSearchParams();
    
    // 디폴트값 설정
    const defaultParams = {
      page: params?.page || 1,
      size: params?.size || 10,
    };
    
    // 디폴트값 추가
    queryParams.set('page', defaultParams.page.toString());
    queryParams.set('size', defaultParams.size.toString());
    
    // 나머지 파라미터는 값이 있을 때만 추가
    if (params?.sorter) queryParams.set('sorter', params.sorter);
    if (params?.status) queryParams.set('status', params.status);
    if (params?.title) queryParams.set('title', params.title);
    if (params?.tag) queryParams.set('tag', params.tag);

    interface ContestApiResponse {
      contestId: number;
      author: string;
      profileUrl: string;
      title: string;
      startAt: string;
      endAt: string;
      voteEndAt: string;
      status: string; // "개최전", "종료" 등 한글
      createdAt: string;
      updatedAt: string;
    }

    interface ApiResponse {
      message: string | null;
      data: {
        contests: ContestApiResponse[];
        itemCnt: number;
        totalCnt: number;
        totalPages: number;
        currentPage: number;
      };
    }

    const response = await apiFetch<ApiResponse>(`/api/v1/contests?${queryParams.toString()}`);
    
    const { contests, itemCnt, totalCnt, totalPages, currentPage } = response.data;

    const contestCardList: ContestCardItemProps[] = contests.map((contest) => ({
      contestId: contest.contestId,
      author: contest.author,
      profileUrl: contest.profileUrl,
      title: contest.title,
      startAt: contest.startAt,
      endAt: contest.endAt,
      voteEndAt: contest.voteEndAt,
      status: contest.status,
      createdAt: contest.createdAt,
      updatedAt: contest.updatedAt,
    }));

    return { contestCardList, itemCnt, totalCnt, totalPages, currentPage };
  }
  
  /**
   * 대회 상세 페이지를 조회하는 API입니다.
   * @page /contest/[contestId]
   * @endpoint /api/v1/contests/{contestId}
   * @description 대회 상세 페이지를 조회하는 API입니다.
   * @param {number} id - 대회 ID
   * @returns {Promise<{ contestData: ContestPostItemProps }>}
   */
  static async getDetail(id: number) {
    try {
      interface ApiResponse {
        message: string | null;
        data: ContestPostItemProps;
      }
      const response = await apiFetch<ApiResponse>(`/api/v1/contests/${id}`);
      return {
        contestData: response.data,
      };
    } catch (error) {
      console.error('대회 상세 페이지 데이터 조회 실패:', error);
      throw new Error('대회를 찾을 수 없습니다');
    }
  }

  /**
   * 대회 글 수정하는 API입니다.
   * @page /contest/[contestId]
   * @endpoint /api/v1/contests/{contestId}
   * @description 대회 글 수정하는 API입니다.
   * @param {number} id - 대회 ID
   * @param {object} data - 수정할 데이터
   * @returns {Promise<{ message: string | null, data: null }>}
   */
  static async update(id: number, data: { title: string; content: string; type: number; startAt: string; endAt: string; voteEndAt: string }) {
    interface ApiResponse {
      message: string | null;
      data: null;
    }
    
    // 날짜 형식 변환 (YYYY-MM-DD -> YYYY-MM-DDTHH:mm:ss)
    const formatDateTime = (dateStr: string): string => {
      if (!dateStr || dateStr.trim() === '') {
        throw new Error('날짜가 비어있습니다.');
      }
      // 이미 T가 포함되어 있으면 그대로 반환
      if (dateStr.includes('T')) {
        return dateStr;
      }
      // YYYY-MM-DD 형식이면 T00:00:00 추가
      return `${dateStr}T00:00:00`;
    };
    
    const response = await apiFetch<ApiResponse>(`/api/v1/contests/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...data,
        startAt: formatDateTime(data.startAt),
        endAt: formatDateTime(data.endAt),
        voteEndAt: formatDateTime(data.voteEndAt),
      }),
    });
    
    return {
      message: response.message,
      data: response.data,
    };
  }
}

