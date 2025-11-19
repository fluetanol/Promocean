// frontend/src/components/section/MySpaceArchiveArticleSection.tsx

'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HashtagItemProps } from "@/types/itemType";
import CommunityHashtagSection from "@/components/section/CommunityHashtagSection";
import { ArticleData } from "@/types/apiTypes/space";
import SpaceAPI from "@/api/space";
import { useSpaceStore } from "@/store/spaceStore";
import { useArchiveFolderStore } from "@/store/archiveFolderStore";
import MarkdownViewer from "@/components/etc/MarkdownViewer";

interface MySpaceArchiveArticleSectionProps {
  articleData: ArticleData;
}

/**
 * 마이 스페이스의 아카이브 글 상세 섹션 컴포넌트
 * @description MySpaceArchiveArticleSection component is a my space archive article detail section component that displays the my space archive article detail section content
 * @returns {React.ReactNode}
 */
export default function MySpaceArchiveArticleSection({ articleData }: MySpaceArchiveArticleSectionProps) {
    const router = useRouter();
    const spaceStore = useSpaceStore();
    const folderStore = useArchiveFolderStore();
    const hashtagList: HashtagItemProps[] = articleData.tags.map((tag: string) => ({ tag }));

    const [isDeleting, setIsDeleting] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleEdit = () => {
      const currentFolder = folderStore.currentFolder;

      if (!currentFolder) {
        alert('폴더 정보를 찾을 수 없습니다.');
        return;
      }

      // 수정 페이지로 이동: /post?type=my-space&folderId=123&mode=edit&articleId=456
      const editUrl = `/post?type=my-space&folderId=${currentFolder.folderId}&mode=edit&articleId=${articleData.articleId}`;
      router.push(editUrl);
    };

    const handleDelete = async () => {
      // 삭제 확인 모달
      if (!confirm('정말로 이 게시글을 삭제하시겠습니까?\n삭제된 게시글은 복구할 수 없습니다.')) {
        return;
      }

      setIsDeleting(true);

      try {
        const spaceId = spaceStore.currentSpace?.spaceId;
        const currentFolder = folderStore.currentFolder;

        if (!spaceId) {
          alert('스페이스 정보를 찾을 수 없습니다.');
          setIsDeleting(false);
          return;
        }

        if (!currentFolder) {
          alert('폴더 정보를 찾을 수 없습니다.');
          setIsDeleting(false);
          return;
        }

        const result = await SpaceAPI.deleteArchiveArticle(spaceId, currentFolder.folderId, articleData.articleId);

        if (result) {
          alert('게시글이 성공적으로 삭제되었습니다.');

          // 아카이브 목록 페이지로 직접 이동
          // 마이스페이스: /my-space/archive/[folderId]
          router.push(`/my-space/archive/${currentFolder.folderId}`);
        } else {
          throw new Error('삭제 응답이 없습니다.');
        }
      } catch (error) {
        console.error('게시글 삭제 실패:', error);
        alert('게시글 삭제에 실패했습니다. 다시 시도해주세요.');
      } finally {
        setIsDeleting(false);
      }
    };


  return (
    <div className="flex flex-col justify-center p-8  min-w-xl">
      
      {/* 메타 데이터 섹션 */}
      <div className="flex flex-col gap-3 border-b border-gray-200 pb-5">

        {/* 제목 */}
        <div className="mb-3">
          <h1 className="text-3xl font-bold text-gray-900">
            {articleData.title}
          </h1>
        </div>
        
        {/* 해시태그, 카테고리/타입 및 사용자 정보 */}
        <div className="flex items-end justify-between">
          {/* 왼쪽: 해시태그, 카테고리/타입 */}
          <div className="flex flex-col gap-4">
            <CommunityHashtagSection hashtagList={hashtagList} />
            {/* <CommunityPostCategoryTypeBadges
              category={articleData.category}
              type={articleData.type}
            /> */}
          </div>

          {/* 오른쪽: 사용자 정보 및 날짜 */}
          {/* <CommunityPostUserProfileItem
            profileUrl={articleData.fileUrl}
            author={articleData.author}
            createdAt={articleData.updatedAt}
          /> */}
        </div>
      </div>
      
      {/* 게시글 내용 */}
      <div className="mt-8 space-y-6">
        {/* 설명 */}
        {articleData.description && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">설명</h2>
            <MarkdownViewer content={articleData.description} />
          </div>
        )}

        {/* 프롬프트 */}
        {articleData.prompt && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-1">프롬프트</h3>
            <MarkdownViewer content={articleData.prompt} />
          </div>
        )}

        {/* 샘플 질문/답변 */}
        {(articleData.sampleQuestion || articleData.sampleAnswer) && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">예시</h2>
            {articleData.sampleQuestion && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="text-sm font-medium text-blue-900 mb-1">질문</h3>
                <MarkdownViewer content={articleData.sampleQuestion} />
              </div>
            )}
            {articleData.sampleAnswer && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="text-sm font-medium text-green-900 mb-1">답변</h3>
                <MarkdownViewer content={articleData.sampleAnswer} />
              </div>
            )}
          </div>
        )}

        {/* 이미지 */}
        {articleData.fileUrl && (
          <div className="flex flex-row items-center justify-center">
            {!imageError ? (
              <div className="relative w-full max-w-2xl aspect-video overflow-hidden rounded-lg border border-gray-200">
                <Image
                  src={articleData.fileUrl}
                  alt="첨부 이미지"
                  fill
                  className="object-contain"
                  onError={() => {
                    console.error('이미지 로드 실패:', articleData.fileUrl);
                    setImageError(true);
                  }}
                />
              </div>
            ) : (
              <div className="w-full max-w-2xl aspect-video flex flex-col items-center justify-center bg-red-50 border-2 border-red-300 rounded-lg">
                <svg className="w-16 h-16 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-lg text-red-600 font-semibold mb-2">이미지를 불러올 수 없습니다</p>
                <p className="text-sm text-red-500">이미지 파일에 접근할 수 없거나 손상되었습니다</p>
                <p className="text-xs text-gray-500 mt-2 px-4 text-center break-all">{articleData.fileUrl}</p>
              </div>
            )}
          </div>
        )}

        {/* 수정/삭제 버튼 - 우하단 */}
        <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handleEdit}
            disabled={isDeleting}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            수정
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? '삭제 중...' : '삭제'}
          </button>
        </div>
      </div>
    </div>
  )
}