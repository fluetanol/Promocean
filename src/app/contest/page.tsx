// frontend/src/app/contest/page.tsx

// import ContestHeroSection from "@/components/section/ContestHeroSection";
import ContestCardSection from "@/components/section/ContestCardSection";
import ContestFooter from "@/components/layout/ContestFooter";
import { ContestAPI } from "@/api/contest";

interface ContestPageProps {
  searchParams: Promise<{
    page?: string;
    sorter?: string;
    title?: string;
    status?: string;
    tag?: string;
  }>;
}

/**
 * ContestPage component
 * @description ContestPage component is a contest page component that displays the contest page content
 * @returns {React.ReactNode}
 */
export default async function ContestPage({ searchParams }: ContestPageProps) {
  const params = await searchParams;
  
  // 쿼리 파라미터를 API 파라미터로 변환
  const apiParams = {
    ...(params.page && { page: parseInt(params.page, 10) }),
    ...(params.sorter && { sorter: params.sorter }),
    ...(params.title && { title: params.title }),
    ...(params.status && { status: params.status }),
    ...(params.tag && { tag: params.tag }),
  };

  const { contestCardList, itemCnt, totalCnt, totalPages, currentPage } = await ContestAPI.getList(apiParams);

  return (
    <>
      <ContestCardSection contestCardList={contestCardList} itemCnt={itemCnt} totalCnt={totalCnt} totalPages={totalPages} currentPage={currentPage} />
    </>
  );
}
