'use client';

import React, { useState, KeyboardEvent } from 'react';

/**
 * HashtagInputProps 인터페이스
 * @interface HashtagInputProps
 * @property {string[]} tags - 현재 태그 배열
 * @property {(tags: string[]) => void} onTagsChange - 태그 변경 시 호출되는 함수
 * @property {string} [placeholder] - 입력 필드의 플레이스홀더 텍스트
 */
interface HashtagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
}


/**
 * 해시태그 입력 컴포넌트
 * @param param0 - HashtagInputProps의 분해 할당
 * 
 * @property tags: string[] - 현재 태그 배열
 * @property onTagsChange: (tags: string[]) => void - 태그 변경 시 호출되는 함수
 * @property placeholder?: string - 입력 필드의 플레이스홀더 텍스트
 * 
 * @returns JSX.Element
 */
export default function HashtagInput({
  tags,
  onTagsChange,
  placeholder = '#해시태그를 입력하고 스페이스, 엔터 또는 탭을 누르세요',
}: HashtagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === ' ' || e.key === 'Enter' || e.key === 'Tab') && inputValue.trim()) {
      console.log("태그 입력 완료");
      e.preventDefault();

      // #으로 시작하는지 확인
      const trimmedInput = inputValue.trim();
      if (trimmedInput.startsWith('#')) {
        // # 제거하고 태그 추가
        const newTag = trimmedInput.slice(1);
        if (newTag && !tags.includes(newTag)) {
          onTagsChange([...tags, newTag]);
        }
      } else if (trimmedInput) {
        // #이 없으면 자동으로 추가
        if (!tags.includes(trimmedInput)) {
          onTagsChange([...tags, trimmedInput]);
        }
      }

      setInputValue('');
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      // 입력값이 없을 때 백스페이스를 누르면 마지막 태그 삭제
      e.preventDefault();
      const newTags = [...tags];
      newTags.pop();
      onTagsChange(newTags);
    }
  };

  const removeTag = (indexToRemove: number) => {
    onTagsChange(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="w-full rounded-lg hover:bg-gray-200">
      <div className="w-full min-h-[42px] px-3 py-2 rounded-md focus-within:outline-none">
        <div className="flex flex-wrap gap-2 items-center">
          {/* 태그 레이블 표시 */}
          {tags.map((tag, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-1 text-blue-600 px-3 py-1 rounded-full text-[1rem] font-medium"
            >
              <span>#{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="hover:bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center transition-colors"
                aria-label={`Remove ${tag} tag`}
              >
                ×
              </button>
            </div>
          ))}

          {/* 입력 필드 */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={tags.length === 0 ? placeholder : ''}
            className="flex-1 min-w-[120px] outline-none bg-transparent"
          />
        </div>
      </div>
    </div>
  );
}
