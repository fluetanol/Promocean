'use client';

// frontend/src/components/section/CommunityLikeShareSection.tsx

import Heart from "@/components/icon/Heart";
import Bookmark from "@/components/icon/Bookmark";
import ArrayDownTray from "@/components/icon/ArrayDownTray";
import { LikeAPI, ScrapAPI } from "@/api/community";
import { useState } from "react";

/**
 * CommunityLikeShareSection component
 * @description 좋아요, 스크랩, 아카이브 섹션입니다.
 * @returns {React.ReactNode}
 */
export default function CommunityLikeShareSection({ likeCnt: initialLikeCnt, isLiked: initialIsLiked, postId 
}: { 
  likeCnt: number; 
  isLiked: boolean; 
  postId: number;
}) {
  const [isLiked, setIsLiked] = useState<boolean>(initialIsLiked);
  const [likeCnt, setLikeCnt] = useState<number>(initialLikeCnt);

  const [isScraped, setIsScraped] = useState<boolean>(false);
  
  // 좋아요 함수
  const handleLikeClick = async () => {
    if (isLiked) return;

    try {
      await LikeAPI.create(postId);
      setIsLiked(true);
      setLikeCnt(prev => prev + 1);
    } catch (error) {
      if (!(error instanceof Error)) return;

      const errorMessage = error.message;

      switch (errorMessage) {
        case '인증되지 않은 회원입니다':
          alert('로그인이 필요합니다.');
          break;
        case '이미 좋아요를 누른 게시글입니다.':
          setIsLiked(true);
          break;
        case '게시글을 찾을 수 없습니다':
          alert('게시글을 찾을 수 없습니다.');
          break;
        default:
          alert(errorMessage);
          break;
      }
    }
  };

  // 스크랩 함수
  const handleScrapClick = async () => {
    try {
      if (isScraped) {
        // 스크랩 해제
        await ScrapAPI.delete(postId);
        setIsScraped(false);
      } else {
        // 스크랩 추가
        await ScrapAPI.create(postId);
        setIsScraped(true);
      }
    } catch (error) {
      if (!(error instanceof Error)) return;

      const errorMessage = error.message;

      switch (errorMessage) {
        case '인증되지 않은 회원입니다':
          alert('로그인이 필요합니다.');
          break;
        case '게시글 정보를 찾을 수 없습니다.':
          alert('게시글을 찾을 수 없습니다.');
          break;
        default:
          alert(errorMessage);
          break;
      }
    }
  };

  return (
    <div className="flex flex-row items-center justify-center gap-8">
      {/* 좋아요 */}
      <button
        onClick={handleLikeClick}
        disabled={isLiked}
        className="flex items-center gap-1 hover:opacity-70 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLiked ? (
          <Heart className="size-6 fill-red-500 stroke-red-500" />
        ) : (
          <Heart className="size-6 fill-none stroke-gray-500" />
        )}
        <span className="text-sm">{likeCnt}</span>
      </button>
      
      {/* 스크랩하기 */}
      <button
        onClick={handleScrapClick}
        className="flex items-center gap-1 hover:opacity-70 transition-opacity"
      >
        {isScraped ? (
          <Bookmark className="w-4 h-4 fill-[#f4e24e] stroke-[#f4e24e]" />
        ) : (
          <Bookmark className="w-4 h-4 stroke-gray-500" />
        )}
        <span className="text-sm">스크랩</span>
      </button>

      {/* 아카이브하기 */}
      <div className="flex items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity">
        <ArrayDownTray className="w-4 h-4 stroke-gray-500" />
        <span className="text-sm">아카이브</span>
      </div>
    </div>
  );
}