// frontend/src/components/item/CommunityFloatingItem.tsx

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CommunityFloatingItemProps } from '@/types/itemType'
import Heart from '../icon/Heart'
import ChatBubbleBottomCenterText from '../icon/ChatBubbleBottomCenterText'

/**
 * CommunityFloatingItem component
 * @description CommunityFloatingItem component is a community floating item component that displays the community floating item content
 * @returns {React.ReactNode}
 */
export default function CommunityFloatingItem({ postId, title, hashtags, image, likeCount, commentCount }: CommunityFloatingItemProps) {
  return (
    <Link href={`/community/${postId}`} className="block group">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-primary/20">

        {/* Image Section */}
        <div className="relative w-full h-32 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content Section */}
        <div className="p-3">
          
          {/* Title */}
          <h2 className="font-bold text-text text-base mb-2 line-clamp-1 transition-colors group-hover:text-primary">
            {title}
          </h2>

          {/* Hashtags */}
          <div className="flex flex-wrap gap-1 mb-2">
            {hashtags.map((tag, index) => (
              <span
                key={index}
                className="text-xs text-gray-500 hover:text-primary transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* 아이콘들 (좋아요/댓글) */}
          <div className="flex items-center gap-3">

            {/* 좋아요 */}
            <div className="flex items-center gap-1 text-gray-500 transition-colors">
              <Heart />
              <span className="text-xs font-medium">{likeCount}</span>
            </div>

            {/* 댓글 */}
            <div className="flex items-center gap-1 text-gray-500 transition-colors">
              <ChatBubbleBottomCenterText />
              <span className="text-xs font-medium">{commentCount}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}