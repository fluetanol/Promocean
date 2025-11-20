'use client';

// frontend/src/components/section/PostingFloatingSection.tsx

import React, { useState } from 'react'
import { PostingFloatingItemProps } from '@/types/itemType'
import PostingFloatingList from '@/components/list/PostingFloatingList'

interface PostingFloatingSectionProps {
  title: string
  items: PostingFloatingItemProps[]
  selectedValue?: string
  onSelect?: (value: string) => void
  name: string
}

/**
 * PostingFloatingSection component
 * @description PostingFloatingSection component is a posting floating section component that displays the posting floating section content
 * @returns {React.ReactNode}
 * @param {PostingFloatingSectionProps} props - The props for the PostingFloatingSection component
 */
export default function PostingFloatingSection({ title, items, selectedValue, onSelect, name }: PostingFloatingSectionProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <aside className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      {/* 헤더 */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-sm font-bold text-gray-800">{title}</h3>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </div>

      {/* 리스트 */}
      {isOpen && (
        <div className="px-4 pb-4">
          <PostingFloatingList
            items={items}
            selectedValue={selectedValue}
            onSelect={onSelect}
            name={name}
          />
        </div>
      )}
    </aside>
  )
}


