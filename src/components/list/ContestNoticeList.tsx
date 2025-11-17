// frontend/src/components/list/ContestNoticeList.tsx

import { ContestNoticeItemProps } from "@/types/itemType";
import ContestNoticeItem from "@/components/item/ContestNoticeItem";

/**
 * ContestNoticeList component
 * @description 대회 공지사항 목록 컴포넌트입니다.
 * @returns {React.ReactNode}
 */
export default function ContestNoticeList({ ContestNoticeList }: { ContestNoticeList: ContestNoticeItemProps[] }) {
  if (!ContestNoticeList || ContestNoticeList.length === 0) {
    return (
      <div className="bg-white rounded-xl">
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <p className="text-gray-500 text-base font-medium">등록된 공지사항이 없습니다</p>
          <p className="text-gray-400 text-sm mt-1">공지사항이 등록되면 여기에 표시됩니다</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden">
      {ContestNoticeList.map((item) => (
        <ContestNoticeItem 
          key={item.noticeId} 
          {...item} 
        />
      ))}
    </div>
  )
}