// frontend/src/app/contest/[contestId]/page.tsx

import ContestPostSection from "@/components/section/ContestPostSection";
import { ContestAPI } from "@/api/contest"; 

interface ContestPostPageProps {
  params: Promise<{ contestId: string }>;
}

/**
 * ContestPostPage component
 * @description 대회 상세 게시글 페이지
 * @returns {React.ReactNode}
 */
export default async function ContestPostPage({ params }: ContestPostPageProps) {
  const { contestId: contestIdStr } = await params;
  const contestId = parseInt(contestIdStr, 10);

  const {
    contestPostData,
    contestNoticeList,
    contestSubmissionList,
  } = await ContestAPI.getContestPostPageData(contestId);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl pl-8 pr-4 py-8 flex flex-row gap-6 relative">
        {/* 왼쪽: 게시글 섹션 */}
        <div className="flex-1 flex flex-col gap-6 bg-white rounded-lg shadow-md">
          <ContestPostSection
            contestPostData={contestPostData}
            ContestNoticeList={contestNoticeList}
            contestSubmissionList={contestSubmissionList}
          />
        </div>
      </div>
    </div>
  );
}
