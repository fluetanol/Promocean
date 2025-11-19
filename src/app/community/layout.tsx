// frontend/src/app/community/layout.tsx

import CommunityHeader from "@/components/layout/CommunityHeader";
import CommunityFloatingSection from "@/components/section/CommunityFloatingSection";
import CommunityTabs from "@/components/filter/CommunityTabs";
import { PostAPI } from "@/api/community";
import { Suspense } from "react";

// ISR: 60초마다 재생성
export const revalidate = 60;

/**
 * CommunityLayout component
 * @description CommunityLayout component is a community layout component that displays the community layout content
 * @returns {React.ReactNode}
 */
export default async function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 인기글 데이터 가져오기
  const { popularPosts } = await PostAPI.getPopular("3");

  return (
    <div className="min-h-screen bg-gray-50">
      <CommunityHeader />

      <Suspense fallback={<div>Loading...</div>}>
        <CommunityTabs />
      </Suspense>

      <div className="flex flex-row gap-6 px-4 lg:px-8 pt-8 pb-8">
        
        {/* 왼쪽: 컨텐츠 (남는 공간 전부 사용) */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          {children}
        </div>

        {/* 오른쪽: 고정폭 플로팅 섹션 */}
        <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-24 self-start">
          <CommunityFloatingSection popularPosts={popularPosts} />
        </aside>

      </div>
    </div>
  );
}
