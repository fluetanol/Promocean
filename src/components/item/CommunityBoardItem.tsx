// frontend/src/components/layout/CommunityBoardItem.tsx

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CommunityBoardItemProps } from "@/types/itemType";
import Heart from "@/components/icon/Heart";
import ChatBubbleBottomCenterText from "@/components/icon/ChatBubbleBottomCenterText";
import UserSimpleProfile from "@/components/etc/UserSimpleProfile";

export default function CommunityBoardItem({ postId, author, profileUrl, title, description, category, tags, likeCnt, replyCnt, image }: CommunityBoardItemProps) {
  
  const imgUrl = image || `/assets/img_random${postId % 21}.png`;

  return (
    <Link
      href={`/community/${postId}`}
      className="flex flex-row justify-between items-stretch w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 p-4 gap-6"
    >
    {/* 상단: 이미지 + 본문 */}
    <div className="flex flex-row items-start gap-4">
      {/* 이미지 */}
      <div className="relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden bg-gray-100">
        <Image
          src={imgUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* 본문 */}
      <div className="flex flex-col justify-start flex-1 min-w-0">
        {/* 제목 + 설명 묶음 */}
        <div className="flex flex-col pt-1">
          <h3 className="font-bold text-text text-base leading-snug group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mt-0.5 line-clamp-2">{description}</p>
        </div>

        {/* 카테고리 + 태그 묶음 */}
        <div className="flex flex-row items-center gap-3 pt-3">
          {/* 카테고리 */}
          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0">
            {category}
          </span>

          {/* 태그들 */}
          <div className="flex flex-wrap gap-1 text-sm text-gray-500 truncate">
            {tags.map((tag, idx) => (
              <span key={idx} className="hover:text-primary px-0.5">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>

      {/* 오른쪽 : 사용자 + 좋아요/댓글 */}
      <div className="flex flex-row justify-end items-end text-gray-600">
        <div className="flex flex-row justify-end items-end text-gray-600">
          <div className="flex flex-row items-center gap-2 px-4">
            <UserSimpleProfile
              profileUrl={profileUrl}
              nickname={author}
              imageSize="sm"
              textSize="sm"
              showName={true}
              />
          </div>
          <div className="flex flex-row items-center gap-2 mt-2">
            <div className="flex items-center gap-1 transition-colors">
              <Heart />
              <span className="text-sm">{likeCnt}</span>
            </div>
            <div className="flex items-center gap-1 transition-colors">
              <ChatBubbleBottomCenterText />
              <span className="text-sm">{replyCnt}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
