// frontend/src/components/item/CommunityPostCategoryTypeBadges.tsx

'use client';

import ListBullet from "@/components/icon/ListBullet";
import { useRouter } from "next/navigation";
import { convertCategoryToApiCode } from "@/utils/categoryConvert";

interface CommunityPostCategoryTypeBadgesProps {
  category: string;
  type: string;
}

/**
 * CommunityPostCategoryTypeBadges component
 * @description 상세 게시글의 카테고리와 타입을 표시하는 컴포넌트입니다.
 * @returns {React.ReactNode}
 */
export default function CommunityPostCategoryTypeBadges({ category, type }: CommunityPostCategoryTypeBadgesProps) {

  const router = useRouter();
  const handleCategoryClick = () => {

    // TODO : undefined 삭제 예정
    const convertedCategory = convertCategoryToApiCode(category);
    if (convertedCategory) {
      router.push(`/community?${new URLSearchParams({ category: convertedCategory }).toString()}`);
    } else {
      router.push(`/community`);
    }
  }
  
  return (
    <div className="flex flex-row items-center gap-4">
      <div
        className="flex flex-row items-center gap-2 cursor-pointer"
        onClick={handleCategoryClick}
      >
        <ListBullet className="size-5" />
        <span className="text-sm text-gray-700">카테고리</span>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
        <span
          onClick={handleCategoryClick}
          className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-[11px] font-medium cursor-pointer transition-colors hover:bg-primary/10 hover:text-primary"
        >
          {category}
        </span>
        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-[11px] font-medium">
          {type}
        </span>
      </div>
    </div>
  )
}
