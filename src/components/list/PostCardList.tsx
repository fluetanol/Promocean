// frontend/src/components/list/PostCardList.tsx

import PostCardItem from '@/components/item/PostCardItem'
import { PostCardItemProps } from '@/types/itemType'

interface PostCardListProps {
  posts: PostCardItemProps[]
}

/**
 * PostCardList component
 * @description PostCardList component is a post card list component that displays the post card list content
 * @returns {React.ReactNode}
 */
export default function PostCardList({ posts }: PostCardListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {posts.map((post) => (
        <PostCardItem
          key={post.postId}
          {...post}
        />
      ))}
    </div>
  )
}