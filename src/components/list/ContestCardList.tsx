// frontend/src/components/list/ContestCardList.tsx

import ContestCardItem from '@/components/item/ContestCardItem'
import { ContestCardItemProps } from '@/types/itemType'

interface ContestCardListProps {
  contestCards: ContestCardItemProps[]
}

export default function ContestCardList({ contestCards }: ContestCardListProps) {
  if (!contestCards || contestCards.length === 0) {
    return (
      <div className="flex flex-col divide-y divide-gray-100 space-y-4">
        <div className="flex items-center justify-center w-full bg-white rounded-xl shadow-sm border border-gray-100 p-12">
          <p className="text-gray-800 text-lg font-medium">검색 결과가 없습니다</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {contestCards.map((contestCard, index) => (
        <ContestCardItem
          key={index}
          {...contestCard}
        />
      ))}
    </div>
  );
}
