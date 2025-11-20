// frontend/src/app/contest/[contestId]/page.tsx

import ContestPostSection from "@/components/section/ContestPostSection";
import { ContestAPI, NoticeAPI, SubmissionAPI } from "@/api/contest";
import { ContestSubmissionItemProps } from "@/types/itemType"; 

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

  // 각각 API 호출
  const { contestData: contestPostData } = await ContestAPI.getDetail(contestId);
  const { contestNoticeList } = await NoticeAPI.list(contestId);
  
  // 날짜 조건 체크: 대회 종료 후에만 제출물 목록 조회
  const endAt = new Date(contestPostData.endAt);
  const now = new Date();
  const isContestEnded = now >= endAt;
  
  // 날짜 조건이 맞으면 제출물 목록 조회, 안 맞으면 빈 배열
  let contestSubmissionList: ContestSubmissionItemProps[] = [];
  if (isContestEnded) {
    try {
      const result = await SubmissionAPI.list(contestId);
      contestSubmissionList = result.contestSubmissionList || [];
    } catch (error) {
      contestSubmissionList = [];
    }
  }

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
