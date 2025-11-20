'use client';

// frontend/src/components/form/SignInForm.tsx

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/api/auth';
import { useAuthStore } from '@/store/authStore';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      const { payload, token } = await authAPI.login({ email, password });
      
      const user = {
        email: payload.data!.email,
        nickname: payload.data!.nickname,
        profileUrl: payload.data!.profileUrl,
        personalSpaceId: payload.data!.personalSpaceId,
        isRead : payload.data!.isRead
      };
      console.log(user);
      useAuthStore.getState().login(user, token);
      
      router.push('/');
    } catch (error) {
      console.error('로그인 실패:', error);
      let errorMessage = '로그인에 실패했습니다.';

      if (error instanceof Error) {
        const match = error.message.match(/\d+\s(.+)/);
        errorMessage = match ? match[1] : error.message;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 제목 */}
      <h1 className="text-3xl font-bold text-text mb-8">로그인</h1>
      
      {/* 에러 메시지 */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      {/* 이메일 입력 */}
      <div>
        <label className="block text-text text-sm font-medium mb-2">
          이메일
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(null); // 입력 시 에러 메시지 초기화
          }}
          placeholder="Username"
          required
          disabled={isLoading}
          className="w-full px-4 py-3 rounded-lg bg-white text-text border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      {/* 비밀번호 입력 */}
      <div>
        <label className="block text-text text-sm font-medium mb-2">
          비밀번호
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(null); // 입력 시 에러 메시지 초기화
          }}
          placeholder="Password"
          required
          disabled={isLoading}
          className="w-full px-4 py-3 rounded-lg bg-white text-text border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      {/* TODO : 비밀번호 찾기 링크 삭제 예정 (API 없음) */}
      {/* <div className="text-right">
        <a href="#" className="text-sm text-text/70 hover:text-primary transition-colors">
          계정을 잊으셨나요? <span className="text-primary">계정 찾기</span>
        </a>
      </div> */}

      {/* 로그인 버튼 */}
      <button 
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? '로그인 중...' : 'Log in'}
      </button>
    </form>
  );
}