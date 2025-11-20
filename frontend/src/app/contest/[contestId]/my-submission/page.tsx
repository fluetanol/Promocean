// frontend/src/app/contest/[contestId]/my-submission/page.tsx

"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmissionAPI } from "@/api/contest";
import { ContestSubmissionDetailData } from "@/types/itemType";
import CommunityPostUserProfileItem from "@/components/item/CommunityPostUserProfileItem";
import { useAuthStore } from "@/store/authStore";
import Image from "next/image";
import { getContestImageUrl } from "@/utils/imageUtils";

/**
 * 대회 내 산출물 페이지
 * @description 대회 내 산출물을 조회하고 수정하는 페이지입니다.
 * @returns {React.ReactNode}
 */
export default function ContestMySubmissionPage() {
  const router = useRouter();
  const params = useParams();
  const contestId = Number(params.contestId);
  const { user } = useAuthStore();
  const [submissionDetailData, setSubmissionDetailData] = useState<ContestSubmissionDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMySubmission = async () => {
      try {
        const { contestMySubmissionItem } = await SubmissionAPI.getMySubmission(contestId);
        setSubmissionDetailData(contestMySubmissionItem);
      } catch (error) {
        // 404 에러는 산출물이 없는 것으로 처리
        if (error instanceof Error && error.message.includes('404')) {
          setSubmissionDetailData(null);
        } else {
          setSubmissionDetailData(null);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchMySubmission();
  }, [contestId]);

  // 수정하기 버튼 클릭 - post 페이지로 이동
  const handleEdit = () => {
    if (!submissionDetailData) return;
    router.push(`/post?type=submission&mode=edit&contestId=${contestId}&submissionId=${submissionDetailData.submissionId}`);
  };

  // 삭제 버튼 클릭 시 실행되는 함수
  const handleDeleteSubmission = async () => {
    if (!submissionDetailData) return;
    
    if (!confirm('정말 이 산출물을 삭제하시겠습니까?')) {
      return;
    }

    try {
      await SubmissionAPI.delete(contestId, submissionDetailData.submissionId);
      alert('산출물이 삭제되었습니다.');
      router.push(`/contest/${contestId}`);
      router.refresh();
    } catch (error) {
      alert('산출물 삭제에 실패했습니다.');
    }
  };

  const isAuthor = user && submissionDetailData && user.nickname === submissionDetailData.author;
  // 모달 페이지와 동일한 로직: "텍스트"가 아니면 이미지로 처리
  const isText = submissionDetailData?.type === "텍스트" ? true : false;
  const isImageType = !isText;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {isLoading ? (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center py-8 text-gray-500">
              로딩 중...
            </div>
          </div>
        ) : !submissionDetailData ? (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center py-8 text-gray-500">
              제출된 산출물이 없습니다.
            </div>
            <div className="text-center mt-4">
              <button
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors cursor-pointer"
                onClick={() => router.push(`/post?type=submission&contestId=${contestId}`)}
              >
                산출물 제출하기
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8">
            {/* 헤더 */}
            <div className="mb-6 pb-4 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900">내 산출물</h1>
            </div>

            {/* 작성자 정보 */}
            <div className="mb-6">
              <CommunityPostUserProfileItem
                profileUrl={submissionDetailData.profileUrl}
                author={submissionDetailData.author}
                createdAt=""
              />
            </div>

            {/* 산출물 정보 */}
            <div className="mb-6 space-y-4">
              {/* 설명 */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">설명</h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-wrap">{submissionDetailData.description}</p>
                </div>
              </div>

              {/* 프롬프트 */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">프롬프트</h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-wrap">{submissionDetailData.prompt}</p>
                </div>
              </div>

              {/* 결과 */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">결과</h3>
                {!isText && submissionDetailData.result ? (
                  <div className="mb-6 flex items-center justify-center">
                    <div className="relative w-full max-w-2xl aspect-video overflow-hidden rounded-lg bg-gray-100">
                      <Image
                        src={submissionDetailData.result}
                        alt={submissionDetailData.description}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 800px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-wrap">{submissionDetailData.result}</p>
                  </div>
                )}
              </div>

              {/* 투표 수 */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">투표 수</h3>
                <span className="text-base text-gray-900 font-medium">{submissionDetailData.voteCnt}표</span>
              </div>
            </div>

            {/* 수정/삭제 버튼 */}
            {isAuthor && (
              <div className="flex flex-row items-center justify-center gap-2 w-full mt-6 pt-6 border-t border-gray-200">
                <button
                  className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors cursor-pointer"
                  onClick={handleEdit}
                >
                  수정하기
                </button>
                <button
                  className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors cursor-pointer"
                  onClick={handleDeleteSubmission}
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
