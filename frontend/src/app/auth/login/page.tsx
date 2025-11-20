'use client';

// frontend/src/app/auth/login/page.tsx

import { useSearchParams, useRouter } from 'next/navigation';
import { useMemo, Suspense } from 'react';
import LoginTabs from "@/components/filter/LoginTabs";
import SignInForm from "@/components/form/SignInForm";
import SignUpForm from "@/components/form/SignUpForm";

function LoginPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL 쿼리 파라미터에서 탭 상태 읽기
  const activeTab = useMemo(() => {
    const tab = searchParams.get('tab');
    return tab === 'signup' ? 'signup' : 'login';
  }, [searchParams]);

  // 탭 변경 시 URL 업데이트
  const handleTabChange = (tab: 'login' | 'signup') => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', tab);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background" >
      {/* 로그인 폼 컨테이너 */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-background/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-primary/20">
          {/* 탭 */}
          <LoginTabs activeTab={activeTab} onTabChange={handleTabChange} />
          
          {/* 폼 내용 */}
          {activeTab === 'login' ? <SignInForm /> : <SignUpForm />}
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">로딩 중...</div>
      </div>
    }>
      <LoginPageContent />
    </Suspense>
  );
}
