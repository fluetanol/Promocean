// frontend/src/components/section/ContestSubmissionSection.tsx

import { ContestSubmissionItemProps } from "@/types/itemType";
import ContestSubmissionList from "@/components/list/ContestSubmissionList";
import ContestSubmissionButtonSection from "@/components/section/ContestSubmissionButtonSection";

/**
 * ContestSubmissionSection component
 * @description ContestSubmissionSection component is a contest submission section component that displays the contest submission section content
 * @returns {React.ReactNode}
*/
export default function ContestSubmissionSection({ contestSubmissionList }: { contestSubmissionList: ContestSubmissionItemProps[] }) {
  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">제출 목록</h2>
        <ContestSubmissionButtonSection />
      </div>
      <ContestSubmissionList contestSubmissionList={contestSubmissionList} />
    </div>
  )
}