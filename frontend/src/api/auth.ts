// frontend/src/api/auth.ts

import { AuthResponse, LoginRequest, SignUpRequest, DuplicateCheckResponse } from '@/types/authType';
import { apiFetch, BASE_URL } from '@/api/fetcher';
import { useAuthStore } from '@/store/authStore';
import { ApiResponse } from '@/types/apiTypes/common';

export const authAPI = {

  /**
   * 로그인 API
   * @page /auth/login?tab=login
   * @endpoint /api/v1/auth/login
   * @param credentials - 로그인 요청 데이터
   * @returns 로그인 응답 데이터와 토큰
   */
  async login(credentials: LoginRequest): Promise<{ payload: AuthResponse; token: string }> {
    const endpoint = `/api/v1/auth/login`;
    const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
      credentials: "include",
    });

    // 응답 헤더에서 토큰 추출
    const token =
      response.headers.get('Authorization')?.replace('Bearer ', '') ||
      response.headers.get('X-Access-Token') ||
      null;

    // 응답 파싱
    const contentType = response.headers.get('content-type') || '';
    let payload: AuthResponse;

    if (contentType.includes('application/json')) {
      payload = await response.json();
    } else {
      const textPayload = await response.text();
      throw new Error(`예상치 못한 응답 형식: ${textPayload}`);
    }

    // 에러 처리
    if (!response.ok) {
      const errorMessage = payload.message || '로그인에 실패했습니다.';
      throw new Error(`${response.status} ${errorMessage}`);
    }

    // 응답 검증
    if (!payload.data || !token) {
      throw new Error(payload.message || '로그인에 실패했습니다.');
    }

    // 상태 관리 로직은 제거하고 결과만 반환
    return { payload, token };
  },

  /**
   * 회원가입 API
   * @page /auth/login?tab=signup
   * @endpoint /api/v1/members/join
   * @param userData - 회원가입 요청 데이터
   * @returns 회원가입 응답 데이터
   */
  async signUp(userData: SignUpRequest): Promise<void> {
    const endpoint = `/api/v1/members/join`;
    const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    // 응답 파싱
    const contentType = response.headers.get('content-type') || '';
    let payload: AuthResponse;

    if (contentType.includes('application/json')) {
      payload = await response.json();
    } else {
      const textPayload = await response.text();
      throw new Error(`예상치 못한 응답 형식: ${textPayload}`);
    }

    // 에러 처리
    if (!response.ok) {
      const errorMessage = payload.message || '회원가입에 실패했습니다.';
      throw new Error(`${response.status} ${errorMessage}`);
    }

    // 응답 검증
    if (!payload) {
      throw new Error('회원가입 응답이 없습니다.');
    }

    if (payload.message) {
      throw new Error(payload.message);
    }
    return;
  },

  /**
   * 중복확인 API (이메일 또는 닉네임)
   * @page /auth/login?tab=signup
   * @endpoint /api/v1/members?email=email&nickname=nickname
   * @param options - 중복확인 옵션 (email 또는 nickname 중 하나만 전달)
   * @returns 중복확인 응답 데이터
   */
  async checkDuplicate(options: { email?: string; nickname?: string }): Promise<DuplicateCheckResponse> {
    const params = new URLSearchParams();
    if (options.email) {
      params.set('email', options.email);
    }
    if (options.nickname) {
      params.set('nickname', options.nickname);
    }
    return apiFetch<DuplicateCheckResponse>(`/api/v1/members?${params.toString()}`, {
      method: 'GET',
    });
  },

  /**
   * 로그아웃 API
   * @endpoint /api/v1/auth/logout
   */
  async logout(): Promise<void> {
    try {
      await apiFetch<{ message: string | null; data: null }>(`/api/v1/auth/logout`, {
        method: 'POST',
      });
    } catch {
      // 에러가 발생해도 로그아웃은 진행
    }
    const { logout } = useAuthStore.getState();
    logout();
    // 클라이언트 사이드 리다이렉트는 호출하는 쪽에서 처리
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  },


  async getMemberinfo(params : {email? : string, nickname? : string}): Promise<MemberInfo> {

    const searchParams = new URLSearchParams();
    if(params.email){
      searchParams.append('email', params.email);
    }
    if(params.nickname){
      searchParams.append('nickname', params.nickname);
    }


    const res = await apiFetch<ApiResponse<MemberInfo>>('/api/v1/members/search?' + searchParams.toString(), {
      method: 'GET',
    });

    return res.data
  },

  /**
   * 회원탈퇴 API
   * @endpoint /api/v1/members/withdrawal
   * @returns 회원탈퇴 응답 데이터
   */
  async withdrawal(): Promise<void> {
    await apiFetch<ApiResponse<null>>('/api/v1/members/withdrawal', {
      method: 'DELETE',
    });

    // 회원탈퇴 성공 시 로그아웃 처리
    const { logout } = useAuthStore.getState();
    logout();

    return;
  },

  /**
   * 회원 정보 수정 API
   * @endpoint /api/v1/members/me
   * @param updateData - 회원 정보 수정 데이터 (filePath, password, nickname)
   * @returns 회원 정보 수정 응답 데이터
   */
  async updateMember(updateData: { filePath?: string; password?: string; nickname?: string }): Promise<void> {
    await apiFetch<ApiResponse<null>>('/api/v1/members', {
      method: 'PATCH',
      body: JSON.stringify(updateData),
    });

    return;
  }, // <- updateMember 함수를 닫는 괄호

  /**
   * 잔여 토큰 조회 API
   * @endpoint /api/v1/auth/rest-token
   * @returns 
   */
  async getRestToken() : Promise<getRestTokenResponse> {
    const res = await apiFetch<ApiResponse<getRestTokenResponse>>('/api/v1/members/token', {
      method: 'GET',
    });

    return res.data

  }

};

export interface getRestTokenResponse{
    usableToken : number;
}


export interface MemberInfo{

    nickname: string;
    email: string;
    profileUrl: string | null;

}