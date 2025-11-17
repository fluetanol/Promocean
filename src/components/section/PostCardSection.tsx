// frontend/src/components/section/PostCardSection.tsx

import PostCardList from '@/components/list/PostCardList'
import { CommunityFloatingItemProps } from '@/types/itemType'

interface PostCardSectionProps {
  postSectionTitle : string
  postCardList : CommunityFloatingItemProps[]
}

/**
 * PostCardSection component
 * @description PostCardSection component is a post card section component that displays the post card section content
 * @returns {React.ReactNode}
 * @param {PostCardSectionProps} props - The props for the PostCardSection component
 */
export default function PostCardSection({postSectionTitle, postCardList }: PostCardSectionProps) {
  const posts = postCardList.map(item => ({
    ...item,
    category: "AI"
  }));

  return (
    <div className="py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-text mb-2">{postSectionTitle}</h2>
        </div>
        
        {/* Post Cards Grid */}
        <PostCardList posts={posts} />

      </div>
    </div>
  )
}

