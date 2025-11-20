'use client';

// frontend/src/components/form/SignUpForm.tsx

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/api/auth';


export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [emailChecked, setEmailChecked] = useState(false);
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);
  const [nicknameAvailable, setNicknameAvailable] = useState<boolean | null>(null);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);
  const router = useRouter();

  // 이메일 중복확인
  const handleCheckEmail = async () => {
    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    setIsCheckingEmail(true);
    try {
      const response = await authAPI.checkDuplicate({ email });
      if (response.data) {
        const isDuplicated = response.data.isDuplicated;
        const available = !isDuplicated; // isDuplicated가 false면 사용 가능
        setEmailAvailable(available);
        setEmailChecked(true);
        if (isDuplicated) {
          alert('이미 사용 중인 이메일입니다.');
        }
      } else {
        throw new Error(response.message || '이메일 중복확인에 실패했습니다.');
      }
    } catch (error) {
      console.error('이메일 중복확인 실패:', error);
      alert(error instanceof Error ? error.message : '이메일 중복확인에 실패했습니다.');
      setEmailAvailable(false);
      setEmailChecked(false);
    } finally {
      setIsCheckingEmail(false);
    }
  };

  // 닉네임 중복확인
  const handleCheckNickname = async () => {
    if (!nickname) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    if (nickname.length < 2) {
      alert('닉네임은 2자 이상 입력해주세요.');
      return;
    }

    setIsCheckingNickname(true);
    try {
      const response = await authAPI.checkDuplicate({ nickname });
      if (response.data) {
        const isDuplicated = response.data.isDuplicated;
        const available = !isDuplicated; // isDuplicated가 false면 사용 가능
        setNicknameAvailable(available);
        setNicknameChecked(true);
        if (isDuplicated) {
          alert('이미 사용 중인 닉네임입니다.');
        }
      } else {
        throw new Error(response.message || '닉네임 중복확인에 실패했습니다.');
      }
    } catch (error) {
      console.error('닉네임 중복확인 실패:', error);
      alert(error instanceof Error ? error.message : '닉네임 중복확인에 실패했습니다.');
      setNicknameAvailable(false);
      setNicknameChecked(false);
    } finally {
      setIsCheckingNickname(false);
    }
  };

  // 이메일 변경 시 중복확인 상태 초기화
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailChecked(false);
    setEmailAvailable(null);
  };

  // 닉네임 변경 시 중복확인 상태 초기화
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setNicknameChecked(false);
    setNicknameAvailable(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 비밀번호 확인
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 중복확인 검증
    if (!emailChecked || !emailAvailable) {
      alert('이메일 중복확인을 완료해주세요.');
      return;
    }

    if (!nicknameChecked || !nicknameAvailable) {
      alert('닉네임 중복확인을 완료해주세요.');
      return;
    }

    try {
      await authAPI.signUp({ email, password, nickname });
      alert('회원가입이 완료되었습니다.');
      router.push('/auth/login?tab=login');
    } catch (error) {
      alert(error instanceof Error ? error.message : '회원가입에 실패했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 제목 */}
      <h1 className="text-3xl font-bold text-text mb-8">회원가입</h1>
      
      {/* 이메일 입력 */}
      <div>
        <label className="block text-text text-sm font-medium mb-2">
          이메일
        </label>
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            required
            className="flex-1 px-4 py-3 rounded-lg bg-white text-text border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
          <button
            type="button"
            onClick={handleCheckEmail}
            disabled={isCheckingEmail || !email}
            className="px-4 py-3 bg-primary hover:bg-primary/90 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors whitespace-nowrap shadow-md hover:shadow-lg"
          >
            {isCheckingEmail ? '확인중...' : '중복확인'}
          </button>
        </div>
        {emailChecked && emailAvailable !== null && (
          <p className={`mt-2 text-sm ${emailAvailable ? 'text-green-600' : 'text-red-600'}`}>
            {emailAvailable ? '✓ 사용 가능한 이메일입니다.' : '✗ 이미 사용 중인 이메일입니다.'}
          </p>
        )}
      </div>

      {/* 비밀번호 입력 */}
      <div>
        <label className="block text-text text-sm font-medium mb-2">
          비밀번호
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full px-4 py-3 rounded-lg bg-white text-text border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>

      {/* 비밀번호 확인 입력 */}
      <div>
        <label className="block text-text text-sm font-medium mb-2">
          비밀번호 확인
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
          required
          className="w-full px-4 py-3 rounded-lg bg-white text-text border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>

      {/* 닉네임 입력 */}
      <div>
        <label className="block text-text text-sm font-medium mb-2">
          닉네임
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            placeholder="Nickname"
            required
            className="flex-1 px-4 py-3 rounded-lg bg-white text-text border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
          <button
            type="button"
            onClick={handleCheckNickname}
            disabled={isCheckingNickname || !nickname}
            className="px-4 py-3 bg-primary hover:bg-primary/90 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors whitespace-nowrap shadow-md hover:shadow-lg"
          >
            {isCheckingNickname ? '확인중...' : '중복확인'}
          </button>
        </div>
        {nicknameChecked && nicknameAvailable !== null && (
          <p className={`mt-2 text-sm ${nicknameAvailable ? 'text-green-600' : 'text-red-600'}`}>
            {nicknameAvailable ? '✓ 사용 가능한 닉네임입니다.' : '✗ 이미 사용 중인 닉네임입니다.'}
          </p>
        )}
      </div>

      {/* 회원가입 버튼 */}
      <button 
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg"
      >
        Sign Up
      </button>
    </form>
  );
}