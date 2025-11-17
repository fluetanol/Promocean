'use client';

// frontend/src/app/team-space/[team-archive]/[folder]/[articleId]/page.tsx

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import SpaceAPI from "@/api/space";
import MySpaceArchiveArticleSection from "@/components/section/MySpaceArchiveArticleSection";
import { ArticleData } from "@/types/apiTypes/space";
import { useSpaceStore } from "@/store/spaceStore";

/**
 * TeamSpaceArchiveArticlePage component
 * @description 팀 스페이스 아카이브 글 상세 페이지입니다.
 * @returns {React.ReactNode}
 */
export default function TeamSpaceArchiveArticlePage() {
  const params = useParams();
  const router = useRouter();
  const spaceStore = useSpaceStore();

  const [articleData, setArticleData] = useState<ArticleData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const articleId = params.articleId as string;

  useEffect(() => {
    const fetchArticleData = async () => {
      setIsLoading(true);
      setError(null);

      // articleId 검증
      const articleIdNum = parseInt(articleId, 10);
      if (isNaN(articleIdNum)) {
        setError('잘못된 게시글 ID입니다.');
        setIsLoading(false);
        return;
      }

      // spaceId 가져오기
      const spaceId = spaceStore.currentSpace?.spaceId;
      if (!spaceId) {
        setError('스페이스 정보를 찾을 수 없습니다.');
        setIsLoading(false);
        return;
      }

      try {
        const data = await SpaceAPI.getArchiveArticleDetail(spaceId, articleIdNum);

        if (!data) {
          setError('게시글을 찾을 수 없습니다.');
          setIsLoading(false);
          return;
        }

        setArticleData(data);
      } catch (err) {
        console.error('Failed to fetch article:', err);
        setError('게시글을 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticleData();
  }, [articleId, spaceStore.currentSpace?.spaceId]);

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white rounded-lg shadow-md p-8">
        <div className="text-gray-600">로딩 중...</div>
      </div>
    );
  }

  // 에러 상태
  if (error || !articleData) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || '게시글을 찾을 수 없습니다.'}</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-6 bg-white rounded-lg shadow-md">
      {/* 글 섹션 */}
      <MySpaceArchiveArticleSection articleData={articleData} />
      {/* 구분선 */}
      <hr className="border-gray-200" />
    </div>
  );
}
