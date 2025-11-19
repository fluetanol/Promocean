// frontend/src/components/section/ContestPostSection.tsx

'use client';

import { useSearchParams } from "next/navigation";
import { ContestPostItemProps, ContestNoticeItemProps, ContestSubmissionItemProps } from "@/types/itemType";
import CommunityPostUserProfileItem from "@/components/item/CommunityPostUserProfileItem";
import Tag from "@/components/icon/Tag";
import Calendar from "@/components/icon/Calendar";
import ContestPostTabs from "@/components/filter/ContestPostTabs";
import ContestNoticeSection from "@/components/section/ContestNoticeSection";
import ContestSubmissionSection from "@/components/section/ContestSubmissionSection";
import { formatKoreanDate } from "@/utils/formatDate";
import ContestPostButtonList from "@/components/list/ContestPostButtonList";

export interface ContestPostSectionProps {
  contestPostData: ContestPostItemProps
  ContestNoticeList: ContestNoticeItemProps[]
  contestSubmissionList: ContestSubmissionItemProps[]
}

/**
 * ContestPostSection component
 * @description 컨테스트 글 상세 페이지 섹션 컴포넌트
 * @returns {React.ReactNode}
 */
export default function ContestPostSection({ contestPostData, ContestNoticeList, contestSubmissionList }: ContestPostSectionProps) {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'detail';
  return (
    <div className="p-8">

      {/* 메타 데이터 섹션 */}
      <div className="flex flex-col gap-3 border-gray-200 pb-5">

        {/* 제목 */}
        <div className="mb-2 flex flex-row items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            {contestPostData.title}
          </h1>

          {/* 컨테스트 글 수정/삭제 버튼 */}
          <ContestPostButtonList author={contestPostData.author} contestPostData={contestPostData} />
        </div>

        {/* 대회 정보 및 사용자 정보 */}
        <div className="flex items-end justify-between">

          {/* 왼쪽: 대회 타입 및 날짜 정보 */}
          <div className="flex flex-col gap-3">

            {/* 대회 타입 및 상태 */}
            <div className="flex flex-row items-center gap-4">

              {/* 대회 타입 */}
              <div className="flex flex-row items-center gap-1.5">
                <Tag className="size-5" />
                <span className="text-sm text-gray-700">대회 타입</span>
              </div>

              {/* 상태 */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                <span className="bg-gray-100 text-gray-700 px-2.5 py-0.75 rounded-full text-xs font-medium">
                  {contestPostData.type}
                </span>
                <span className="bg-gray-100 text-gray-700 px-2.5 py-0.75 rounded-full text-xs font-medium">
                  {contestPostData.status}
                </span>
              </div>
            </div>

            {/* 날짜 정보 */}
            {[
              { label: '대회 기간', value: `${formatKoreanDate(contestPostData.startAt)} ~ ${formatKoreanDate(contestPostData.endAt)}` },
              { label: '투표 종료', value: formatKoreanDate(contestPostData.voteEndAt) },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex flex-row items-center gap-2">
                  <Calendar className="size-4.5" />
                  <span className="text-sm text-gray-700">{item.label}</span>
                </div>
                <span className="text-xs text-gray-700">{item.value}</span>
              </div>
            ))}
          </div>

          {/* 오른쪽: 사용자 정보 및 날짜 */}
          <div>
            <CommunityPostUserProfileItem
              profileUrl={contestPostData.profileUrl}
              author={contestPostData.author}
              createdAt={contestPostData.createdAt}
            />
          </div>
        </div>
      </div>

      {/* 탭 */}
      <div>
        <ContestPostTabs />
      </div>

      {/* 콘텐츠 */}
      <div className="mt-8">
        {currentTab === 'detail' && (
          <div className="prose max-w-none">
            <div className="text-gray-700 whitespace-pre-wrap">{contestPostData.content}</div>
          </div>
        )}

        {/* 공지사항 */}
        {currentTab === 'notice' && (
          <ContestNoticeSection ContestNoticeList={ContestNoticeList} contestAuthor={contestPostData.author} />
        )}
        
        {/* 산출물 */}
        {currentTab === 'submission' && (
          <ContestSubmissionSection 
            contestSubmissionList={contestSubmissionList} 
            voteEndAt={contestPostData.voteEndAt}
          />
        )}
        
      </div>
    </div>
  );
}