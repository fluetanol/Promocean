// frontend/src/components/list/CommunityHashtagList.tsx

import CommunityHashtagItem from "@/components/item/CommunityHashtagItem";
import { HashtagItemProps } from "@/types/itemType";

/**
 * HashtagList component
 * @description HashtagList component is a hashtag list component that displays the hashtag list content
 * @param {HashtagListProps} props - The props for the HashtagList component
 * @returns {React.ReactNode}
 */
export default function CommunityHashtagList( { hashtagList }: { hashtagList: HashtagItemProps[] } ) {
  return (
    <ul className="flex flex-wrap gap-2">
      {hashtagList.map((item, index) => (
        <CommunityHashtagItem key={index} tag={item.tag} />
      ))}
    </ul>
  )
}