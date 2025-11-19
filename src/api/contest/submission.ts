// frontend/src/api/contest/submission.ts

import { apiFetch } from "@/api/fetcher";
import {
  ContestSubmissionItemProps,
  ContestSubmissionDetailData,
} from "@/types/itemType";
import { ApiResponse } from "@/types/apiTypes/common";

/**
 * SubmissionAPI
 * @description 대회 산출물 관련 API입니다.
 */
export class SubmissionAPI {
  /**
   * 대회 상세 페이지 산출물 목록 데이터 조회하는 API입니다.
   * @page /contest/[contestId]?tab=submission
   * @endpoint /api/v1/contests/{contestId}/submissions
   * @description 대회 상세 페이지 산출물 목록 데이터를 조회하는 API입니다.
   * @param {number} contestId - 대회 ID
   * @returns {Promise<{ contestSubmissionList: ContestSubmissionItemProps[] }>}
   */
  static async list(contestId: number) {
    try {
      const response = await apiFetch<ApiResponse<{submissions: ContestSubmissionItemProps[];}>>(`/api/v1/contests/${contestId}/submissions`);
      return {
        contestSubmissionList: response.data.submissions || [],
      };
    } catch (error) {
      return {
        contestSubmissionList: [],
      };
    }
  }

  /**
   * 대회 상세 페이지 산출물 데이터 조회
   * @page /contest/[contestId]/submission/[submissionId]
   * @endpoint /api/v1/contests/{contestId}/submissions/{submissionId}
   * @description 대회 상세 페이지 산출물 데이터를 조회하는 API입니다.
   * @param {number} contestId - 대회 ID
   * @param {number} submissionId - 산출물 ID
   * @returns {Promise<{ submissionData: ContestSubmissionDetailData }>}
   */
  static async getDetail(contestId: number, submissionId: number) {
    const response = await apiFetch<ApiResponse<ContestSubmissionDetailData>>(`/api/v1/contests/${contestId}/submissions/${submissionId}`);
    return {
      submissionData: response.data,
    };
  }
  
  /**
   * 대회 내 산출물 목록 데이터 조회하는 API입니다.
   * @page /contest/[contestId]?tab=my-submission
   * @endpoint /api/v1/contests/{contestId}/submissions/me
   * @description 대회 내 산출물 목록 데이터를 조회하는 API입니다.
   * @param {number} contestId - 대회 ID
   * @returns {Promise<{ contestMySubmissionItem: ContestSubmissionDetailData }>}
  */
 static async getMySubmission(contestId: number) {
   const response = await apiFetch<ApiResponse<ContestSubmissionDetailData>>(`/api/v1/contests/${contestId}/submissions/me`);
    return {
      contestMySubmissionItem: response.data,
    };
  }

  /**
   * 대회 산출물 생성하는 API입니다.
   * @page /post?type=submission&contestId={contestId}
   * @endpoint /api/v1/contests/{contestId}/submissions
   * @description 대회 산출물 생성하는 API입니다.
   * @param {number} contestId - 대회 ID
   * @param {string} prompt - 프롬프트
   * @param {string} description - 설명
   * @param {string} result - 결과
   * @returns {Promise<{ message: string | null, data: { submissionId: number } | null }>}
   */
  static async create(
    contestId: number,
    prompt: string,
    description: string,
    result: string
  ) {
    const requestBody = {
      prompt,
      description,
      result,
    };
    
    try {
      const response = await apiFetch<ApiResponse<{ submissionId: number }>>(`/api/v1/contests/${contestId}/submissions`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
      });
      return {
        message: response.message,
        data: response.data,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * 대회 산출물 수정하는 API입니다.
   * @page /contest/[contestId]/submission/[submissionId]
   * @endpoint /api/v1/contests/{contestId}/submissions/{submissionId}
   * @description 대회 산출물 수정하는 API입니다.
   * @param {number} contestId - 대회 ID
   * @param {number} submissionId - 산출물 ID
   * @param {string} prompt - 프롬프트
   * @param {string} description - 설명
   * @param {string} result - 결과
   * @returns {Promise<{ message: string | null, data: null }>}
   */
  static async update(
    contestId: number,
    submissionId: number,
    prompt: string,
    description: string,
    result: string
  ) {
    const response = await apiFetch<ApiResponse<null>>(`/api/v1/contests/${contestId}/submissions/${submissionId}`, {
      method: 'PUT',
      body: JSON.stringify({
        prompt,
        description,
        result,
      }),
    });
    return {
      message: response.message,
      data: response.data,
    };
  }

  /**
   * 대회 산출물 삭제하는 API입니다.
   * @page /contest/[contestId]/submission/[submissionId]
   * @endpoint /api/v1/contests/{contestId}/submissions/{submissionId}
   * @description 대회 산출물 삭제하는 API입니다.
   * @param {number} contestId - 대회 ID
   * @param {number} submissionId - 산출물 ID
   * @returns {Promise<{ message: string | null, data: null }>}
   */
  static async delete(contestId: number, submissionId: number) {
    const response = await apiFetch<ApiResponse<null>>(`/api/v1/contests/${contestId}/submissions/${submissionId}`, {
      method: 'DELETE',
    });
    return {
      message: response.message,
      data: response.data,
    };
  }
}

