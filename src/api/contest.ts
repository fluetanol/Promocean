// frontend/src/api/contest.ts

import { apiFetch } from "@/api/fetcher";
import {
  ContestCardItemProps,
  LeaderboardItemProps,
  ContestInfoItemProps,
  ContestPostItemProps,
  ContestNoticeItemProps,
  ContestSubmissionItemProps,
  ContestSubmissionDetailData,
  ContestNoticeDetailData,
} from "@/types/itemType";

/**
 * ContestAPI
 * @description 컨테스트 페이지에서 사용되는 API입니다.
 * @returns {Promise<{ contestPostData: ContestPostItemProps, contestInfoData: ContestInfoItemProps[], contestInfoTitles: string[], contestNoticeList: ContestNoticeItemProps[], contestSubmissionList: ContestSubmissionItemProps[] }>}
//  * @returns {Promise<{ contestPostData: ContestPostItemProps, leaderboardList: LeaderboardItemProps[], contestInfoData: ContestInfoItemProps[], contestInfoTitles: string[], contestNoticeList: ContestNoticeItemProps[], contestSubmissionList: ContestSubmissionItemProps[] }>}
 */
export const ContestAPI = {

  /**
   * 대회 페이지 조회 시 필요한 데이터 조회하는 API입니다.
   * @page /contest/[contestId]
   * @description 대회 상세 페이지 데이터를 조회하는 API입니다.
   * @param {number} contestId - 대회 ID (contestId)
   * @returns {Promise<{ contestPostData: ContestPostItemProps, contestInfoData: ContestInfoItemProps[], contestInfoTitles: string[], contestNoticeList: ContestNoticeItemProps[], contestSubmissionList: ContestSubmissionItemProps[] }>}
  //  * @returns {Promise<{ contestPostData: ContestPostItemProps, leaderboardList: LeaderboardItemProps[], contestInfoData: ContestInfoItemProps[], contestInfoTitles: string[], contestNoticeList: ContestNoticeItemProps[], contestSubmissionList: ContestSubmissionItemProps[] }>}
   */
  async getContestPostPageData(contestId: number) {
    const [
      { contestData: contestPostData },
      // { leaderboardList },
      // { contestInfoData },
      { contestNoticeList },
      { contestSubmissionList },
      // { contestMySubmissionList },
    ] = await Promise.all([

      ContestAPI.getContestDetailData(contestId),
      // ContestAPI.getContestLeaderboardList(contestId),
      // ContestAPI.getContestInfoData(contestId),
      ContestAPI.getContestNoticeList(contestId),
      ContestAPI.getContestSubmissionList(contestId),
      // ContestAPI.getContestMySubmissionItem(contestId),
    ]);

    return {
      contestPostData,
      // leaderboardList: leaderboardList || [],
      // contestInfoData: contestInfoData || [],
      contestInfoTitles: ["대회 정보", "상금 유형", "참여 통계", "해시태그"],
      contestNoticeList: contestNoticeList || [],
      contestSubmissionList: contestSubmissionList || [],
      // contestMySubmissionList: contestMySubmissionList || [],
    };
  },

  /**
   * 대회 목록 데이터 조회하는 API입니다.
   * @page /contest?page=1&size=10&sorter=&status=&title=&tag=
   * @endpoint /api/v1/contests?page={page}&size={size}&sorter={sorter}&status={status}&title={title}&tag={tag}
   * @description 대회 목록 데이터를 조회하는 API입니다.
   * @returns {Promise<{ contestCardList: ContestCardItemProps[] }>}
   */
  async getContestCardList(params?: {
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
      host: string;
      profileUrl: string;
      title: string;
      startAt: string;
      endAt: string;
      status: string; // "개최전", "종료" 등 한글
      createdAt: string;
      updatedAt: string;
    }

    interface ApiResponse {
      message: string | null;
      data: {
        contests: ContestApiResponse[];
      };
    }

    const response = await fetch(`http://localhost:3000/mock/ContestCardList.json`, {
      cache: "no-store",
    }).then(res => res.json());
    return {
      contestCardList: response.data.contests,
    };

    try {
      const response = await apiFetch<ApiResponse>(`/api/v1/contests?${queryParams.toString()}`);
      
      // API 응답을 그대로 반환 (필드명 변경 없이)
      const contestCardList: ContestCardItemProps[] = (response.data.contests || []).map((contest) => ({
        contestId: contest.contestId,
        host: contest.host,
        profileUrl: contest.profileUrl,
        title: contest.title,
        startAt: contest.startAt,
        endAt: contest.endAt,
        status: contest.status,
        createdAt: contest.createdAt,
        updatedAt: contest.updatedAt,
      }));

      return {
        contestCardList,
      };
    } catch (error) {
      console.error('대회 목록 조회 실패:', error);
      return {
        contestCardList: [],
      };
    }
  },

  /**
   * 대회 추가 요약 정보를 데이터 조회하는 API입니다.
   * @page /contest/[contestId]
   * @endpoint 목 데이터 사용중입니다. TODO : 삭제 예정?
   * @description 대회 정보를 데이터를 조회하는 API입니다.
   * @param {number} contestId - 대회 ID (contestId)
   * @returns {Promise<{ contestInfoData: ContestInfoItemProps[] }>}
   */
  // async getContestInfoData(contestId: number) {
  //   interface ApiResponse {
  //     message: string | null;
  //     data: ContestInfoItemProps[];
  //   }
  //   const response = await apiFetch<ApiResponse>(`/api/v1/contests/${contestId}/info`);
  //   // const response = await fetch(`/mock/ContestInfoItem.json?contestId=${contestId}`, {
  //   //     cache: "no-store",
  //   //   }
  //   // ).then(res => res.json());
  //   return {
  //     contestInfoData: response,
  //   };
  // },
  
  /**
   * 대회 상세 페이지를 조회하는 API입니다.
   * @page /contest/[contestId]
   * @endpoint /api/v1/contests/{contestId}
   * @description 대회 상세 페이지를 조회하는 API입니다.
   * @param {number} contestId - 대회 ID (contestId)
   * @returns {Promise<{ contestData: ContestPostItemProps }>}
   */
  async getContestDetailData(contestId: number) {

    try {
      interface ApiResponse {
      message: string | null;
      data: ContestPostItemProps;
    }
    const response = await apiFetch<ApiResponse>(`/api/v1/contests/${contestId}`);
      return {
        contestData: response.data,
      };
    } catch (error) {
      console.error('대회 상세 페이지 데이터 조회 실패:', error);
      throw new Error('대회를 찾을 수 없습니다');
    }
    // const response = await fetch(`http://localhost:3000/mock/ContestPostDetail.json`, {
    //   cache: "no-store",
    // }).then(res => res.json());
  },

  // /**
  //  * 대회 상세 페이지 리더보드 목록 데이터 조회하는 API입니다.
  //  * @page /contest/[contestId]?tab=leaderboard
  //  * @endpoint 목 데이터 사용중입니다. TODO : 삭제 예정?
  //  * @description 대회 상세 페이지 리더보드 목록 데이터를 조회하는 API입니다.
  //  * @param {number} contestId - 대회 ID (contestId)
  //  * @returns {Promise<{ leaderboardList: LeaderboardItemProps[] }>}
  //  */
  // async getContestLeaderboardList(contestId: number) {
  //   // const response = await apiFetch<LeaderboardItemProps[]>(`/api/v1/contests/${contestId}/leaderboards`);
  //   const response = await fetch(`/mock/ContestLeaderboardItem.json`, {
  //     cache: "no-store",
  //   }).then(res => res.json());
  //   return {
  //     leaderboardList: response.Leaderboard,
  //   };
  // },

  /**
   * 대회 상세 페이지 공지사항 목록 데이터 조회하는 API입니다.
   * @page /contest/[contestId]?tab=notice
   * @endpoint /api/v1/contests/{contestId}/notices
   * @description 대회 상세 페이지 공지사항 목록 데이터를 조회하는 API입니다.
   * @param {number} contestId - 대회 ID (contestId)
   * @returns {Promise<{ contestNoticeList: ContestNoticeItemProps[] }>}
   */
  async getContestNoticeList(contestId: number) {

    try {
      interface ApiResponse {
        message: string | null;
        data: {
          notices: ContestNoticeItemProps[];
        };
      }
      const response = await apiFetch<ApiResponse>(`/api/v1/contests/${contestId}/notices`);
      return {
        contestNoticeList: response.data.notices,
      };
    } catch (error) {
      console.error('공지사항 목록 조회 실패:', error);
      return {
        contestNoticeList: [],
      };
    }
    // const response = await fetch(`http://localhost:3000/mock/ContestNoticeData.json`, {
    //     cache: "no-store",
    //   }
    // ).then(res => res.json());
  },
  
  /**
   * 대회 상세 페이지 공지사항 데이터 조회하는 API입니다.
   * @page /contest/[contestId]/notice/[noticeId]
   * @endpoint /api/v1/contests/{contestId}/notices/{noticeId}
   * @description 대회 상세 페이지 공지사항 데이터를 조회하는 API입니다.
   * @param {number} noticeId - 공지사항 ID
   * @returns {Promise<{ noticeData: ContestNoticeDetailData }>}
   */
  async getContestNoticeDetailData(contestId: number, noticeId: number) {
    interface ApiResponse {
      message: string | null;
      data: ContestNoticeDetailData;
    }
    const response = await apiFetch<ApiResponse>(`/api/v1/contests/${contestId}/notices/${noticeId}`);
    // const response = await fetch(`/mock/ContestNoticeDetailData.json`, {
    //   cache: "no-store",
    // }).then(res => res.json());
    return {
      noticeData: response.data,
    };
  },

  /**
   * 대회 상세 페이지 산출물 목록 데이터 조회하는 API입니다.
   * @page /contest/[contestId]?tab=submission
   * @endpoint /api/v1/contests/{contestId}/submissions
   * @description 대회 상세 페이지 산출물 목록 데이터를 조회하는 API입니다.
   * @param {number} contestId - 대회 ID (contestId)
   * @returns {Promise<{ contestSubmissionList: ContestSubmissionItemProps[] }>}
  */
  async getContestSubmissionList(contestId: number) {
    try {
      interface ApiResponse {
        message: string | null;
        data: {
          submissions: ContestSubmissionItemProps[];
        };
      }
      const response = await apiFetch<ApiResponse>(`/api/v1/contests/${contestId}/submissions`);
      // const response = await fetch(`http://localhost:3000/mock/ContestSubmissionData.json`, {
      //   cache: "no-store",
      // }).then(res => res.json());
      return {
        contestSubmissionList: response.data.submissions,
      };
    } catch (error) {
      console.error('산출물 목록 조회 실패:', error);
      return {
        contestSubmissionList: [],
      };
    }
  },

  /**
   * 대회 상세 페이지 산출물 데이터 조회
   * @page /contest/[contestId]/submission/[submissionId]
   * @endpoint /api/v1/contests/{contestId}/submissions/{submissionId}
   * @description 대회 상세 페이지 산출물 데이터를 조회하는 API입니다.
   * @param {number} contestId - 대회 ID (contestId)
   * @param {number} submissionId - 산출물 ID (submissionId)
   * @returns {Promise<{ submissionData: ContestSubmissionDetailData }>}
   */
  async getContestSubmissionDetailData(contestId: number, submissionId: number) {

    interface ApiResponse {
      message: string | null;
      data: ContestSubmissionDetailData;
    }
    
    const response = await apiFetch<ApiResponse>(`/api/v1/contests/${contestId}/submissions/${submissionId}`);
    // const response = await fetch(`/mock/ContestSubmissionDetailData.json`, {
    //     cache: "no-store",
    //   }
    // ).then(res => res.json());
    return {
      submissionData: response.data,
    };
  },

  /**
   * 대회 산출물 투표
   * @page /contest/[contestId]/submission/[submissionId]
   * @endpoint /api/v1/contests/{contestId}/submissions/{submissionId}/votes
   * @description 대회 산출물 투표하는 API입니다.
   * @returns {Promise<{ message: string | null, data: null }>}
   */
  async createContestSubmissionVote(contestId: number, submissionId: number) {
    interface ApiResponse {
      message: string | null;
      data: null;
    }

    const response = await apiFetch<ApiResponse>(`/api/v1/contests/${contestId}/submissions/${submissionId}/votes`, {
      method: 'POST',
    });

    return {
      message: response.message,
      data: response.data,
    }
  },

  /**
   * 대회 산출물 삭제하는 API입니다.
   * @page /contest/[contestId]/submission/[submissionId]
   * @endpoint /api/v1/contests/{contestId}/submissions/{submissionId}
   * @description 대회 산출물 삭제하는 API입니다.
   * @param {number} contestId - 대회 ID (contestId)
   * @param {number} submissionId - 산출물 ID
   * @returns {Promise<{ message: string | null, data: null }>}
   */
  async deleteContestSubmission(contestId: number, submissionId: number) {
    interface ApiResponse {
      message: string | null;
      data: null;
    }
    const response = await apiFetch<ApiResponse>(`/api/v1/contests/${contestId}/submissions/${submissionId}`, {
      method: 'DELETE',
    });
    return {
      message: response.message,
      data: response.data,
    }
  },

  /**
   * 대회 산출물 수정하는 API입니다.
   * @page /contest/[contestId]/submission/[submissionId]
   * @endpoint /api/v1/contests/{contestId}/submissions/{submissionId}
   * @description 대회 산출물 수정하는 API입니다.
   * @param {number} contestId - 대회 ID (contestId)
   * @param {number} submissionId - 산출물 ID
   * @returns {Promise<{ message: string | null, data: null }>}
   */
  async updateContestSubmission(contestId: number, submissionId: number) {
    interface ApiResponse {
      message: string | null;
      data: null;
    }
    const response = await apiFetch<ApiResponse>(`/api/v1/contests/${contestId}/submissions/${submissionId}`, {
      method: 'PUT',
    });
    return {
      message: response.message,
      data: response.data,
    }
  },

  /**
   * 대회 내 산출물 목록 데이터 조회하는 API입니다.
   * @page /contest/[contestId]?tab=my-submission
   * @endpoint /api/v1/contests/{contestId}/submissions/me
   * @description 대회 내 산출물 목록 데이터를 조회하는 API입니다.
   * @param {number} contestId - 대회 ID (contestId)
   * @returns {Promise<{ contestMySubmissionItem: ContestSubmissionItemProps }>}
   */
  async getContestMySubmissionItem(contestId: number) {
    interface ApiResponse {
      message: string | null;
      data: ContestSubmissionItemProps;
    }
    const response = await apiFetch<ApiResponse>(`/api/v1/contests/${contestId}/submissions/me`);
    // const response = await fetch(`http://localhost:3000/mock/ContestMySubmissionData.json`, {
    //   cache: "no-store",
    // }).then(res => res.json());  
    return {
      contestMySubmissionItem: response.data,
    };
  },
};
