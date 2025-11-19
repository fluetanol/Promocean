// frontend/src/components/section/ContestSubmissionSection.tsx

import { ContestSubmissionItemProps } from "@/types/itemType";
import ContestSubmissionList from "@/components/list/ContestSubmissionList";
import ContestSubmissionButtonSection from "@/components/section/ContestSubmissionButtonSection";

/**
 * ContestSubmissionSection component
 * @description ContestSubmissionSection component is a contest submission section component that displays the contest submission section content
 * @returns {React.ReactNode}
*/
export default function ContestSubmissionSection({ 
  contestSubmissionList, 
  endAt 
}: { 
  contestSubmissionList: ContestSubmissionItemProps[]
  endAt: string
}) {
  // 제출 종료 여부 확인
  const contestEnd = new Date(endAt);
  const now = new Date();
  const isContestEnded = now >= contestEnd;

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">제출 목록</h2>
        <ContestSubmissionButtonSection />
      </div>
      {!isContestEnded ? (
        <div className="mt-8 text-center py-12">
          <p className="text-gray-500 text-lg">제출이 종료된 이후에 산출물을 확인할 수 있습니다.</p>
        </div>
      ) : contestSubmissionList.length === 0 ? (
        <div className="mt-8 text-center py-12">
          <p className="text-gray-500 text-lg">제출된 산출물이 없습니다.</p>
        </div>
      ) : (
        <ContestSubmissionList contestSubmissionList={contestSubmissionList} />
      )}
    </div>
  )
}