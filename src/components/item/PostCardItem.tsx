// frontend/src/components/item/PostCardItem.tsx

import Image from 'next/image'
import Link from 'next/link'
import { CommunityFloatingItemProps } from '@/types/itemType'
import Heart from '../icon/Heart'
import ChatBubbleBottomCenterText from '../icon/ChatBubbleBottomCenterText'
import { getPostImageUrl } from '@/utils/imageUtils'

/**
 * PostCardItem component
 * @description PostCardItem component is a post card item component that displays the post card item content
 * @returns {React.ReactNode}
 */
export default function PostCardItem({ postId, title, tags, category, likeCnt, replyCnt, fileUrl, priority }: CommunityFloatingItemProps & { category: string; priority?: boolean }) {
  const imgUrl = getPostImageUrl(fileUrl, postId);
  return (
    <Link href={`/community/${postId}`} className="block group">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-primary/20">

        {/* Image Section */}
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={imgUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            className="object-cover transition-transform duration-300"
          />
        </div>

        {/* Content Section */}
        <div className="p-4">

          {/* Title */}
          <h3 className="font-bold text-text text-lg mb-2 line-clamp-2 transition-colors">
            {title}
          </h3>

          {/* Hashtags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-sm text-gray-500 hover:text-primary transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* etc */}
          <div className="flex items-center justify-between pt-2 border-gray-100">

            {/* Category */}
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
              {category}
            </span>

            {/* Stats */}
            <div className="flex items-center gap-4">
              
              {/* Likes */}
              <div className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors">
                <Heart />
                <span className="text-sm font-medium">{likeCnt}</span>
              </div>

              {/* Comments */}
              <div className="flex items-center gap-1 text-gray-500 hover:text-primary transition-colors">
                <ChatBubbleBottomCenterText />
                <span className="text-sm font-medium">{replyCnt}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </Link>
  )
}