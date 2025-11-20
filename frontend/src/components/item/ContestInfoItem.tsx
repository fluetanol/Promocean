// frontend/src/components/item/ContestInfoItem.tsx

import React from 'react'

interface ContestInfoItemProps {
  title: string
  content: string | React.ReactNode
}

/**
 * ContestInfoItem component
 * @description ContestInfoItem component displays a single contest information item with title and content
 * @returns {React.ReactNode}
 */
export default function ContestInfoItem({ title, content }: ContestInfoItemProps) {
  return (
    <div className="pb-6 border-b border-gray-200 last:pb-0 last:border-b-0">
      {/* 제목 */}
      <h3 className="text-sm font-bold text-gray-900 mb-2">
        {title}
      </h3>
      {/* 내용 */}
      <div className="text-sm text-gray-700 whitespace-pre-line">
        {typeof content === 'string' ? content : content}
      </div>
    </div>
  )
}

