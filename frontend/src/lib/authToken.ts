// frontend/src/lib/authToken.ts

/**
 * 쿠키 기반 액세스 토큰 관리 유틸
 * - HttpOnly는 서버에서만 가능하므로 개발환경에서는 JS 접근 가능하게 관리
 * - SSR/CSR 모두 안전하게 동작
 * - HTTPS 환경일 때 자동으로 Secure 플래그 추가
 */

const ACCESS_TOKEN_KEY = 'access_token';
const ONE_WEEK = 60 * 60 * 24 * 7;

/**
 * 토큰 저장
 * @param token 저장할 access_token
 */
export function setAuthToken(token: string): void {
  if (typeof document === 'undefined') return; // SSR 안전 처리

  const isSecure = window.location.protocol === 'https:';
  const cookie = [
    `${ACCESS_TOKEN_KEY}=${encodeURIComponent(token)}`,
    'Path=/',
    `Max-Age=${ONE_WEEK}`,
    'SameSite=Lax',
    isSecure ? 'Secure' : '',
  ]
    .filter(Boolean)
    .join('; ');

  document.cookie = cookie;
}

/**
 * 토큰 가져오기
 * @returns access_token 문자열 또는 null
 */
export function getAuthToken(): string | null {
  if (typeof document === 'undefined') return null; // SSR 안전 처리

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${ACCESS_TOKEN_KEY}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * 토큰 삭제
 */
export function clearAuthToken(): void {
  if (typeof document === 'undefined') return;

  document.cookie = `${ACCESS_TOKEN_KEY}=; Path=/; Max-Age=0; SameSite=Lax`;
}
