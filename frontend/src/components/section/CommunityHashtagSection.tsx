// frontend/src/components/section/CommunityHashtagSection.tsx

import CommunityHashtagList from "@/components/list/CommunityHashtagList";
import { HashtagItemProps } from "@/types/itemType";
import Tag from "@/components/icon/Tag";

/**
 * CommunityHashtagSection component
 * @description CommunityHashtagSection component is a community hashtag section component that displays the community hashtag section content
 * @returns {React.ReactNode}
 */
export default function CommunityHashtagSection( { hashtagList, className }: { hashtagList: HashtagItemProps[], className?: string } ) {
  
  return (
    <div className={`flex flex-row items-center gap-4 ${className || ''}`}>
      <div className="flex flex-row items-center gap-2">
        <Tag className="size-5" />
        <span className="text-sm text-gray-700">해시태그</span>
      </div>
      <CommunityHashtagList hashtagList={hashtagList} />
    </div>
  )
}