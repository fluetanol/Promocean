// frontend/src/components/section/CommunityHashtagSection.tsx

import CommunityHashtagList from "@/components/list/CommunityHashtagList";
import { HashtagItemProps } from "@/types/itemType";
import Tag from "@/components/icon/Tag";

/**
 * CommunityHashtagSection component
 * @description CommunityHashtagSection component is a community hashtag section component that displays the community hashtag section content
 * @returns {React.ReactNode}
 */
export default function CommunityHashtagSection( { hashtagList }: { hashtagList: HashtagItemProps[] } ) {
  
  return (
    <div className="flex flex-row items-center gap-4">
      <div className="flex flex-row items-center gap-2">
        <Tag />
        <span className="text">해시태그</span>
      </div>
      <CommunityHashtagList hashtagList={hashtagList} />
    </div>
  )
}