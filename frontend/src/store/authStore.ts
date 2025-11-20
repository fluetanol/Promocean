// frontend/src/store/authStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { setAuthToken, clearAuthToken } from '@/lib/authToken';

/**
 * User 인터페이스
 * @property email - 사용자 이메일
 * @property nickname - 사용자 닉네임
 * @property profileUrl - 사용자 프로필 이미지 URL
 * @property personalSpaceId - 개인 스페이스 ID
 * @property isRead - 알림 읽음 여부 (false면 알림 표시 하면 됨)
 */
interface User {
  email: string;
  nickname: string;
  profileUrl: string;
  personalSpaceId: number;
  isRead : boolean; //알림 읽음 여부
                    //false면 알림 표시 하면 됨
}

/**
 * AuthState 인터페이스
 * @property isLoggedIn - 로그인 여부
 * @property user - 사용자 정보
 * @property token - 토큰
 * @property login - 로그인 함수
 * @property logout - 로그아웃 함수
 */
interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      token: null,

      login: (user: User, token: string) => {
        setAuthToken(token);
        set({
          isLoggedIn: true,
          user,
          token,
        });
      },
        
      logout: () => {
        clearAuthToken();
        set({
          isLoggedIn: false,
          user: null,
          token: null,
        });
      },
    }),
    {
      name: 'auth-storage',
      // persist 미들웨어를 사용할 때, token은 제외하고 저장.
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        user: state.user,
      }),
    }
  )
);
