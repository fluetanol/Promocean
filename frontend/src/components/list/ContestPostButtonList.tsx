// frontend/src/components/list/ContestPostButtonList.tsx

'use client';

import { useParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { ContestPostItemProps } from "@/types/itemType";

interface ContestPostButtonListProps {
  author: string;
  contestPostData?: ContestPostItemProps;
}

/**
 * ContestPostButtonList component
 * @description 컨테스트 글 수정 버튼을 포함하는 컴포넌트입니다.
 * @returns {React.ReactNode}
 */
export default function ContestPostButtonList({ author }: ContestPostButtonListProps) {
  
  const { isLoggedIn, user } = useAuthStore();
  const params = useParams();
  const router = useRouter();
  const contestId = Number(params.contestId);

  // 작성자와 로그인한 사용자가 일치할 때만 버튼 표시
  if (!isLoggedIn || !user || user.nickname !== author) {
    return null;
  }

  const handleUpdatePost = () => {
    router.push(`/contest/${contestId}/update-contest`);
  }

  return (
    <div className="flex flex-row items-center justify-end gap-2">

      {/* 수정 버튼 */}
      <button
        className="text-sm text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
        onClick={handleUpdatePost}
      >
        수정
      </button>

      {/* TODO : 삭제 API 추가 논의 */}
      <button
        className="text-sm text-red-500 hover:text-red-700 transition-colors cursor-pointer"
        // onClick={handleDeletePost}
      >
        삭제
      </button>
    </div>
  )
}
