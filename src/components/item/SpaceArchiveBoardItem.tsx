// frontend/src/components/layout/CommunityBoardItem.tsx
'use client';

import { getPostImageUrl } from "@/utils/imageUtils";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";


export interface SpaceArchiveBoardItemProps{
    articleId: number;
    title: string;
    category: string;
    tags: string[];
    folderName: string;
    folderId : number;
    fileUrl: string;
}

export default function SpaceArchiveBoardItem( { articleId, title, category, tags, fileUrl, folderName, folderId }: SpaceArchiveBoardItemProps) {
  const pathname = usePathname();
  const [imageError, setImageError] = useState(false);

  // 현재 경로에서 팀 스페이스인지 마이 스페이스인지 판단
  const isTeamSpace = pathname.startsWith('/team-space');

  // 팀 스페이스인 경우 team-archive ID 추출
  const pathSegments = pathname.split('/').filter(Boolean);
  const teamArchiveId = isTeamSpace && pathSegments.length > 1 ? pathSegments[1] : '';

  // 동적으로 href 생성
  const href = isTeamSpace
    ? `/team-space/${teamArchiveId}/${folderId}/${articleId}`
    : `/my-space/archive/${folderId}/${articleId}`;

  return (
    <Link
      href={href}
      className="flex items-center justify-between w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 p-4"
    >
      {/* LEFT : 이미지 + 텍스트 */}
      <div className="flex items-start gap-4 min-w-0">
        {/* 썸네일 */}
        <div className="relative shrink-0 w-16 h-16 rounded-md overflow-hidden bg-gray-100">
          {!imageError ? (
            <Image
              src={fileUrl ? fileUrl : getPostImageUrl(fileUrl, articleId)}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => {
                console.log('이미지 로드 실패:', fileUrl);
                setImageError(true);
              }}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-red-50 border-2 border-red-200">
              <svg className="w-6 h-6 text-red-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-xs text-red-600 font-medium">로드 실패</span>
            </div>
          )}
        </div>

        {/* 텍스트 영역 */}
        <div className="flex flex-col min-w-0">

          {/* 제목 */}
          <h3 className="font-bold text-text text-base mb-1 line-clamp-1 group-hover:text-primary transition-colors">
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
      </div>
    </Link>
  );
}
