// frontend/src/app/contest/[postId]/@modal/(.)notice/[noticeId]/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import CommunityPostUserProfileItem from "@/components/item/CommunityPostUserProfileItem";
import { ContestAPI, NoticeAPI } from "@/api/contest";
import { ContestNoticeDetailData } from "@/types/itemType";
import { useAuthStore } from "@/store/authStore";
import Tag from "@/components/icon/Tag";

/**
 * 대회 상세 페이지 공지사항 모달
 * @description 대회 상세 페이지에서 공지 사항을 조회하는 경우 나오는 모달입니다.
 * @returns {React.ReactNode}
 */
export default function ContestNoticeModal({ params }: { params: Promise<{ contestId: number, noticeId: number }> }) {
  
  const router = useRouter();
  const { contestId, noticeId } = use(params);
  const { isLoggedIn, user } = useAuthStore();
  const [noticeData, setNoticeData] = useState<ContestNoticeDetailData | null>(null);
  const [contestAuthor, setContestAuthor] = useState<string | null>(null);
  const [contestProfileUrl, setContestProfileUrl] = useState<string | null>(null);
  const [contestType, setContestType] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const [noticeResult, contestResult] = await Promise.all([
        NoticeAPI.getDetail(contestId, noticeId),
        ContestAPI.getDetail(contestId),
      ]);
      setNoticeData(noticeResult.noticeData);
      setContestAuthor(contestResult.contestData.author);
      setContestProfileUrl(contestResult.contestData.profileUrl || null);
      setContestType(contestResult.contestData.type || null);
      setEditTitle(noticeResult.noticeData.title);
      setEditContent(noticeResult.noticeData.content);
    };
    fetchData();
  }, [contestId, noticeId]);

  const handleEditStart = () => {
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    if (noticeData) {
      setEditTitle(noticeData.title);
      setEditContent(noticeData.content);
    }
    setIsEditing(false);
  };

  const handleEditSave = async () => {
    if (!editTitle.trim() || !editContent.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }
    try {
      await NoticeAPI.update(contestId, noticeId, editTitle, editContent);
      const { noticeData: updatedNotice } = await NoticeAPI.getDetail(contestId, noticeId);
      setNoticeData(updatedNotice);
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      alert('공지사항 수정에 실패했습니다.');
    }
  };

  const handleDeleteNotice = async () => {
    if (!confirm('정말 이 공지사항을 삭제하시겠습니까?')) {
      return;
    }
    try {
      await NoticeAPI.delete(contestId, noticeId);
      router.refresh();
      router.back();
    } catch (error) {
      alert('공지사항 삭제에 실패했습니다.');
    }
  };

  // 공지사항 작성자는 대회 작성자와 동일하다고 가정
  const isAuthor = isLoggedIn && user && contestAuthor && user.nickname === contestAuthor;

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
            {/* 모달 제목 */}
            {isEditing && (
              <h1 className="text-2xl font-semibold mb-6">공지사항 수정</h1>
            )}

            {/* 헤더 - 제목 */}
            {!isEditing && (
              <div className="mb-6 pb-5 border-b border-gray-200 flex flex-col gap-3">
                {/* 제목 및 수정/삭제 버튼 */}
                <div className="flex flex-row items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {noticeData.title}
                  </h2>
                  
                  {/* 수정/삭제 버튼 - 작성자에게만 표시 */}
                  {isAuthor && (
                    <div className="flex flex-row items-center gap-3">
                      <button
                        className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
                        onClick={handleEditStart}
                      >
                        수정
                      </button>
                      <button
                        className="text-sm text-red-500 hover:text-red-700 cursor-pointer"
                        onClick={handleDeleteNotice}
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>
                
                {/* 해시태그 아이콘/타입 및 사용자 정보 */}
                <div className="flex items-end justify-between">
                  {/* 왼쪽: 해시태그 아이콘, 타입 */}
                  <div className="flex flex-row items-center gap-4">
                    <div className="flex flex-row items-center gap-2">
                      <Tag />
                      <span className="text-sm text-gray-600">대회 타입</span>
                    </div>
                    {contestType && (
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                        {contestType}
                      </span>
                    )}
                  </div>

                  {/* 오른쪽: 사용자 정보 */}
                  {contestAuthor && (
                    <CommunityPostUserProfileItem
                      profileUrl={contestProfileUrl || ''}
                      author={contestAuthor}
                      createdAt={noticeData.createdAt}
                    />
                  )}
                </div>
              </div>
            )}

            {/* 수정 모드 */}
            {isEditing && (
              <>
                {/* 취소/저장 버튼 - 우측 상단 */}
                {isAuthor && (
                  <div className="flex flex-row items-center justify-end gap-3 mb-6">
                    <button
                      className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
                      onClick={handleEditCancel}
                    >
                      취소
                    </button>
                    <button
                      className="text-sm text-primary hover:text-primary/80 cursor-pointer"
                      onClick={handleEditSave}
                    >
                      저장
                    </button>
                  </div>
                )}

                {/* 제목 입력 */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    제목
                  </label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full text-gray-900 shadow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    placeholder="제목을 입력하세요"
                  />
                </div>

                {/* 내용 입력 */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    내용
                  </label>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={8}
                    className="flex w-full shadow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none text-gray-900"
                    placeholder="내용을 입력하세요"
                  />
                </div>
              </>
            )}

            {/* 내용 (읽기 모드) */}
            {!isEditing && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="prose max-w-none">
                  <div className="text-gray-700 whitespace-pre-wrap">
                    {noticeData.content}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
