// frontend/src/components/layout/TeamSpaceHeader.tsx

"use client";

import React, { useState } from "react";
import TeamSpaceManageModal from "../modal/TeamSpaceManageModal";

/**
 * TeamSpaceHeaderProps 인터페이스
 * @property {string} nickname - 사용자 닉네임
 * @property {string} [description] - 설명 텍스트
 */
export interface TeamSpaceHeaderProps {
    nickname: string;
    description?: string;
    spaceId? : number;
}

/**
 * 팀 스페이스 헤더 컴포넌트
 * 팀 관리 모달을 열 수 있는 기능이 포함되어 있습니다.
 *
 * @param param0 - TeamSpaceHeaderProps 객체의 분해 할당
 * @property nickname - 사용자 닉네임
 * @property description - 헤더 부연 설명 텍스트
 *
 * @returns {JSX.Element} 팀 스페이스 헤더 컴포넌트
 */
export default function TeamSpaceHeader(
  {nickname, description, spaceId}: TeamSpaceHeaderProps) {

  const [isModalOpenState, setIsModalOpenState] = useState(false);
  const [modalTabState, setModalTabState] = useState<"권한" | "초대" | "수정" | "삭제">("권한");
  const [memberListState, setMemberListState] = useState<string[]>([
    "김철수",
    "이영희",
    "박민수",
    "최지우",
    "강다은",
    "이수민",
    "홍길동"
  ]);
  // console.log("spaceId in TeamSpaceHeader:", spaceId);
  const handleModalOpen = () => {
    setIsModalOpenState(!isModalOpenState);
  }
  const handleModalClose = () => {
    setIsModalOpenState(false);
  }

  return (
    <header className="w-full">
      {/* 상단 영역 - 전체 너비 */}
      <div className="flex flex-row justify-between items-center bg-primary text-white px-8 py-6 w-full">
        <div>
          <h1 className="text-3xl font-semibold">{nickname} 님의 팀 스페이스</h1>
          <p className="text-white/80 text-sm">{description}</p>
        </div>

        <div className="relative flex flex-row gap-3">
          <button className="cursor-pointer p-2 rounded-md hover:bg-primary/40" onClick={handleModalOpen}>팀 관리</button>

          {isModalOpenState && (
            <TeamSpaceManageModal
              spaceId ={spaceId}
              isModalOpenState={isModalOpenState}
              handleModalClose={handleModalClose}
              modalTabState={modalTabState}
              setModalTabState={setModalTabState}
              memberListState={memberListState}
              setMemberListState={setMemberListState}
            />
          )}
        </div>
      </div>
    </header>
  );
}
