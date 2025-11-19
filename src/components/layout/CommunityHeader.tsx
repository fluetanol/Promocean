// frontend/src/components/layout/CommunityHeader.tsx

"use client";

import React from "react";

/**
 * CommunityHeader component
 * @description CommunityHeader component is a community header component that displays the community header content
 * @returns {React.ReactNode}
 */
export default function CommunityHeader() {
  return (
    <header className="w-full">
      {/* 상단 영역 - 전체 너비 */}
      <div className="flex items-center bg-primary text-white px-8 py-6 w-full">
        <div className="w-20 h-20 bg-white/90 rounded-full mr-6 bg-[url('/assets/community.png')] bg-center bg-cover saturate-150">
        </div>
        <div>
          <h1 className="text-3xl font-semibold">커뮤니티</h1>
          <p className="text-white/80 text-sm">Promocean 커뮤니티 공간</p>
        </div>
      </div>
    </header>
  );
}
