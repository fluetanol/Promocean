'use client';

// frontend/src/components/section/CommunityCommentSection.tsx

import { CommunityCommentItemProps } from "@/types/itemType";
import CommunityCommentList from "@/components/list/CommunityCommentList";
import CommentForm from "@/components/form/CommentForm";
import ChatBubbleBottomCenterText from "@/components/icon/ChatBubbleBottomCenterText";
import { useRouter } from "next/navigation";

interface CommunityCommentSectionProps {
  communityCommentList: CommunityCommentItemProps[];
  postId: number;
}

/**
 * CommunityCommentSection component
 * @description 커뮤니티 게시물의 댓글 목록과 댓글 작성 폼을 포함하는 섹션 컴포넌트입니다.
 * @returns {React.ReactNode}
 */
export default function CommunityCommentSection({ communityCommentList, postId }: CommunityCommentSectionProps) {
  const router = useRouter();

  const handleCommentSuccess = () => {
    router.refresh();
  };

  return (
    <div className="p-8 flex flex-col gap-6">

      {/* 댓글 목록 섹션 */}
      <div>
        <div className="flex flex-row items-center gap-2 mb-2">
          <ChatBubbleBottomCenterText />
          <h3 className="text-md font-semibold text-gray-900">
            댓글 {communityCommentList.length}개
          </h3>
        </div>
        <CommunityCommentList communityCommentList={communityCommentList} postId={postId} onUpdate={handleCommentSuccess} />
      </div>

      {/* 댓글 작성 섹션 */}
      <div>
        <div className="flex flex-row items-center gap-2 mb-4">
          <ChatBubbleBottomCenterText />
          <h3 className="text-md font-semibold text-gray-900">
            댓글 작성
          </h3>
        </div>
        <CommentForm postId={postId} onSuccess={handleCommentSuccess} />
      </div>
    </div>
  )
}