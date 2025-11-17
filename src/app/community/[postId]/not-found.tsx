// frontend/src/app/community/[postId]/not-found.tsx

import Link from 'next/link';

/**
 * CommunityPostPage Not Found
 * @description 게시글을 찾을 수 없을 때 표시되는 페이지
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mb-6">
            <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              게시글을 찾을 수 없습니다
            </h2>
            <p className="text-gray-600 mb-8">
              요청하신 게시글이 존재하지 않거나 삭제되었습니다.
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <Link
              href="/community"
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              커뮤니티로 이동
            </Link>
            <Link
              href="/"
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              홈으로 이동
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

