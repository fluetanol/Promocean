// frontend/src/components/list/CommunityPostButtonList.tsx

'use client';

import { PostAPI } from "@/api/post";
import { useParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

interface CommunityPostButtonListProps {
  author: string;
}

/**
 * CommunityPostButtonList component
 * @description 게시물 수정 및 삭제 버튼을 포함하는 컴포넌트입니다.
 * @returns {React.ReactNode}
 */
export default function CommunityPostButtonList({ author }: CommunityPostButtonListProps) {
  
  const { isLoggedIn, user } = useAuthStore();
  const router = useRouter();
  const params = useParams();
  const postId = Number(params.postId);

  // 작성자와 로그인한 사용자가 일치할 때만 버튼 표시
  if (!isLoggedIn || !user || user.nickname !== author) {
    return null;
  }

  const handleUpdatePost = async () => {
    router.push(`/post?type=community&mode=edit&postId=${postId}`);
  }

  const handleDeletePost = async () => {
    await PostAPI.deletePost(postId);
    router.push(`/community`);
    router.refresh();
  }

  return (
    <div className="flex flex-row items-center justify-end gap-2">
      <button
        className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
        onClick={handleUpdatePost}
      >
        수정
      </button>
      <button
        className="text-xs text-red-500 hover:text-red-700 transition-colors"
        onClick={handleDeletePost}
      >
        삭제
      </button>
    </div>
  )
}