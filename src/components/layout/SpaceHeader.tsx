// frontend/src/components/layout/SpaceHeader.tsx

"use client";

import { useAuthStore } from "@/store/authStore";
import { useArchiveFolderStore } from "@/store/archiveFolderStore";
import { useParams, usePathname, useRouter } from "next/navigation";
import path from "path";
import React from "react";

/**
 * SpaceHeaderProps 인터페이스
 * @property {boolean} [isTeamSpace] - 팀 스페이스 여부
 * @property {string} [description] - 설명 텍스트
 */
export interface SpaceHeaderProps {
    isTeamSpace?: boolean;
    description?: string;
}

/**
 * 스페이스 페이지의 기본 헤더 컴포넌트
 * 제목과 설명만 표시합니다.
 *
 * @param param0 - SpaceHeaderProps 객체의 분해 할당
 * @property nickname - 사용자 닉네임
 * @property isTeamSpace - 팀 스페이스 여부
 * @property description - 헤더 부연 설명 텍스트
 *
 * isTeamSpace가 true이면 '팀 스페이스', false이거나 undefined이면 '마이 스페이스'로 표시됩니다.
 *
 * @returns {JSX.Element} 헤더 컴포넌트
 */
export default function SpaceHeader(
  {isTeamSpace = false, description}: SpaceHeaderProps) {

    const authStore = useAuthStore();
    const nickname = authStore.user?.nickname || "익명의 사용자";
    const folderStore = useArchiveFolderStore();

    const params = useParams();
    const pathname =  usePathname();
    console.log("SpaceHeader params:", JSON.stringify(params));
    console.log("SpaceHeader pathname:", pathname.split("/").splice(1,pathname.length));
    const pathSegments = pathname.split("/").splice(1,pathname.length);
    const router = useRouter();

    // 폴더 내부 페이지인지 확인 (archive/[folderName] 또는 scrap, my-posts)
    const isInFolderPage = (pathSegments[1] === "archive" && pathSegments[2] !== undefined) ||
                           pathSegments[1] === "scrap" ||
                           pathSegments[1] === "my-posts";

    // 폴더 색상 가져오기 (archive 폴더인 경우만)
    const folderColor = (pathSegments[1] === "archive" && pathSegments[2] !== undefined)
                        ? folderStore.currentFolder?.color
                        : undefined;

    const handleButtonClick = () => {
      console.log("Button clicked!");
      router.push(`/post?type=my-space&folder=${pathSegments[2]}`);
    }

    const handleHeaderClick = () => {
      router.push('/my-space/archive');
    }

  return (
    <header className="w-full">
      {/* 상단 영역 - 전체 너비 */}
      <div
        className={`relative flex flex-row justify-between items-center text-white px-6 w-full transition-all duration-300 ease-in-out ${
          isInFolderPage ? 'h-14' : 'h-32'
        } ${folderColor ? '' : 'bg-primary'}`}
        style={folderColor ? { backgroundColor: folderColor } : undefined}
      >
        {/* 어두운 그라데이션 오버레이 - 텍스트 가독성 향상 */}
        {folderColor && (
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent pointer-events-none"></div>
        )}

        <div
          className="relative z-10 cursor-pointer hover:opacity-90 transition-opacity"
          onClick={handleHeaderClick}
        >
          <h1 className={`font-semibold transition-all duration-300 ${isInFolderPage ? 'text-base' : 'text-3xl'}`}>
            {nickname} 님의{isTeamSpace ? ' 팀 스페이스' : ' 마이 스페이스'}
          </h1>
          <p className={`text-white/90 transition-all duration-300 ${isInFolderPage ? 'text-[10px]' : 'text-sm'}`}>{description}</p>
        </div>

        <button
          className={`relative z-10 ${pathSegments[1] == "archive" && pathSegments[2] != undefined ? "visible" : "invisible"} ${
            isInFolderPage ? 'px-2 py-1 text-xs' : 'px-3 py-2'
          } rounded-2xl bg-black/30 backdrop-blur-sm hover:bg-black/50 hover:cursor-pointer transition-all duration-300 border border-white/20 drop-shadow-lg`}
          onClick={handleButtonClick}
        >
          아카이브 글쓰기
        </button>

      </div>
    </header>
  );
}