// frontend/src/app/community/page.tsx

import CommunityBoardSection from "@/components/section/CommunityBoardSection";
import CommunityFooter from "@/components/layout/CommunityFooter";
import { CommunityAPI } from "@/api/community";

interface CommunityPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    sorter?: string;
    author?: string;
    title?: string;
    tag?: string;
  }>;
}

/**
 * CommunityPage component
 * @description CommunityPage component is a community page component that displays the community page content
 * @returns {React.ReactNode}
 */
export default async function CommunityPage({ searchParams }: CommunityPageProps) {
  const params = await searchParams;
  
  // 쿼리 파라미터를 API 파라미터로 변환
  const apiParams = {
    ...(params.page && { page: parseInt(params.page, 10) }),
    ...(params.category && { category: params.category }),
    ...(params.sorter && { sorter: params.sorter }),
    ...(params.author && { author: params.author }),
    ...(params.title && { title: params.title }),
    ...(params.tag && { tag: params.tag }),
  };

  const { communityBoardList, itemCnt, totalCnt, totalPages, currentPage } = await CommunityAPI.getCommunityBoardList(apiParams);

  return (
    <div className="flex flex-col">
      <CommunityBoardSection communityBoardList={communityBoardList} />
      <CommunityFooter itemCnt={itemCnt} totalCnt={totalCnt} totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
}
