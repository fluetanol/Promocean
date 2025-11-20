'use client';

import React from 'react';
import TitleInput from '@/components/editor/TitleInput';

interface PostingMetaFormSectionProps {
  title: string;
  category: string;
  tags: string;
  onTitleChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onTagsChange: (value: string) => void;
}

export default function PostingMetaFormSection({
  category,
  tags,
  onCategoryChange,
}: PostingMetaFormSectionProps) {
  return (
    <section className=" border border-gray-200 rounded-lg p-6 space-y-4">
      {/* 첫째줄: 카테고리 + 태그 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-2">카테고리</label>
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="community">커뮤니티</option>
            <option value="dev">개발</option>
            <option value="design">디자인</option>
            <option value="ai">AI</option>
          </select>
        </div>

      </div>

      {/* 둘째줄: 제목 */}
    </section>
  );
}
