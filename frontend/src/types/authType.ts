// frontend/src/types/auth.ts


// Request & Response

/**
 * 인증 응답 인터페이스
 * @property message - 메시지
 * @property data - 데이터
 * @property data.nickname - 닉네임
 * @property data.email - 이메일
 * @property data.profileUrl - 프로필 이미지 URL
 * @property data.personalSpaceId - 개인 스페이스 ID
 */
export interface AuthResponse {
  message: string | null;
  data: {
    nickname: string;
    email: string;
    profileUrl: string;
    personalSpaceId: number;
    isRead : boolean; //알림 읽음 여부
                      //false면 알림 표시 하면 됨
  } | null;
}


/**
 * 로그인 요청 인터페이스
 * @property email - 이메일
 * @property password - 비밀번호
 */
export interface LoginRequest {
  email: string;
  password: string;
}


/**
 * 회원가입 요청 인터페이스
 * @property email - 이메일
 * @property password - 비밀번호
 * @property nickname - 닉네임
 */
export interface SignUpRequest {
  email: string;
  password: string;
  nickname: string;
}

/**
 * 중복확인 응답 인터페이스
 * @property message - 메시지
 * @property data - 중복 여부 (true: 중복됨, false: 중복 안됨 - 사용 가능)
 */
export interface DuplicateCheckResponse {
  message: string | null;
  data: {
    isDuplicated: boolean;
  } | null;
}