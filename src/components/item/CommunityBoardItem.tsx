// frontend/src/components/layout/CommunityBoardItem.tsx

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CommunityBoardItemProps } from "@/types/itemType";
import Heart from "@/components/icon/Heart";
import ChatBubbleBottomCenterText from "@/components/icon/ChatBubbleBottomCenterText";
import UserSimpleProfile from "@/components/etc/UserSimpleProfile";
import { getPostImageUrl } from "@/utils/imageUtils";

export default function CommunityBoardItem({ postId, author, profileUrl, title, description, category, tags, likeCnt, replyCnt, fileUrl }: CommunityBoardItemProps) {
  
  const imgUrl = getPostImageUrl(fileUrl, postId);
  const limitCnt = 99;

  return (
    <Link
      href={`/community/${postId}`}
      className="flex flex-row justify-between items-stretch w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 p-2.5 gap-4"
    >
    {/* 상단: 이미지 + 본문 */}
    <div className="flex flex-row items-start gap-4">
      {/* 이미지 */}
      <div className="relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden bg-gray-100">
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
        <div className="flex flex-col py-0.5">
          <h3 className="font-bold text-text text-sm leading-snug group-hover:text-primary transition-colors pb-0.5">
            {title}
          </h3>
          <p className="text-xs text-gray-600 line-clamp-2">{description}</p>
        </div>

        {/* 카테고리 + 태그 묶음 */}
        <div className="flex flex-row items-center gap-3 pt-1">
          {/* 카테고리 */}
          <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded-full text-[10px] font-medium flex-shrink-0">
            {category}
          </span>

          {/* 태그들 */}
          <div className="flex flex-wrap gap-1 text-[10px] text-gray-500 truncate">
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
      <div className="flex flex-row justify-end items-end text-gray-600 pr-2">
        <div className="flex flex-row justify-end items-end text-gray-600">
          <div className="flex flex-row items-center gap-2 px-3">
            <UserSimpleProfile
              profileUrl={profileUrl}
              nickname={author}
              imageSize="sm"
              textSize="xs"
              showName={true}
              />
          </div>
          <div className="flex flex-row items-center gap-2 mt-2">
            <div className="flex items-center gap-1 transition-colors">
              <Heart />
              {likeCnt > limitCnt ?
              <span className="text-xs">+{limitCnt}</span> :
              <span className="text-xs">{likeCnt}</span>
              }
            </div>
            <div className="flex items-center gap-1 transition-colors">
              <ChatBubbleBottomCenterText />
              {replyCnt > limitCnt ?
              <span className="text-xs">+{limitCnt}</span> :
              <span className="text-xs">{replyCnt}</span>
              }
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
