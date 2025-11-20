// frontend/src/components/layout/ContestHeader.tsx

"use client";

import React from "react";

/**
 * ContestHeader component
 * @description ContestHeader component is a contest header component that displays the contest header content
 * @returns {React.ReactNode}
 */
export default function ContestHeader() {
  return (
    <header className="w-full">
      {/* 상단 영역 - 전체 너비 */}
      <div className="flex items-center bg-primary text-white px-8 py-6 w-full">
        <div className="w-20 h-20 bg-white/90 rounded-full mr-6 bg-[url('/assets/contest.png')] bg-center bg-cover saturate-150"></div>
        <div>
          <h1 className="text-3xl font-semibold">프롬프트 대회</h1>
          <p className="text-white/80 text-sm">창의적인 프롬프트로 경쟁하고 상을 받으세요</p>
        </div>
      </div>
    </header>
  );
}

