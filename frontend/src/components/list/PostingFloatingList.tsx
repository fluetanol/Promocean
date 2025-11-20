'use client';

// frontend/src/components/list/PostingFloatingList.tsx

import React from 'react'
import PostingFloatingItem from '@/components/item/PostingFloatingItem'
import { PostingFloatingItemProps } from '@/types/itemType'

interface PostingFloatingListProps {
  items: PostingFloatingItemProps[]
  selectedValue?: string
  onSelect?: (value: string) => void
  name?: string
}

/**
 * PostingFloatingList component
 * @description PostingFloatingList component is a posting floating list component that displays the posting floating list content
 * @returns {React.ReactNode}
 * @param {PostingFloatingListProps} props - The props for the PostingFloatingList component
 */
export default function PostingFloatingList({ items, selectedValue, onSelect, name = 'option' }: PostingFloatingListProps) {
  return (
    <div className="space-y-1">
      {items.map((item) => {
        // checked를 항상 boolean으로 확정
        const isChecked = selectedValue ? item.value === selectedValue : (item.checked ?? false)
        
        return (
          <PostingFloatingItem
            key={item.id}
            {...item}
            name={name}
            checked={isChecked}
            onChange={() => onSelect?.(item.value)}
          />
        )
      })}
    </div>
  )
}

