"use client";

// frontend/src/app/contest/[contestId]/@modal/(.)submission/[submissionId]/page.tsx

import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import Image from "next/image";
import CommunityPostUserProfileItem from "@/components/item/CommunityPostUserProfileItem";
import Heart from "@/components/icon/Heart";
import { SubmissionAPI, VoteAPI } from "@/api/contest";
import { ContestSubmissionDetailData } from "@/types/itemType";

/**
 * 대회 상세 페이지 산출물 모달
 * @description 대회 상세 페이지에서 산출물을 조회하는 경우 나오는 모달입니다.
 * @returns {React.ReactNode}
 */
export default function ContestSubmissionModal({ params }: { params: Promise<{ contestId: number, submissionId: number }> }) {
  const router = useRouter();
  const { contestId, submissionId } = use(params);
  const [submissionData, setSubmissionData] = useState<ContestSubmissionDetailData | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSubmissionDetail = async () => {
      try {
        setError(null);
        const { submissionData } = await SubmissionAPI.getDetail(contestId, submissionId);
        setSubmissionData(submissionData);
      } catch (err) {
        console.error('산출물 조회 실패:', err);
        setError(err instanceof Error ? err : new Error('산출물을 불러올 수 없습니다.'));
      }
    };
    fetchSubmissionDetail();
  }, [contestId, submissionId]);

  const isText = submissionData?.type === "텍스트" ? true : false;

  // 투표 버튼 클릭 시 실행되는 함수
  const handleVoteSubmission = async () => {
    VoteAPI.create(contestId, submissionId);
    router.refresh();
  };
  

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
        {!submissionData ? (
          <>
            {/* 헤더 - 데이터 없을 때 */}
            <div className="mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">산출물</h2>
            </div>
            
            {/* 에러 메시지 */}
            <div className="text-center py-8 text-gray-500">
              산출물을 불러올 수 없습니다.
            </div>
          </>
        ) : (
          <>
            {/* 헤더 - 제목 */}
            <div className="mb-6 pb-4 border-gray-200 flex flex-col justify-between items-start gap-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {submissionData.description}
              </h2>
            {/* </div> */}

            {/* 작성자 정보 + 타입 배지 - 오른쪽 정렬 */}
            {/* <div className="flex justify-end items-center gap-4 mb-6"> */}
              {/* 타입 배지 */}
              {/* <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                {submissionData.type}
              </span> */}

              <div className="flex flex-row items-center justify-between w-full">
                {/* 작성자 정보 */}
                <CommunityPostUserProfileItem
                  profileUrl={submissionData.profileUrl}
                  author={submissionData.author}
                  createdAt={submissionData.updatedAt}
                />

                {/* 추천수 */}
                <div className="flex items-center gap-1 transition-colors">
                  <Heart />
                  <span className="text-sm font-medium">{submissionData.voteCnt}</span>
                </div>
              </div>
            </div>

            {/* 텍스트 or 이미지 결과 */}
            {!isText ? (
              <div className="mb-6 flex items-center justify-center">
                <div className="relative w-full max-w-2xl aspect-video overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={submissionData.result}
                    alt={submissionData.description}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ) : (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-text text-lg mb-4 group-hover:text-primary transition-colors">
                  프롬프트
                </h3>
                <div className="text-gray-700 whitespace-pre-wrap">
                  {submissionData.result}
                </div>
              </div>
            )}
          </>
        )}

        {/* 투표하기 */}
        <div className="flex flex-row items-center justify-center gap-2 w-full">
          <button
            className="bg-primary text-white px-4 py-2 rounded-md"
            onClick={handleVoteSubmission}
          >
            투표하기
          </button>
        </div>

      </div>
    </div>
  );
}
