// frontend/src/components/section/ContestSubmissionButtonSection.tsx

'use client';

import { useParams, useRouter } from "next/navigation";

/**
 * ContestSubmissionButtonSection component
 * @description 내 제출물 보기 및 제출하기 버튼을 포함하는 컴포넌트입니다.
 * @returns {React.ReactNode}
 */
export default function ContestSubmissionButtonSection() {

  const router = useRouter();
  const params = useParams();
  const contestId = Number(params.contestId);

  const handleViewMySubmission = () => {
    router.push(`/contest/${contestId}/my-submission`);
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