'use client';

// frontend/src/components/item/PostingFloatingItem.tsx

import React from 'react'
import { PostingFloatingItemProps } from '@/types/itemType'

interface PostingFloatingItemExtendedProps extends PostingFloatingItemProps {
  name?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

/**
 * PostingFloatingItem component
 * @description PostingFloatingItem component is a posting floating item component that displays the posting floating item content
 * @returns {React.ReactNode}
 * @param {PostingFloatingItemExtendedProps} props - The props for the PostingFloatingItem component
 */
export default function PostingFloatingItem({ icon, label, value, checked, name = 'option', onChange }: PostingFloatingItemExtendedProps) {
  // checked를 항상 boolean으로 확정하여 controlled 컴포넌트로 유지
  const isChecked = checked ?? false

  return (
    <label className="flex items-center py-2 px-2 cursor-pointer hover:bg-gray-50 rounded-md transition-colors">
      <span className="mr-3 text-gray-400">{icon}</span>
      <span className="flex-1 text-sm text-gray-800">{label}</span>
      <input
        type="radio"
        name={name}
        value={value}
        checked={isChecked}
        onChange={onChange}
        className="w-4 h-4 text-primary border-gray-300  cursor-pointer"
      />
    </label>
  )
}

