// frontend/src/components/item/ContestNoticeItem.tsx

'use client';

import { ContestNoticeItemProps } from "@/types/itemType";
import { formatKoreanDate } from "@/utils/formatDate";
import { useRouter, useParams } from "next/navigation";

/**
 * ContestNoticeItem component
 * @description 대회 공지사항 아이템 컴포넌트입니다.
 * @returns {React.ReactNode}
 */
export default function ContestNoticeItem({ noticeId, title, createdAt, updatedAt }: ContestNoticeItemProps) {

  // TODO : 업데이트 날짜는 필요 없을 것 같아서 일단 보류. 추후에 결정하기
  // const isUpdated = createdAt !== updatedAt;
  const router = useRouter();
  const contestId = useParams().contestId;
  const handleClick = (noticeId: number) => {
    router.push(`/contest/${contestId}/notice/${noticeId}`);
  }

  return (
    <div 
      className="flex items-center gap-4 w-full px-6 py-5 hover:bg-primary/5 transition-all duration-200 cursor-pointer group border-b border-gray-200"
      onClick={() => handleClick(noticeId)}
    >
      {/* 내용 */}
      <div className="flex flex-row items-center justify-between flex-1 min-w-0 gap-4">
        <h3 className="font-semibold text-gray-900 text-base group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        <span className="text-xs text-gray-500 flex-shrink-0">{formatKoreanDate(createdAt)}</span>
      </div>
    </div>
  )
}