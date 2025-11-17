'use client';

// frontend/src/components/form/CommentForm.tsx

import { useState } from 'react';
import { ReplyAPI } from '@/api/community';

interface CommentFormProps {
  postId: number;
  onSuccess?: () => void;
}

/**
 * CommentForm component
 * @description 댓글 작성에 사용되는 폼 컴포넌트입니다.
 * @returns {React.ReactNode}
 */
export default function CommentForm({ postId, onSuccess }: CommentFormProps) {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!comment.trim() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      await ReplyAPI.create(postId, comment.trim());
      setComment('');
      onSuccess?.();
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      alert('댓글 작성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-6 pb-6 border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 입력하세요..."
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-400 text-sm"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!comment.trim() || isSubmitting}
            className="px-6 py-2 bg-primary hover:bg-blue-600 text-white font-medium rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
          >
            {isSubmitting ? '작성 중...' : '댓글 작성'}
          </button>
        </div>
      </form>
    </div>
  )
}