// frontend/src/lib/serverAuthToken.ts

import { cookies } from 'next/headers';

/**
 * 서버 컴포넌트에서 액세스 토큰을 가져오는 헬퍼 함수
 * @returns access_token 문자열 또는 null
 */
export async function getServerAuthToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const accessTokenCookie = cookieStore.get('access_token');
    return accessTokenCookie ? decodeURIComponent(accessTokenCookie.value) : null;
  } catch (error) {
    // 서버 환경이 아닌 경우 (클라이언트에서 호출된 경우)
    return null;
  }
}

