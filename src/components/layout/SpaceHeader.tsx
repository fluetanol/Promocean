// frontend/src/components/layout/SpaceHeader.tsx

"use client";

import { useAuthStore } from "@/store/authStore";
import React from "react";

/**
 * SpaceHeaderProps 인터페이스
 * @property {boolean} [isTeamSpace] - 팀 스페이스 여부
 * @property {string} [description] - 설명 텍스트
 */
export interface SpaceHeaderProps {
    isTeamSpace?: boolean;
    description?: string;
}

/**
 * 스페이스 페이지의 기본 헤더 컴포넌트
 * 제목과 설명만 표시합니다.
 *
 * @param param0 - SpaceHeaderProps 객체의 분해 할당
 * @property nickname - 사용자 닉네임
 * @property isTeamSpace - 팀 스페이스 여부
 * @property description - 헤더 부연 설명 텍스트
 *
 * isTeamSpace가 true이면 '팀 스페이스', false이거나 undefined이면 '마이 스페이스'로 표시됩니다.
 *
 * @returns {JSX.Element} 헤더 컴포넌트
 */
export default function SpaceHeader(
  {isTeamSpace = false, description}: SpaceHeaderProps) {

    const authStore = useAuthStore();
    const nickname = authStore.user?.nickname || "익명의 사용자";


  return (
    <header className="w-full">
      {/* 상단 영역 - 전체 너비 */}
      <div className="flex flex-row justify-between items-center bg-primary text-white px-8 py-6 w-full">
        <div>
          <h1 className="text-3xl font-semibold">{nickname} 님의
            {isTeamSpace ? ' 팀 스페이스' : ' 마이 스페이스'}</h1>
          <p className="text-white/80 text-sm">{description}</p>
        </div>
      </div>
    </header>
  );
}