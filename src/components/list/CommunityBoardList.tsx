// frontend/src/components/list/CommunityBoardList.tsx

import CommunityBoardItem from '@/components/item/CommunityBoardItem'
import { CommunityBoardItemProps } from '@/types/itemType'

interface CommunityBoardListProps {
  communityBoardList: CommunityBoardItemProps[]
}

/**
 * CommunityBoardList component
 * @description CommunityBoardList component is a community board list component that displays the community board list content
 * @returns {React.ReactNode}
 */
export default function CommunityBoardList({ communityBoardList }: CommunityBoardListProps) {
  
  // 예외 처리: 검색 결과가 없는 경우
  if (communityBoardList.length === 0) {
    return (
      <div className="flex flex-col divide-y divide-gray-100 space-y-4">
        <div className="flex items-center justify-center w-full bg-white rounded-xl shadow-sm border border-gray-100 p-12">
          <p className="text-gray-800 text-lg font-medium">검색 결과가 없습니다</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col divide-y divide-gray-100 space-y-4">
      {communityBoardList.map((item, index) => (
        <CommunityBoardItem
          key={item.postId}
          {...item}
          priority={index === 0}
        />
      ))}
    </div>
  )
}