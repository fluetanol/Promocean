'use client';

// frontend/src/components/item/CommunityCommentItem.tsx

import Image from "next/image";
import { CommunityCommentItemProps } from "@/types/itemType";
import { formatKoreanDateTime } from "@/utils/formatDate";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { ReplyAPI } from "@/api/community";
import { useRouter } from "next/navigation";

interface CommunityCommentItemWithPostIdProps extends CommunityCommentItemProps {
  postId: number;
  onUpdate?: () => void;
}

/**
 * CommunityCommentItem component
 * @description 댓글 아이템 컴포넌트입니다. 작성자의 프로필 이미지, 이름, 작성 시간 및 댓글 내용을 표시합니다.
 * @returns {React.ReactNode}
 */
export default function CommunityCommentItem({ replyId, author, profileUrl, content, createdAt, postId, onUpdate }: CommunityCommentItemWithPostIdProps) {
  const { isLoggedIn, user } = useAuthStore();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [isDeleting, setIsDeleting] = useState(false);

  const isAuthor = isLoggedIn && user?.nickname === author;

  // 댓글 수정
  const handleEdit = () => {
    setIsEditing(true);
    setEditContent(content);
  };

  // 댓글 수정 취소
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(content);
  };

  // 댓글 수정
  const handleUpdate = async () => {
    if (!editContent.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    try {
      await ReplyAPI.update(postId, replyId, editContent.trim());
      setIsEditing(false);
      onUpdate?.();
      router.refresh();
    } catch (error) {
      if (!(error instanceof Error)) return;

      const errorMessage = error.message;

      switch (errorMessage) {
        case '인증되지 않은 회원입니다':
          alert('로그인이 필요합니다.');
          break;
        case '게시글 정보를 찾을 수 없습니다.':
          alert('게시글을 찾을 수 없습니다.');
          break;
        default:
          alert(errorMessage);
          break;
      }
    }
  };

  // 댓글 삭제
  const handleDelete = async () => {
    if (!confirm('댓글을 삭제하시겠습니까?')) {
      return;
    }

    setIsDeleting(true);

    try {
      await ReplyAPI.delete(postId, replyId);
      onUpdate?.();
      router.refresh();
    } catch (error) {
      if (!(error instanceof Error)) return;

      const errorMessage = error.message;

      switch (errorMessage) {
        case '인증되지 않은 회원입니다':
          alert('로그인이 필요합니다.');
          break;
        case '게시글 정보를 찾을 수 없습니다.':
          alert('게시글을 찾을 수 없습니다.');
          break;
        default:
          alert(errorMessage);
          break;
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="py-4 border-b border-gray-200 last:border-b-0">
      <div className="flex gap-3">
        {/* 프로필 이미지 */}
        <div className="flex-shrink-0">
          {profileUrl ? (
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={profileUrl}
                alt={author}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm flex-shrink-0">
              🐥
            </div>
          )}
        </div>

        {/* 댓글 내용 */}
        <div className="flex-1 min-w-0">
          {/* 작성자 정보 */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900 text-sm">{author}</span>
              <span className="text-xs text-gray-500">
                {formatKoreanDateTime(createdAt)}
              </span>
            </div>
            
            {/* 수정/삭제 버튼 */}
            {isAuthor && !isEditing && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleEdit}
                  className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                >
                  수정
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="text-xs text-red-500 hover:text-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting ? '삭제 중...' : '삭제'}
                </button>
              </div>
            )}
          </div>
          
          {/* 댓글 텍스트 또는 수정 폼 */}
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-1.5 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-1.5 text-sm bg-primary hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  수정
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-700 text-sm whitespace-pre-wrap">{content}</p>
          )}
        </div>
      </div>
    </div>
  )
}