// frontend/src/api/contest/vote.ts

import { apiFetch } from "@/api/fetcher";
import { ApiResponse } from "@/types/apiTypes/common";

/**
 * VoteAPI
 * @description 대회 투표 관련 API입니다.
 */
export class VoteAPI {
  /**
   * 대회 산출물 투표
   * @page /contest/[contestId]/submission/[submissionId]
   * @endpoint /api/v1/contests/{contestId}/submissions/{submissionId}/votes
   * @description 대회 산출물 투표하는 API입니다.
   * @param {number} contestId - 대회 ID
   * @param {number} submissionId - 산출물 ID
   * @returns {Promise<{ message: string | null, data: null }>}
   */
  static async create(contestId: number, submissionId: number) {
    const response = await apiFetch<ApiResponse<null>>(`/api/v1/contests/${contestId}/submissions/${submissionId}/votes`, {
      method: 'POST',
    });

    return {
      message: response.message,
      data: response.data,
    };
  }
}

