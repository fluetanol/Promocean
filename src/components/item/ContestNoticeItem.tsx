'use client';

// frontend/src/components/item/ContestNoticeItem.tsx

import { ContestNoticeItemProps } from "@/types/itemType";
import { formatKoreanDate } from "@/utils/formatDate";
import { useRouter, useParams } from "next/navigation";

/**
 * ContestNoticeItem component
 * @description ContestNoticeItem component is a contest notice item component that displays the contest notice item content
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
    <div className="flex items-center justify-between w-full bg-white border-b border-gray-200 py-4 gap-4 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => handleClick(noticeId)}>

      {/* 왼쪽 : 제목 */}
      <div className="flex-1 min-w-0 px-4">
        <h3 className="font-semibold text-gray-900 text-base hover:text-primary transition-colors line-clamp-1">
          {title}
        </h3>
      </div>
      
      {/* 오른쪽 : 날짜 정보 */}
      <div className="flex items-center gap-3 text-xs text-gray-500 flex-shrink-0 px-4">
        <span>{formatKoreanDate(createdAt)}</span>

        {/* TODO : 업데이트 날짜는 필요 없을 것 같아서 일단 보류. 추후에 결정하기 */}
        {/* {isUpdated && (
          <>
            <span className="text-gray-300">|</span>
            <span>수정일: {formatKoreanDate(updatedAt)}</span>
          </>
        )} */}
      </div>
    </div>
  )
}