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
  hasError?: boolean;
  errorMessage?: string;
  dataField?: string;
}

export default function PostingWriteSection({
  title,
  placeholder = '내용을 입력하세요...',
  isSubmitButton,
  onSubmit,
  onChange,
  isLoading = false,
  value,
  hasError = false,
  errorMessage,
  dataField,
}: PostingWriteSectionProps) {
  return (
    <section
      className="flex flex-col gap-1 border-gray-200 rounded-lg py-4 px-2"
      data-field={dataField}
    >
      <LexicalEditor
        onChange={onChange}
        placeholder={placeholder}
        title={title}
        isSubmitButton={isSubmitButton}
        handleSubmit={onSubmit}
        isLoading={isLoading}
        value={value}
        hasError={hasError}
      />
      {hasError && errorMessage && (
        <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-md">
          <svg className="w-5 h-5 text-red-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-red-700 font-medium">{errorMessage}</p>
        </div>
      )}
    </section>
  );
}