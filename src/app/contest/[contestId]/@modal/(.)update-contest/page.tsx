"use client";

// frontend/src/app/contest/[contestId]/@modal/(.)update-contest/page.tsx

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ContestAPI } from "@/api/contest";
import { ContestPostItemProps } from "@/types/itemType";

/**
 * 대회 수정 모달
 * @description 대회 상세 페이지에서 대회를 수정하는 경우 나오는 모달입니다.
 * @returns {React.ReactNode}
 */
export default function ContestUpdateModal() {

  const router = useRouter();
  const params = useParams();
  const contestId = Number(params.contestId);
  
  const [contestData, setContestData] = useState<ContestPostItemProps | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [startAt, setStartAt] = useState('');
  const [endAt, setEndAt] = useState('');
  const [voteEndAt, setVoteEndAt] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchContestData = async () => {
      try {
        const { contestData } = await ContestAPI.getDetail(contestId);
        setContestData(contestData);
        setTitle(contestData.title);
        setContent(contestData.content);
        setStartAt(contestData.startAt?.split('T')[0] || '');
        setEndAt(contestData.endAt?.split('T')[0] || '');
        setVoteEndAt(contestData.voteEndAt?.split('T')[0] || '');
      } catch (error) {
        console.error('대회 정보 조회 실패:', error);
        router.back();
      }
    };
    fetchContestData();
  }, [contestId, router]);

  // type을 문자열에서 숫자로 변환 (이미지: 1, 텍스트: 2)
  const getTypeNumber = (typeString: string): number => {
    return typeString === '이미지' ? 1 : 2;
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) {
      newErrors.title = '제목을 입력해주세요.';
    }

    if (!content.trim()) {
      newErrors.content = '내용을 입력해주세요.';
    }

    if (!startAt) {
      newErrors.startAt = '시작일을 선택해주세요.';
    }

    if (!endAt) {
      newErrors.endAt = '종료일을 선택해주세요.';
    }

    if (!voteEndAt) {
      newErrors.voteEndAt = '투표 종료일을 선택해주세요.';
    }

    if (startAt && endAt && new Date(startAt) > new Date(endAt)) {
      newErrors.endAt = '종료일은 시작일보다 이후여야 합니다.';
    }

    if (endAt && voteEndAt && new Date(endAt) > new Date(voteEndAt)) {
      newErrors.voteEndAt = '투표 종료일은 종료일보다 이후여야 합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !contestData) {
      return;
    }

    setIsSubmitting(true);

    try {
      await ContestAPI.update(contestId, {
        title: title.trim(),
        content: content.trim(),
        type: getTypeNumber(contestData.type),
        startAt,
        endAt,
        voteEndAt,
      });

      // 성공 시 페이지 새로고침하고 모달 닫기
      router.refresh();
      router.back();
    } catch (error) {
      console.error('대회 수정 실패:', error);
      alert(`대회 수정에 실패했습니다. ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    router.back();
  };

  if (!contestData) {
    return null;
  }

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
        <h1 className="text-2xl font-semibold">대회 수정</h1>

        {/* 제목 입력 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            제목
          </label>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            className={`flex w-full h-12 shadow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all
              ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
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
            className={`flex w-full shadow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none
              ${errors.content ? 'border-red-500' : 'border-gray-300'}`}
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

        {/* 시작일 입력 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            시작일
          </label>
          <input
            type="date"
            className={`flex w-full h-12 shadow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all
              ${errors.startAt ? 'border-red-500' : 'border-gray-300'}`}
            value={startAt}
            onChange={(e) => {
              setStartAt(e.target.value);
              if (errors.startAt) setErrors({ ...errors, startAt: '' });
            }}
          />
          {errors.startAt && (
            <p className="text-red-500 text-sm mt-1">{errors.startAt}</p>
          )}
        </div>

        {/* 종료일 입력 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            종료일
          </label>
          <input
            type="date"
            className={`flex w-full h-12 shadow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all
              ${errors.endAt ? 'border-red-500' : 'border-gray-300'}`}
            value={endAt}
            onChange={(e) => {
              setEndAt(e.target.value);
              if (errors.endAt) setErrors({ ...errors, endAt: '' });
            }}
          />
          {errors.endAt && (
            <p className="text-red-500 text-sm mt-1">{errors.endAt}</p>
          )}
        </div>

        {/* 투표 종료일 입력 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            투표 종료일
          </label>
          <input
            type="date"
            className={`flex w-full h-12 shadow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all
              ${errors.voteEndAt ? 'border-red-500' : 'border-gray-300'}`}
            value={voteEndAt}
            onChange={(e) => {
              setVoteEndAt(e.target.value);
              if (errors.voteEndAt) setErrors({ ...errors, voteEndAt: '' });
            }}
          />
          {errors.voteEndAt && (
            <p className="text-red-500 text-sm mt-1">{errors.voteEndAt}</p>
          )}
        </div>

        {/* 하단 버튼 영역 */}
        <div className="flex flex-row py-2 justify-center gap-4 mt-auto">
          {/* 수정 버튼 */}
          <button
            type="submit"
            className="flex px-5 py-3 bg-primary text-white w-32 justify-center rounded-lg
              cursor-pointer transition-all duration-150 hover:bg-primary/80 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? '수정 중...' : '수정'}
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

