// frontend/src/components/item/CommunityFloatingItem.tsx

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CommunityFloatingItemProps } from '@/types/itemType'
import Heart from '../icon/Heart'
import ChatBubbleBottomCenterText from '../icon/ChatBubbleBottomCenterText'
import IconCount from '../etc/IconCount'
import { getPostImageUrl } from '@/utils/imageUtils'

/**
 * CommunityFloatingItem component
 * @description CommunityFloatingItem component is a community floating item component that displays the community floating item content
 * @returns {React.ReactNode}
 */
export default function CommunityFloatingItem({ postId, title, tags, fileUrl, likeCnt, replyCnt }: CommunityFloatingItemProps) {
  const imgUrl = getPostImageUrl(fileUrl, postId);
  return (
    <Link href={`/community/${postId}`} className="block group max-w-48">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-primary/20">

        {/* Image Section */}
        <div className="relative w-full h-32 overflow-hidden">
          <Image
            src={imgUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {/* 아이콘들 (좋아요/댓글) - 이미지 우측 하단 */}
          <div className="absolute bottom-2 right-2 flex flex-row items-center gap-2 bg-gray-500/60 backdrop-blur-sm px-1.5 py-0.5 rounded-full">
            <IconCount 
              icon={<Heart className="size-4 fill-none stroke-white" />} 
              count={likeCnt} 
              limit={99}
              textClassName="text-[9px] text-white"
            />
            <IconCount 
              icon={<ChatBubbleBottomCenterText className="size-4 fill-none stroke-white" />} 
              count={replyCnt} 
              limit={99}
              textClassName="text-[9px] text-white"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="p-2">

          <div className="flex flex-col items-start pl-1">
            {/* Title */}
            <h2 className="font-bold text-text text-[13px] line-clamp-1 transition-colors group-hover:text-primary pb-0.5">
              {title}
            </h2>

            {/* Hashtags */}
            <div className="flex flex-nowrap gap-1 overflow-hidden">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-[10px] text-gray-500 hover:text-primary transition-colors whitespace-nowrap"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
