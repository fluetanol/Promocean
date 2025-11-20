// frontend/src/components/list/CommunityFloatingList.tsx

import CommunityFloatingItem from '@/components/item/CommunityFloatingItem'
import { CommunityFloatingItemProps } from '@/types/itemType'

interface CommunityFloatingListProps {
  popularPosts: CommunityFloatingItemProps[]
}

/**
 * CommunityFloatingList component
 * @description CommunityFloatingList component is a community floating list component that displays the community floating list content
 * @returns {React.ReactNode}
 */
export default function CommunityFloatingList({ popularPosts }: CommunityFloatingListProps) {
  return (
    <div className="space-y-3">
      {popularPosts.map((item, index) => (
        <CommunityFloatingItem
          key={index}
          {...item}
        />
      ))}
    </div>
  )
}