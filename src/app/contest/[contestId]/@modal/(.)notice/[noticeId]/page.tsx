// frontend/src/app/contest/[postId]/@modal/(.)notice/[noticeId]/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import CommunityPostUserProfileItem from "@/components/item/CommunityPostUserProfileItem";
import { ContestAPI } from "@/api/contest";
import { ContestNoticeDetailData } from "@/types/itemType";

/**
 * 대회 상세 페이지 공지사항 모달
 * @description 대회 상세 페이지에서 공지 사항을 조회하는 경우 나오는 모달입니다.
 * @returns {React.ReactNode}
 */
export default function ContestNoticeModal({ params }: { params: Promise<{ contestId: number, noticeId: number }> }) {
  
  const router = useRouter();
  const { contestId, noticeId } = use(params);
  const [noticeData, setNoticeData] = useState<ContestNoticeDetailData | null>(null);

  useEffect(() => {
    const fetchNoticeDetail = async () => {
      const { noticeData } = await ContestAPI.getContestNoticeDetailData(contestId, noticeId);
      setNoticeData(noticeData);
    };
    fetchNoticeDetail();
  }, [contestId, noticeId]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      onClick={() => router.back()}
    >
      {/* 반투명 오버레이*/}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* 모달 본문 */}
      <div
        className="relative bg-white p-6 rounded-xl shadow-xl w-[90vw] max-w-[800px] max-h-[80vh] overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {!noticeData ? (
          <>
            {/* 헤더 - 데이터 없을 때 */}
            <div className="mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">공지사항</h2>
            </div>

            {/* 에러 메시지 */}
            <div className="text-center py-8 text-gray-500">
              공지사항을 불러올 수 없습니다.
            </div>
          </>
        ) : (
          <>
            {/* 헤더 - 제목 */}
            <div className="mb-6 pb-4 border-gray-200 flex flex-col justify-between items-start gap-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {noticeData.title}
              </h2>
              
              {/* 작성자 정보 */}
              <CommunityPostUserProfileItem
                profileUrl={noticeData.profileUrl}
                author={noticeData.author}
                createdAt={noticeData.createdAt}
              />
            </div>

            {/* 내용 */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="prose max-w-none">
                <div className="text-gray-700 whitespace-pre-wrap">
                  {noticeData.content}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
