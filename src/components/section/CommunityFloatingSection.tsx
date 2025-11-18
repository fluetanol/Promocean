// frontend/src/components/section/CommunityFloatingSection.tsx

import CommunityFloatingList from '@/components/list/CommunityFloatingList'
import { CommunityFloatingItemProps } from '@/types/itemType'

/**
 * CommunityFloatingSection component
 * @description CommunityFloatingSection component is a community floating section component that displays the community floating section content
 * @returns {React.ReactNode}
 * @param {CommunityFloatingSectionProps} props - The props for the CommunityFloatingSection component
 */
export default function CommunityFloatingSection({ popularPosts }: { popularPosts: CommunityFloatingItemProps[] }) {
  return (
    <div>
      {/* Section Header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-text mb-2">실시간 인기글</h2>
      </div>
      
      {/* Popular Posts List */}
      <CommunityFloatingList popularPosts={popularPosts} />
    </div>
  )
}