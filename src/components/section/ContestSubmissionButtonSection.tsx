// frontend/src/components/section/ContestSubmissionButtonSection.tsx

'use client';

import { useParams, useRouter } from "next/navigation";
import { ContestAPI } from "@/api/contest";

/**
 * ContestSubmissionButtonSection component
 * @description ContestSubmissionButtonSection component is a contest submission button section component that displays the contest submission button section content
 * @returns {React.ReactNode}
 */
export default function ContestSubmissionButtonSection() {

  const router = useRouter();
  const params = useParams();
  const contestId = Number(params.contestId);

  const handleViewMySubmission = async () => {
    try {
      const { contestMySubmissionItem } = await ContestAPI.getContestMySubmissionItem(contestId);
      if (contestMySubmissionItem?.submissionId) {
        router.push(`/contest/${contestId}/submission/${contestMySubmissionItem.submissionId}`);
      }
    } catch (error) {
      console.error('내 산출물 조회 실패:', error);
    }
  }

  const handleSubmitSubmission = () => {
    router.push(`/post`);
  }

  return (
    <div className="flex flex-row items-center justify-end gap-2">
      <button
        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 active:bg-primary/80 transition-colors duration-200 cursor-pointer"
        onClick={handleViewMySubmission}
      >
        내 산출물 보기
      </button>
      <button
        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 active:bg-primary/80 transition-colors duration-200 cursor-pointer"
        onClick={handleSubmitSubmission}
      >
        제출하기
      </button>
    </div>
  );
}