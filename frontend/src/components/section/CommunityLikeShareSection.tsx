'use client';

// frontend/src/components/section/CommunityLikeShareSection.tsx

import Heart from "@/components/icon/Heart";
import Bookmark from "@/components/icon/Bookmark";
import ArrayDownTray from "@/components/icon/ArrayDownTray";
import { LikeAPI, ScrapAPI } from "@/api/community";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import SpaceAPI from "@/api/space";
import { useArchiveFolderStore } from "@/store/archiveFolderStore";

/**
 * CommunityLikeShareSection component
 * @description 좋아요, 스크랩, 아카이브 섹션입니다.
 * @returns {React.ReactNode}
 */
export default function CommunityLikeShareSection({ 
  likeCnt: initialLikeCnt, 
  isLiked: initialIsLiked, 
  isScraped: initialIsScraped,
  postId 
}: { 
  likeCnt: number; 
  isLiked: boolean; 
  isScraped: boolean;
  postId: number;
}) {
  const [isLiked, setIsLiked] = useState<boolean>(initialIsLiked);
  const [likeCnt, setLikeCnt] = useState<number>(initialLikeCnt);

  const [isScraped, setIsScraped] = useState<boolean>(initialIsScraped);
  
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

  const router = useRouter();
  const { isLoggedIn, user } = useAuthStore();
  const folderStore = useArchiveFolderStore();

  const archiveClick = async () => {
    // 1. 로그인 유효성 검사
    if (!isLoggedIn || !user) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      // 2. authStore에서 자신의 Space ID 가져오기
      const spaceId = user.personalSpaceId;
      if (!spaceId) {
        alert('스페이스 정보를 찾을 수 없습니다.');
        return;
      }

      // 3. SpaceId로 my-space의 폴더목록 호출하기
      const foldersData = await SpaceAPI.getSpaceArchiveFoldersData(spaceId);
      if (!foldersData || !foldersData.folders || foldersData.folders.length === 0) {
        alert('폴더가 없습니다. 먼저 폴더를 생성해주세요.');
        return;
      }

      // 3-1. 폴더 데이터를 store에 저장 (색상 정보 포함)
      console.log('아카이브 버튼 - 폴더 데이터:', foldersData.folders);
      folderStore.setAllFolderList(foldersData.folders);

      // 첫 번째 폴더 이름 가져오기
      const firstFolderName = foldersData.folders[0].name;
      const encodedFolderName = encodeURIComponent(firstFolderName);

      // 4. 글쓰기 화면으로 이동하면서 쿼리 파라미터 세팅
      // (게시글 정보는 post/page.tsx에서 postId로 로드됨)
      const params = new URLSearchParams({
        type: 'my-space',
        folder: encodedFolderName,
        postId: postId.toString(), // 게시글 정보를 세팅하기 위해 전달
      });

      router.push(`/post?${params.toString()}`);
    } catch (error) {
      if (!(error instanceof Error)) return;
      const errorMessage = error.message;

      if (errorMessage.includes('인증') || errorMessage.includes('로그인')) {
        alert('로그인이 필요합니다.');
      } else if (errorMessage.includes('404') || errorMessage.includes('찾을 수 없습니다')) {
        alert('게시글을 찾을 수 없습니다.');
      } else {
        alert('아카이브 이동 중 오류가 발생했습니다.');
        console.error('Archive error:', error);
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
      <button
        onClick={archiveClick}
        className="flex items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity"
      >
        <ArrayDownTray className="w-4 h-4 stroke-gray-500" />
        <span className="text-sm">아카이브</span>
      </button>
    </div>
  );
}