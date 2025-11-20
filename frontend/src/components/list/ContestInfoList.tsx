// frontend/src/components/list/ContestInfoList.tsx

import ContestInfoItem from '@/components/item/ContestInfoItem'
import { ContestInfoItemProps } from '@/types/itemType'

interface ContestInfoListProps {
  titles: string[]
  items: ContestInfoItemProps[]
}

/**
 * ContestInfoList component
 * @description ContestInfoList component is a contest info list component that displays the contest info list content
 * @returns {React.ReactNode}
 */
export default function ContestInfoList({ titles, items }: ContestInfoListProps) {
  return (
    <>
      {items && items.length > 0 ? items.map((item, index) => (
        <ContestInfoItem
          key={index}
          title={titles[index] || ''}
          content={item.content}
        />
      )) : (
        <div className="text-sm text-gray-500">데이터가 없습니다</div>
      )}
    </>
  )
}