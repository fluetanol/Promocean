'use client';

// frontend/src/components/layout/PostingFooter.tsx

import React from 'react';
import { useRouter } from 'next/navigation';

interface PostingFooterProps {
  onSubmit: () => void;
}

export default function PostingFooter({ onSubmit }: PostingFooterProps) {
  const router = useRouter();

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="flex justify-end gap-2">
      <button
        type="button"
        onClick={handleCancel}
        className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
      >
        취소
      </button>
      <button
        type="button"
        onClick={onSubmit}
        className="px-4 py-2 rounded-md bg-primary text-white hover:brightness-110 active:brightness-95 transition-colors"
      >
        작성 완료
      </button>
    </div>
  );
}


