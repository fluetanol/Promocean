'use client';

// frontend/src/components/form/CommentForm.tsx

import { useState, useRef, useEffect } from 'react';
import { ReplyAPI } from '@/api/community';
import EmoticonPicker from '@/components/emoticon/EmoticonPicker';
import { EmojiCategory, EmojiItem, GachaAPI } from '@/api/gacha';
import Image from 'next/image';

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
  const [showEmoticonPicker, setShowEmoticonPicker] = useState(false);
  const [selectedEmoticon, setSelectedEmoticon] = useState<EmojiItem | null>(null);
  const emoticonButtonRef = useRef<HTMLButtonElement>(null);

  // 임시 이모티콘 데이터 (추후 사용자가 보유한 이모티콘 API로 대체)
  const [gachaList, setGachaList] = useState<EmojiCategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
    
      const res = await GachaAPI.getGachaList();
      if(res && res.categories)
        setGachaList(res.categories);
      else{
        console.error("Failed to fetch gacha list for CommentForm.");
      }
    }
    fetchData();
  },[])



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: 추후 이모티콘 ID도 함께 전송
      // await ReplyAPI.create(postId, comment.trim(), selectedEmoticon?.id);

      await ReplyAPI.create(postId,  comment.trim(), selectedEmoticon?.emojiId);
      console.log('댓글 작성 성공');
      setComment('');
      setSelectedEmoticon(null);
      onSuccess?.();
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      alert('댓글 작성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmoticonSelect = (emoticon: EmojiItem) => {
    setSelectedEmoticon(emoticon);
    setShowEmoticonPicker(false);
  };

  const handleRemoveEmoticon = () => {
    setSelectedEmoticon(null);
  };

  return (
    <div className="mb-6 pb-6 border-gray-200">
      {/* 이모티콘 버튼 */}
      <div className="flex justify-end border border-gray-300 rounded-t-lg relative">
        <button
          ref={emoticonButtonRef}
          type="button"
          onClick={() => setShowEmoticonPicker(!showEmoticonPicker)}
          className="hover:bg-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors flex items-center gap-2"
        >
          프롬티콘
        </button>

        {/* 이모티콘 피커 모달 */}
        <EmoticonPicker
          isOpen={showEmoticonPicker}
          onClose={() => setShowEmoticonPicker(false)}
          onSelect={handleEmoticonSelect}
          selectedEmoticon={selectedEmoticon}
          buttonRef={emoticonButtonRef}
          gachaList={gachaList}
        />
      </div>

      <form onSubmit={handleSubmit} >
        {/* 선택된 이모티콘 미리보기 */}
        {selectedEmoticon && (
          <div className="border-l border-r border-gray-300 border-t-0 rounded-b-none bg-gray-50 px-3 py-1.5">
            <div className="flex items-center">
              <div className="relative flex items-center gap-1 bg-white border border-gray-200 px-1 py-1">
                <Image
                  src={selectedEmoticon.imageUrl}
                  alt={`Selected Emoticon ${selectedEmoticon.emojiId}`}
                  width={100}
                  height={100}
                />

              <button
                type="button"
                onClick={handleRemoveEmoticon}
                className="absolute right-1 top-1 text-gray-400 hover:text-red-500 transition-colors"
                title="이모티콘 제거"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              </div>
            </div>
          </div>
        )}

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 입력하세요..."
          rows={4}
          className={`
            w-full px-4 py-3 border border-gray-300 resize-none
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            placeholder-gray-400 text-sm
            ${selectedEmoticon ? 'rounded-t-none rounded-b-lg' : 'rounded-bl-lg rounded-br-lg'}
          `}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!comment.trim() || isSubmitting}
            className="px-4 py-2 bg-primary hover:bg-blue-600 text-xs text-white font-medium rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
          >
            {isSubmitting ? '작성 중...' : '댓글 작성'}
          </button>
        </div>
      </form>
    </div>
  );
}