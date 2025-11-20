'use client';

// frontend/src/components/layout/MypageHeader.tsx

import { useAuthStore } from "@/store/authStore";
import Image from "next/image";
import UserCircle from "@/components/icon/UserCircle";

/**
 * 마이페이지 헤더 컴포넌트
 * 사용자 프로필 이미지와 닉네임을 표시합니다.
 */
export default function MypageHeader() {
  const { user } = useAuthStore();
  const nickname = user?.nickname || "익명의 사용자";
  const profileUrl = user?.profileUrl;

  return (
    <header className="w-full bg-primary">
      <div className="relative flex flex-row items-center px-8 py-6 text-white">
        {/* 프로필 이미지 */}
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-white/20 mr-4 flex-shrink-0">
          {profileUrl ? (
            <Image
              src={profileUrl}
              alt="프로필 이미지"
              fill
              sizes="64px"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <UserCircle className="w-10 h-10 text-white/80" />
            </div>
          )}
        </div>

        {/* 제목 */}
        <div>
          <h1 className="text-2xl font-semibold">
            {nickname}님의 마이페이지
          </h1>
          <p className="text-sm text-white/90 mt-1">
            프로필 정보를 수정하고 계정을 관리할 수 있습니다.
          </p>
        </div>
      </div>
    </header>
  );
}

