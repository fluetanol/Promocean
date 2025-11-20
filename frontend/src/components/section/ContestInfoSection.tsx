// frontend/src/components/section/ContestInfoSection.tsx

import React from 'react'
import { ContestInfoItemProps } from '@/types/itemType'
import ContestInfoList from '@/components/list/ContestInfoList'

interface ContestInfoSectionProps {
  titles: string[]
  items: ContestInfoItemProps[]
}

/**
 * ContestInfoSection component
 * @description ContestInfoSection component displays contest information in card format with title and content lists
 * @returns {React.ReactNode}
 */
export default function ContestInfoSection({ titles, items }: ContestInfoSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-8">
      <div className="space-y-6">
        <ContestInfoList titles={titles} items={items} />
      </div>
    </div>
  )
}

