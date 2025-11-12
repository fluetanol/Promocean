'use client';

import React from 'react';
import LexicalEditor from '@/components/editor/LexicalEditor';

interface PostingWriteSectionProps {
  title?: string;
  placeholder?: string;
  isSubmitButton?: boolean;
  onSubmit?: () => void;
  onChange: (content: string) => void;
  isLoading?: boolean;
  value?: string;
}

export default function PostingWriteSection({
  title,
  placeholder = '내용을 입력하세요...',
  isSubmitButton,
  onSubmit,
  onChange,
  isLoading = false,
  value,
}: PostingWriteSectionProps) {
  return (
    <section className="flex flex-col gap-1 border-gray-200 rounded-lg py-4 px-2">
      <LexicalEditor onChange={onChange} placeholder={placeholder} title={title}
        isSubmitButton={isSubmitButton} handleSubmit={onSubmit} isLoading={isLoading}
        value={value}
      />
    </section>
  );
}