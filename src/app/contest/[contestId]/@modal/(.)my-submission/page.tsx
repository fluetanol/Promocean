// frontend/src/app/contest/[contestId]/@modal/(.)my-submission/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import { SubmissionAPI } from "@/api/contest";
import { ContestSubmissionDetailData } from "@/types/itemType";
import CommunityPostUserProfileItem from "@/components/item/CommunityPostUserProfileItem";
import { useAuthStore } from "@/store/authStore";

/**
 * 대회 내 산출물 모달
 * @description 대회 상세 페이지에서 내 산출물을 조회하는 모달입니다.
 * @returns {React.ReactNode}
 */
export default function ContestMySubmissionModal({ params }: { params: Promise<{ contestId: number }> }) {
  
  const router = useRouter();
  const { contestId } = use(params);
  const { user } = useAuthStore();
  const [submissionDetailData, setSubmissionDetailData] = useState<ContestSubmissionDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editPrompt, setEditPrompt] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editResult, setEditResult] = useState('');

  useEffect(() => {
    const fetchMySubmission = async () => {
      try {
        // /submissions/me API는 상세 데이터를 반환하므로 한 번만 호출
        const { contestMySubmissionItem } = await SubmissionAPI.getMySubmission(contestId);
        setSubmissionDetailData(contestMySubmissionItem);
        setEditPrompt(contestMySubmissionItem.prompt);
        setEditDescription(contestMySubmissionItem.description);
        setEditResult(contestMySubmissionItem.result);
      } catch (error) {
        // 404 에러는 산출물이 없는 것으로 처리
        if (error instanceof Error && error.message.includes('404')) {
          setSubmissionDetailData(null);
        } else {
          console.error('산출물 조회 실패:', error);
          setSubmissionDetailData(null);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchMySubmission();
  }, [contestId]);

  // 수정 시작 - post 페이지로 이동
  const handleEditStart = () => {
    if (!submissionDetailData) return;
    router.push(`/post?type=submission&mode=edit&contestId=${contestId}&submissionId=${submissionDetailData.submissionId}`);
  };

  // 수정 취소
  const handleEditCancel = () => {
    if (submissionDetailData) {
      setEditPrompt(submissionDetailData.prompt);
      setEditDescription(submissionDetailData.description);
      setEditResult(submissionDetailData.result);
    }
    setIsEditing(false);
  };

  // 수정 저장
  const handleUpdateSubmission = async () => {
    if (!submissionDetailData) return;
    
    if (!editPrompt.trim() || !editDescription.trim() || !editResult.trim()) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    try {
      await SubmissionAPI.update(
        contestId,
        submissionDetailData.submissionId,
        editPrompt,
        editDescription,
        editResult
      );
      
      // 최신 데이터로 갱신
      const { contestMySubmissionItem: updatedData } = await SubmissionAPI.getMySubmission(contestId);
      setSubmissionDetailData(updatedData);
      setEditPrompt(updatedData.prompt);
      setEditDescription(updatedData.description);
      setEditResult(updatedData.result);
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      console.error('수정 실패:', error);
      alert('산출물 수정에 실패했습니다.');
    }
  };

  // 삭제 버튼 클릭 시 실행되는 함수
  const handleDeleteSubmission = async () => {
    if (!submissionDetailData) return;
    
    if (!confirm('정말 이 산출물을 삭제하시겠습니까?')) {
      return;
    }

    try {
      await SubmissionAPI.delete(contestId, submissionDetailData.submissionId);
      router.back();
      router.refresh();
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('산출물 삭제에 실패했습니다.');
    }
  };

  const isAuthor = user && submissionDetailData && user.nickname === submissionDetailData.author;

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
        {isLoading ? (
          <>
            <div className="mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">내 산출물</h2>
            </div>
            <div className="text-center py-8 text-gray-500">
              로딩 중...
            </div>
          </>
        ) : !submissionDetailData ? (
          <>
            <div className="mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">내 산출물</h2>
            </div>
            <div className="text-center py-8 text-gray-500">
              제출된 산출물이 없습니다.
            </div>
          </>
        ) : (
          <>
            {/* 헤더 */}
            <div className="mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">내 산출물</h2>
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
              {submissionDetailData && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">설명</h3>
                  {isEditing ? (
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full min-h-[100px] text-gray-700 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary resize-y"
                      placeholder="설명을 입력하세요"
                    />
                  ) : (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-700 whitespace-pre-wrap">{submissionDetailData.description}</p>
                    </div>
                  )}
                </div>
              )}

              {/* 프롬프트 */}
              {submissionDetailData && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">프롬프트</h3>
                  {isEditing ? (
                    <textarea
                      value={editPrompt}
                      onChange={(e) => setEditPrompt(e.target.value)}
                      className="w-full min-h-[100px] text-gray-700 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary resize-y"
                      placeholder="프롬프트를 입력하세요"
                    />
                  ) : (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-700 whitespace-pre-wrap">{submissionDetailData.prompt}</p>
                    </div>
                  )}
                </div>
              )}

              {/* 결과 */}
              {submissionDetailData && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">결과</h3>
                  {isEditing ? (
                    <textarea
                      value={editResult}
                      onChange={(e) => setEditResult(e.target.value)}
                      className="w-full min-h-[200px] text-gray-700 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary resize-y"
                      placeholder="결과를 입력하세요"
                    />
                  ) : (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-700 whitespace-pre-wrap">{submissionDetailData.result}</p>
                    </div>
                  )}
                </div>
              )}

              {/* 투표 수 */}
              {!isEditing && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">투표 수</h3>
                  <span className="text-base text-gray-900 font-medium">{submissionDetailData.voteCnt}표</span>
                </div>
              )}
            </div>

            {/* 수정/삭제 버튼 */}
            {isAuthor && (
              <div className="flex flex-row items-center justify-center gap-2 w-full mt-6 pt-6 border-t border-gray-200">
                {isEditing ? (
                  <>
                    <button
                      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors cursor-pointer"
                      onClick={handleEditCancel}
                    >
                      취소
                    </button>
                    <button
                      className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors cursor-pointer"
                      onClick={handleUpdateSubmission}
                    >
                      저장
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors cursor-pointer"
                      onClick={handleEditStart}
                    >
                      수정하기
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors cursor-pointer"
                      onClick={handleDeleteSubmission}
                    >
                      삭제하기
                    </button>
                  </>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

