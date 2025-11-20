"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CommunityBoardItemProps } from "@/types/itemType";
import Heart from "@/components/icon/Heart";
import ChatBubbleBottomCenterText from "@/components/icon/ChatBubbleBottomCenterText";
import { getPostImageUrl } from "@/utils/imageUtils";

export interface SpaceScrapItemProps {
  postId: number;
  title: string;
  tags: string[];
  category: string;
  fileUrl: string;
  profileUrl: string;
  author: string;
    onScrapToggle?: (id: number) => void;
}

/**
 * SpaceScrapItem component
 * @description 스크랩 페이지의 카드 형태 아이템 컴포넌트
 * 핀터레스트/인스타그램 스타일의 그리드 카드로 표시됩니다.
 * @returns {React.ReactNode}
 */
export default function SpaceScrapItem({
    postId,
    title,
    tags,
    category,
    fileUrl,
    profileUrl,
    author,
    onScrapToggle
}: SpaceScrapItemProps) {
    const [isScrapped, setIsScrapped] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handleScrapClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isLoading) return;

        // 즉시 UI 업데이트 (API 호출은 부모 컴포넌트에서 유예 후 처리)
        setIsScrapped(false);

        // 부모 컴포넌트에 스크랩 취소 알림
        if (onScrapToggle) {
            onScrapToggle(postId);
        }
    };

    console.log("해쉬태그 : ", tags);

    return (
        <div className="relative group">
            <Link
                href={`/community/${postId}`}
                className="flex flex-col bg-white rounded-xl shadow-sm hover:shadow-xl
                    transition-all duration-300 overflow-hidden border border-gray-100
                    hover:-translate-y-1 active:translate-y-0"
            >
            {/* 썸네일 이미지 영역 */}
            <div className="relative w-full h-36 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    <Image
                        src={fileUrl ? fileUrl : getPostImageUrl(fileUrl, postId)}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                {/* 카테고리 배지 - 이미지 위 좌측 상단 */}
                <div className="absolute top-3 left-3">
                    <span className="bg-white/95 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                        {category}
                    </span>
                </div>

            </div>

            {/* 컨텐츠 영역 */}
            <div className="flex flex-col p-3 gap-2">
                {/* 제목 */}
                <h3 className="font-bold text-text text-sm line-clamp-2 group-hover:text-primary transition-colors min-h-10">
                    {title}
                </h3>

                {/* 해시태그 */}
                <div className="flex flex-wrap gap-1.5">
                    {tags.slice(0, 3).map((tag, idx) => (
                        <span
                            key={idx}
                            className="text-xs text-gray-600 hover:text-primary cursor-pointer transition-colors"
                        >
                            #{tag}
                        </span>
                    ))}
                    {tags.length > 3 && (
                        <span className="text-xs text-gray-400">
                            +{tags.length - 3}
                        </span>
                    )}
                </div>

                {/* 작성자 정보 */}
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                    {profileUrl ? (
                        <Image
                            src={profileUrl}
                            alt={author}
                            width={28}
                            height={28}
                            className="rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                            <span className="text-sm">🐥</span>
                        </div>
                    )}
                    <span className="text-sm font-medium text-gray-700 truncate">
                        {author}
                    </span>
                </div>
            </div>
            </Link>

            {/* 스크랩 버튼 - 카드 우측 상단 */}
            <button
                onClick={handleScrapClick}
                disabled={isLoading}
                className="absolute -top-1.5 right-3 z-15 w-9 h-9 scale-120 
                    hover:drop-shadow-2xl transition-all duration-200 flex items-center justify-center
                    hover:scale-130 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="스크랩 해제"
            >
                {isLoading ? (
                    <svg
                        className="w-5 h-5 animate-spin text-primary"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                ) : (
                    <svg
                        className="w-15 h-15 stroke-current drop-shadow-2xl"
                        fill={isScrapped ? "#FFC107" : "none"}
                        stroke={isScrapped ? "#F59E0B" : "currentColor"}
                        strokeWidth="1"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                    </svg>
                )}
            </button>
        </div>
    );
}
