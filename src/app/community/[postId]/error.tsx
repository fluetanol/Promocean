// frontend/src/app/community/[postId]/error.tsx

'use client';

import { useRouter } from 'next/navigation';
interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * CommunityPostPage Error Boundary
 * @description 게시글 상세 페이지에서 발생한 에러를 처리하는 컴포넌트
 */
export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();

  const isNotFound = error.message.includes('404') || error.message.includes('찾을 수 없습니다');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mb-6">
            <h1 className="text-6xl font-bold text-gray-300 mb-4">
              {isNotFound ? '404' : '에러'}
            </h1>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {isNotFound ? '게시글을 찾을 수 없습니다' : '문제가 발생했습니다'}
            </h2>
            <p className="text-gray-600 mb-8">
              {isNotFound
                ? '요청하신 게시글이 존재하지 않거나 삭제되었습니다.'
                : error.message || '예상치 못한 에러가 발생했습니다.'}
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.back()}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              이전 페이지로
            </button>
            <button
              onClick={() => router.push('/community')}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              커뮤니티로 이동
            </button>
            {!isNotFound && (
              <button
                onClick={reset}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                다시 시도
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

