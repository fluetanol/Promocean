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

  const spaceIdFromUrl = Number(params.spaceId);
  const folderIdFromUrl = Number(params.folderId);
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

      try {
        // 1. 스페이스 정보 확인 및 로드
        if (!spaceStore.currentSpace || spaceStore.currentSpace.spaceId !== spaceIdFromUrl) {
          console.log('스페이스 정보 없음 - 목록 조회');

          try {
            const teamSpaceList = await SpaceAPI.getTeamSpaceList();
            const spaces = teamSpaceList?.spaces || [];
            spaceStore.setAllTeamSpaces(spaces);

            const targetSpace = spaces.find(space => space.spaceId === spaceIdFromUrl);

            if (!targetSpace) {
              console.error('허가되지 않은 스페이스:', spaceIdFromUrl);
              router.push('/team-space');
              return;
            }

            spaceStore.setCurrentSpace(targetSpace);
          } catch (error) {
            console.error('스페이스 목록 조회 실패:', error);
            router.push('/team-space');
            return;
          }
        }

        // 2. 게시글 데이터 가져오기
        const data = await SpaceAPI.getArchiveArticleDetail(spaceIdFromUrl, articleIdNum);

        if (!data) {
          setError('게시글을 찾을 수 없습니다.');
          setIsLoading(false);
          return;
        }

        setArticleData(data);
      } catch (err) {
        console.error('Failed to fetch article:', err);
        setError('게시글을 불러오는데 실패했습니다.');
        // 에러 시 폴더 목록으로 리다이렉션
        router.push(`/team-space/${spaceIdFromUrl}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticleData();
  }, [articleId, spaceIdFromUrl]);

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
