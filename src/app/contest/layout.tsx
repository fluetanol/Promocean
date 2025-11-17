// frontend/src/app/contest/layout.tsx

import ContestHeader from "@/components/layout/ContestHeader";
import CommunityFloatingSection from "@/components/section/CommunityFloatingSection";
import { PostAPI } from "@/api/community";

/**
 * ContestLayout component
 * @description ContestLayout component is a contest layout component that displays the contest layout content
 * @returns {React.ReactNode}
 */
export default async function ContestLayout({ children }: { children: React.ReactNode }) {
  // 인기글 데이터 가져오기
  const { popularPosts } = await PostAPI.getPopular();

  return (
    <div className="min-h-screen bg-gray-50">
      <ContestHeader />

      {/* 전체 컨테이너: 왼쪽 기준 full-width + 좌우 패딩 */}
      <div className="flex flex-row gap-6 px-4 lg:px-8 pt-8 pb-8">
        {/* 왼쪽: 페이지 컨텐츠 (남는 영역 전부) */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          {children}
        </div>

        {/* 오른쪽: 플로팅 섹션 (인기글) */}
        <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-24 self-start">
          <CommunityFloatingSection popularPosts={popularPosts} />
        </aside>
      </div>
    </div>
  );
}