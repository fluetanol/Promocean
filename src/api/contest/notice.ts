// frontend/src/api/contest/notice.ts

import { apiFetch } from "@/api/fetcher";
import {
  ContestNoticeItemProps,
  ContestNoticeDetailData,
} from "@/types/itemType";

/**
 * NoticeAPI
 * @description 대회 공지사항 관련 API입니다.
 */
export class NoticeAPI {
  /**
   * 대회 상세 페이지 공지사항 목록 데이터 조회하는 API입니다.
   * @page /contest/[contestId]?tab=notice
   * @endpoint /api/v1/contests/{contestId}/notices
   * @description 대회 상세 페이지 공지사항 목록 데이터를 조회하는 API입니다.
   * @param {number} contestId - 대회 ID
   * @returns {Promise<{ contestNoticeList: ContestNoticeItemProps[] }>}
   */
  static async list(contestId: number) {
    interface ApiResponse {
      message: string | null;
      data: ContestNoticeItemProps[];
    }
    const response = await apiFetch<ApiResponse>(`/api/v1/contests/${contestId}/notices`);
    return {
      contestNoticeList: response.data,
    };
  }
  
  /**
   * 대회 상세 페이지 공지사항 데이터 조회하는 API입니다.
   * @page /contest/[contestId]/notice/[noticeId]
   * @endpoint /api/v1/contests/{contestId}/notices/{noticeId}
   * @description 대회 상세 페이지 공지사항 데이터를 조회하는 API입니다.
   * @param {number} contestId - 대회 ID
   * @param {number} noticeId - 공지사항 ID
   * @returns {Promise<{ noticeData: ContestNoticeDetailData }>}
   */
  static async getDetail(contestId: number, noticeId: number) {
    interface ApiResponse {
      message: string | null;
      data: ContestNoticeDetailData;
    }
    const response = await apiFetch<ApiResponse>(`/api/v1/contests/${contestId}/notices/${noticeId}`);
    return {
      noticeData: response.data,
    };
  }

  /**
   * 대회 공지사항 작성하는 API입니다.
   * @page /contest/[contestId]/post-notice
   * @endpoint POST /api/v1/contests/{contestId}/notices
   * @description 대회 공지사항을 작성하는 API입니다.
   * @param {number} contestId - 대회 ID
   * @param {string} title - 공지사항 제목
   * @param {string} content - 공지사항 내용
   * @returns {Promise<{ message: string | null, data: null }>}
   */
  static async create(contestId: number, title: string, content: string) {
    interface ApiResponse {
      message: string | null;
      data: null;
    }
    const response = await apiFetch<ApiResponse>(`/api/v1/contests/${contestId}/notices`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        content,
      }),
    });
    return {
      message: response.message,
      data: response.data,
    };
  }

  /**
   * 대회 공지사항 수정하는 API입니다.
   * @page /contest/[contestId]/notice/[noticeId]/update
   * @endpoint PUT /api/v1/contests/{contestId}/notices/{noticeId}
   * @description 대회 공지사항을 수정하는 API입니다.
   * @param {number} contestId - 대회 ID
   * @param {number} noticeId - 공지사항 ID
   * @param {string} title - 공지사항 제목
   * @param {string} content - 공지사항 내용
   * @returns {Promise<{ message: string | null, data: null }>}
   */
  static async update(contestId: number, noticeId: number, title: string, content: string) {
    interface ApiResponse {
      message: string | null;
      data: null;
    }
    const response = await apiFetch<ApiResponse>(`/api/v1/contests/${contestId}/notices/${noticeId}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        content,
      }),
    });
    return {
      message: response.message,
      data: response.data,
    };
  }

  /**
   * 대회 공지사항 삭제하는 API입니다.
   * @page /contest/[contestId]/notice/[noticeId]
   * @endpoint DELETE /api/v1/contests/{contestId}/notices/{noticeId}
   * @description 대회 공지사항을 삭제하는 API입니다.
   * @param {number} contestId - 대회 ID
   * @param {number} noticeId - 공지사항 ID
   * @returns {Promise<{ message: string | null, data: null }>}
   */
  static async delete(contestId: number, noticeId: number) {
    interface ApiResponse {
      message: string | null;
      data: null;
    }
    const response = await apiFetch<ApiResponse>(`/api/v1/contests/${contestId}/notices/${noticeId}`, {
      method: 'DELETE',
    });
    return {
      message: response.message,
      data: response.data,
    };
  }
}

