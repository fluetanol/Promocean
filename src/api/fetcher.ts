// frontend/src/api/fetcher.ts

import { getAuthToken } from '@/lib/authToken';

// 환경 변수 기반 기본 URL 설정
// 프로덕션에서는 NEXT_PUBLIC_BASE_URL 환경 변수가 필수입니다
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
if (!BASE_URL) {
  throw new Error('NEXT_PUBLIC_BASE_URL 환경 변수가 설정되지 않았습니다.');
}

/**
 * API 요청 공통 래퍼 (fetch 기반)
 * - BASE_URL 자동 prepend
 * - Authorization 헤더 자동 추가
 * - FormData 감지 및 Content-Type 예외 처리
 * - JSON 자동 직렬화 / 역직렬화
 * - 에러 통합 처리
 * - 기본적으로 SSR(fetch cache: 'no-store') 동작
 */
export async function apiFetch<T = unknown>(
  input: string,
  init: RequestInit & { token?: string | null } = {}
): Promise<T> {
  // 클라이언트에서는 쿠키에서, 서버에서는 전달된 token 사용
  let token: string | null = null;
  if (typeof window !== 'undefined') {
    // 클라이언트 환경
    token = getAuthToken();
  } else if (init.token !== undefined) {
    // 서버 환경에서 token이 전달된 경우
    token = init.token;
  }

  // init에서 token 제거 (fetch에 전달되지 않도록)
  const { token: _, ...fetchInit } = init;
  
  const headers = new Headers(fetchInit.headers || {});
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const isFormData =
    typeof FormData !== 'undefined' && fetchInit.body instanceof FormData;
  if (!isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const url = input.startsWith('http') ? input : `${BASE_URL}${input}`;

  const response = await fetch(url, {
    cache: 'no-store',
    ...fetchInit,
    headers: headers as HeadersInit,
  });

  // --- 응답 파싱 ---
  const contentType = response.headers.get('content-type') || '';
  let payload: unknown;

  try {
    if (contentType.includes('application/json')) {
      payload = await response.json();
    } else {
      const textPayload = await response.text();
      if (textPayload.trim().startsWith('<!DOCTYPE') || textPayload.trim().startsWith('<html')) {
        if (response.status === 404) throw new Error('404 요청한 리소스를 찾을 수 없습니다.');
        throw new Error(`${response.status} 서버 에러가 발생했습니다.`);
      }
      payload = textPayload;
    }
  } catch (error) {
    if (error instanceof Error) throw error;
    payload = {};
  }

  // --- 에러 처리 ---
  if (!response.ok) {
    let errorMessage = '요청이 실패했습니다.';
    if (typeof payload === 'string') {
      if (!payload.trim().startsWith('<!DOCTYPE') && !payload.trim().startsWith('<html')) {
        errorMessage = payload || errorMessage;
      }
    } else if (payload && typeof payload === 'object') {
      const payloadObj = payload as Record<string, unknown>;
      if ('message' in payloadObj && typeof payloadObj.message === 'string' && payloadObj.message) {
        errorMessage = payloadObj.message;
      }
    }
    if (response.status === 404) errorMessage = '요청한 리소스를 찾을 수 없습니다.';
    throw new Error(`${response.status} ${errorMessage}`);
  }

  return payload as T;
}
