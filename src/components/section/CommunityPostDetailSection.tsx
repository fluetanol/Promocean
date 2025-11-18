// frontend/src/components/section/CommunityPostDetailSection.tsx

import Image from "next/image";
import { CommunityPostItemProps, HashtagItemProps } from "@/types/itemType";
import CommunityHashtagSection from "@/components/section/CommunityHashtagSection";
import CommunityPostUserProfileItem from "@/components/item/CommunityPostUserProfileItem";
import CommunityPostCategoryTypeBadges from "@/components/item/CommunityPostCategoryTypeBadges";
import CommunityPostButtonList from "@/components/list/CommunityPostButtonList";
import MarkdownViewer from "@/components/etc/MarkdownViewer";

/**
 * CommunityPostDetailSection component
 * @description CommunityPostDetailSection component is a community post detail section component that displays the community post detail section content
 * @returns {React.ReactNode}
 */
export default function CommunityPostDetailSection( { communityPostData, hashtagList }: { communityPostData: CommunityPostItemProps, hashtagList: HashtagItemProps[] } ) {

  return (
    <div className="p-8">
      
      {/* 메타 데이터 섹션 */}
      <div className="flex flex-col gap-3 border-b border-gray-200 pb-4">

        {/* 제목 */}
        <div className="mb-2 flex flex-row items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            {communityPostData.title}
          </h1>
          <CommunityPostButtonList author={communityPostData.author} />
        </div>
        
        {/* 해시태그, 카테고리/타입 및 사용자 정보 */}
        <div className="flex items-end justify-between">
          {/* 왼쪽: 해시태그, 카테고리/타입 */}
          <div className="flex flex-col gap-2">
            <CommunityHashtagSection hashtagList={hashtagList} />
            <CommunityPostCategoryTypeBadges
              category={communityPostData.category}
              type={communityPostData.type}
            />
          </div>

          {/* 오른쪽: 사용자 정보 및 날짜 */}
          <CommunityPostUserProfileItem
            profileUrl={communityPostData.profileUrl}
            author={communityPostData.author}
            createdAt={communityPostData.createdAt}
          />
        </div>
      </div>
      
      {/* 게시글 내용 */}
      <div className="mt-8 space-y-6">
        {/* 설명 */}
        {communityPostData.description && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">설명</h2>
            <MarkdownViewer content={communityPostData.description} />
          </div>
        )}

        {/* 프롬프트 */}
        {communityPostData.prompt && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-xs font-medium text-gray-900 mb-1">프롬프트</h3>
            <MarkdownViewer content={communityPostData.prompt} />
          </div>
        )}

        {/* 샘플 질문/답변 */}
        {(communityPostData.sampleQuestion || communityPostData.sampleAnswer) && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">예시</h2>

            {communityPostData.sampleQuestion && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="text-xs font-medium text-blue-900 mb-1">질문</h3>
                <MarkdownViewer content={communityPostData.sampleQuestion} />
              </div>
            )}

            {communityPostData.sampleAnswer && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="text-xs font-medium text-green-900 mb-1">답변</h3>
                <MarkdownViewer content={communityPostData.sampleAnswer} />
              </div>
            )}
          </div>
        )}

        {/* 이미지 */}
        {communityPostData.fileUrl && (
          <div className="flex flex-row items-center justify-center">
            <div className="relative w-full max-w-2xl aspect-video overflow-hidden">
              <Image
                src={communityPostData.fileUrl}
                alt="첨부 이미지"
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}