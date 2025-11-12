'use client';

// frontend/src/components/section/ContestPostSection.tsx

import { useSearchParams } from "next/navigation";
import { ContestPostItemProps, LeaderboardItemProps, ContestNoticeItemProps, ContestSubmissionItemProps } from "@/types/itemType";
import CommunityPostUserProfileItem from "@/components/item/CommunityPostUserProfileItem";
// import LeaderboardList from "@/components/list/LeaderboardList";
import Tag from "@/components/icon/Tag";
import Calendar from "@/components/icon/Calendar";
import ContestPostTabs from "@/components/filter/ContestPostTabs";
import ContestNoticeSection from "@/components/section/ContestNoticeSection";
import ContestSubmissionSection from "@/components/section/ContestSubmissionSection";
import { formatKoreanDate } from "@/utils/formatDate";

/**
 * ContestPostSectionProps interface
 * @description ContestPostSection component props
 */
export interface ContestPostSectionProps {
  contestPostData: ContestPostItemProps
  // leaderboardList: LeaderboardItemProps[]
  ContestNoticeList: ContestNoticeItemProps[]
  contestSubmissionList: ContestSubmissionItemProps[]
  // contestMySubmissionList: ContestSubmissionItemProps[]
}

/**
 * ContestPostSection component
 * @description ContestPostSection component is a contest post section component that displays the contest post section content
 * @returns {React.ReactNode}
 */
// export default function ContestPostSection({ contestPostData, leaderboardList, ContestNoticeList, contestSubmissionList }: ContestPostSectionProps) {
export default function ContestPostSection({ contestPostData, ContestNoticeList, contestSubmissionList }: ContestPostSectionProps) {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'detail';
  return (
    <div className="p-8">
      {/* 메타 데이터 섹션 */}
      <div className="flex flex-col gap-3 border-gray-200 pb-5">
        {/* 제목 */}
        <div className="mb-3">
          <h1 className="text-3xl font-bold text-gray-900">
            {contestPostData.title}
          </h1>
        </div>

        {/* 대회 정보 및 사용자 정보 */}
        <div className="flex items-end justify-between">
          {/* 왼쪽: 대회 타입 및 날짜 정보 */}
          <div className="flex flex-col gap-3">
            {/* 대회 타입 및 상태 */}
            <div className="flex flex-row items-center gap-4">
              <div className="flex flex-row items-center gap-1">
                <Tag />
                <span className="text-gray-500">대회 타입</span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                  {contestPostData.type}
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                  {contestPostData.status}
                </span>
              </div>
            </div>

            {/* 날짜 정보 */}
            <div className="flex items-center gap-4">
              <div className="flex flex-row items-center gap-1">
                <Calendar />
                <span className="text-sm font-medium text-gray-700">대회 기간</span>
              </div>
              <span className="text-sm text-gray-600">{formatKoreanDate(contestPostData.startAt)} ~ {formatKoreanDate(contestPostData.endAt)}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-row items-center gap-1">
                <Calendar />
                <span className="text-sm font-medium text-gray-700">투표 종료일</span>
              </div>
              <span className="text-sm text-gray-600">{formatKoreanDate(contestPostData.voteEndAt)}</span>
            </div>
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

        {/* {currentTab === 'leaderboard' && (
          <LeaderboardList leaderboardList={leaderboardList} />
        )} */}

        {currentTab === 'notice' && (
          <ContestNoticeSection ContestNoticeList={ContestNoticeList} />
        )}
        
        {currentTab === 'submission' && (
          <ContestSubmissionSection contestSubmissionList={contestSubmissionList} />
        )}
        
        {/* {currentTab === 'my-submission' && (
          <ContestSubmissionSection contestSubmissionList={contestMySubmissionList} />
        )} */}
      </div>
    </div>
  );
}