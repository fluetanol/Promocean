"use client";

// frontend/src/app/contest/[contestId]/@modal/(.)post-notice/page.tsx

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { NoticeAPI } from "@/api/contest";

/**
 * 공지사항 작성 모달
 * @description 대회 상세 페이지에서 공지사항을 작성하는 모달입니다.
 * @returns {React.ReactNode}
 */
export default function ContestPostNoticeModal() {
  const router = useRouter();
  const params = useParams();
  const contestId = Number(params.contestId);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) {
      newErrors.title = '제목을 입력해주세요.';
    }

    if (!content.trim()) {
      newErrors.content = '내용을 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await NoticeAPI.create(contestId, title.trim(), content.trim());

      // 성공 시 페이지 새로고침하고 모달 닫기
      router.refresh();
      router.back();
    } catch (error) {
      alert(`공지사항 작성에 실패했습니다. ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <div
      className="fixed flex inset-0 z-50 w-full h-full bg-black/40 backdrop-blur-xs justify-center items-center
        transition-opacity duration-300 ease-out opacity-100"
      onClick={handleClose}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-background w-[600px] max-h-[90vh] rounded-2xl p-8 gap-6 shadow-xl overflow-y-auto
          transition-all duration-300 ease-out opacity-100 scale-100 translate-y-0"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl font-semibold">공지사항 작성</h1>

        {/* 제목 입력 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            제목
          </label>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            className={`flex w-full h-12 shadow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-2xl font-bold text-gray-900
              ${errors.title ? 'border-red-500' : ''}`}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors({ ...errors, title: '' });
            }}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* 내용 입력 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            내용
          </label>
          <textarea
            placeholder="내용을 입력하세요"
            rows={8}
            className={`flex w-full shadow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none text-gray-900
              ${errors.content ? 'border-red-500' : ''}`}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              if (errors.content) setErrors({ ...errors, content: '' });
            }}
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content}</p>
          )}
        </div>

        {/* 하단 버튼 영역 */}
        <div className="flex flex-row py-2 justify-center gap-4 mt-auto">
          {/* 작성 버튼 */}
          <button
            type="submit"
            className="flex px-5 py-3 bg-primary text-white w-32 justify-center rounded-lg
              cursor-pointer transition-all duration-150 hover:bg-primary/80 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? '작성 중...' : '작성'}
          </button>
          
          {/* 취소 버튼 */}
          <button
            type="button"
            className="flex px-5 py-3 bg-gray-300 w-32 justify-center rounded-lg
              hover:bg-gray-400 active:scale-95 transition-all duration-150"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

