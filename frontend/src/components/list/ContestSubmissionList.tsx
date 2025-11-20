// frontend/src/components/list/ContestSubmissionList.tsx

import { ContestSubmissionItemProps } from "@/types/itemType";
import ContestSubmissionItem from "@/components/item/ContestSubmissionItem";

/**
 * ContestSubmissionList component
 * @description ContestSubmissionList component is a contest submission list component that displays the contest submission list content
 * @returns {React.ReactNode}
 */
export default function ContestSubmissionList({ contestSubmissionList }: { contestSubmissionList: ContestSubmissionItemProps[] }) {
  return (
    <div>
      {contestSubmissionList.map((item) => (
        <ContestSubmissionItem key={item.submissionId} {...item} />
      ))}
    </div>
  )
}