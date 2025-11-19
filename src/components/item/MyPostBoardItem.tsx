// frontend/src/components/item/MyPostBoardItem.tsx

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CommunityBoardItemProps } from "@/types/itemType";
import Heart from "@/components/icon/Heart";
import ChatBubbleBottomCenterText from "@/components/icon/ChatBubbleBottomCenterText";
import { getPostImageUrl } from "@/utils/imageUtils";

/**
 * MyPostBoardItem component
 * @description 내 글 목록에서 사용하는 게시글 아이템 컴포넌트 (프로필 정보 제외)
 * @returns {React.ReactNode}
 */
export default function MyPostBoardItem({ postId, title, category, tags, likeCnt, replyCnt, fileUrl }: CommunityBoardItemProps) {
 
  // console.log('MyPostBoardItem fileUrl:', fileUrl);
 
  return (
    <Link
      href={`/community/${postId}`}
      className="flex items-start justify-between w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 p-4 gap-4"
    >
      {/* 왼쪽 : 이미지 영역 */}
      <div className="relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden bg-gray-100">

          <Image
            src={fileUrl ? fileUrl : getPostImageUrl(fileUrl, postId)}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
      </div>

      {/* 중앙 : 게시글 정보 영역 */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 제목 */}
        <h3 className="font-bold text-text text-base mb-4 line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* 카테고리 + 해시태그 */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
            {category}
          </span>
          <div className="flex flex-wrap gap-1 text-sm text-gray-500 truncate">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="hover:text-primary cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 오른쪽 : 아이콘 영역 (프로필 정보 제외) */}
      <div className="flex items-center gap-4 text-gray-600 flex-shrink-0 self-end">
        <div className="flex items-center gap-1 transition-colors">
          <Heart />
          <span className="text-sm">{likeCnt}</span>
        </div>
        <div className="flex items-center gap-1 transition-colors">
          <ChatBubbleBottomCenterText />
          <span className="text-sm">{replyCnt}</span>
        </div>
      </div>
    </Link>
  );
}
