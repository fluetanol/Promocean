// frontend/src/components/section/ContestNoticeButtonSection.tsx

'use client';

import { useParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

/**
 * ContestNoticeButtonSection component
 * @description 공지사항 추가 버튼을 포함하는 컴포넌트입니다.
 * @returns {React.ReactNode}
 */
export default function ContestNoticeButtonSection() {

  const router = useRouter();
  const params = useParams();
  const { isLoggedIn, user } = useAuthStore();
  const contestId = Number(params.contestId);
  if (!isLoggedIn || !user) {
    return null;
  }

  const handleAddNotice = () => {
    router.push(`/contest/${contestId}/post-notice`);
  }

  return (
    <div>
      <button
        className="text-sm text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
        onClick={handleAddNotice}
      >
        공지사항 작성
      </button>
    </div>
  )
}