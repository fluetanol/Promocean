// frontend/src/components/list/CommunityCommentList.tsx

import { CommunityCommentItemProps } from "@/types/itemType";
import CommunityCommentItem from "@/components/item/CommunityCommentItem";

interface CommunityCommentListProps {
  communityCommentList: CommunityCommentItemProps[];
  postId: number;
  onUpdate?: () => void;
}

/**
 * CommunityCommentList component
 * @description CommunityCommentList component is a community comment list component that displays the community comment list content
 * @returns {React.ReactNode}
 */
export default function CommunityCommentList({ communityCommentList, postId, onUpdate }: CommunityCommentListProps) {
  return (
    <div>
      {communityCommentList.map((item, index) => (
        <CommunityCommentItem key={index} {...item} postId={postId} onUpdate={onUpdate} />
      ))}
    </div>
  )
}