// frontend/src/components/layout/TeamSpaceHeader.tsx

"use client";

import React, { useEffect, useState } from "react";
import TeamSpaceManageModal from "../modal/TeamSpaceManageModal";
import TeamSpaceMyMenuModal from "../modal/TeamSpaceMyMenuModal";
import SpaceAPI, { SpaceParticipants } from "@/api/space";
import { useAuthStore } from "@/store/authStore";
import { useSpaceStore } from "@/store/spaceStore";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";


/**
 * TeamSpaceHeaderProps 인터페이스
 * @property {string} nickname - 사용자 닉네임
 * @property {string} [description] - 설명 텍스트
 */
export interface TeamSpaceHeaderProps {
    nickname: string;
    description?: string;
    spaceId? : number;
    coverImageUrl? :string;
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
  {nickname, description, spaceId, coverImageUrl}: TeamSpaceHeaderProps) {

  console.log("coverImageUrl", coverImageUrl);
  const [isModalOpenState, setIsModalOpenState] = useState(false);
  const [isMyMenuModalOpen, setIsMyMenuModalOpen] = useState(false);
  const [modalTabState, setModalTabState] = useState<"멤버" | "초대" | "수정" | "삭제">("멤버");
  const [memberListState, setMemberListState] = useState<SpaceParticipants[]>([]);
  const [ownerMemberState, setOwnerMemberState] = useState<SpaceParticipants | null>(null);
  const [currentUserSpaceNickname, setCurrentUserSpaceNickname] = useState<string>(nickname);
  const authStore = useAuthStore();
  const spaceStore = useSpaceStore();
  const username = authStore.user?.nickname;
  const userEmail = authStore.user?.email;
  const userNickname = authStore.user?.nickname;
  const router = useRouter();
  const params = useParams();
  const isFolderPage = Boolean(params['folder']);
  console.log("isFolderPage:", isFolderPage);

  // 현재 사용자의 권한 가져오기
  const userRole = spaceStore.currentSpace?.userRole;
  const isOwner = userRole === "OWNER";
  const isEditor = userRole === "EDITOR";
  const isReader = userRole === "READER";

  // 폴더 내부 페이지인지 확인
  const isInFolderPage = Boolean(params['folder']);

  console.log("현재 사용자 권한:", userRole);
  console.log("폴더 내부 페이지:", isInFolderPage);
  // console.log("params['folder']", params['folder']);
  // console.log("params['team-archive']", params['team-archive']);





  // console.log("spaceId in TeamSpaceHeader:", spaceId);
  const handleModalOpen = () => {
    setIsModalOpenState(!isModalOpenState);
  }
  const handleModalClose = () => {
    setIsModalOpenState(false);
  }

  const handleMyMenuOpen = () => {
    setIsMyMenuModalOpen(!isMyMenuModalOpen);
  }
  const handleMyMenuClose = () => {
    setIsMyMenuModalOpen(false);
  }

  const handleWrite = () => {
    console.log("글 쓰기 버튼 클릭됨");
    // 여기에 글쓰기 로직 추가

    router.push('/post?type=team-space&space='+params['team-archive']+'&folder='+params['folder']);
  
  }

  useEffect(()=>{
    const fetchItem = async () =>{  
      if(!spaceId) return;
      try {
        const res = await SpaceAPI.getSpaceParticipants(spaceId);
        const participants: SpaceParticipants[] =  res.participants;


        const owner = participants.find(participant => participant.email=== userEmail) || null;
        if (owner) {
          participants.splice(participants.indexOf(owner), 1); // 소유자 제외
          setCurrentUserSpaceNickname(owner.nickname); // 현재 사용자의 팀 스페이스 별명 설정
        }

        setOwnerMemberState(owner);
        setMemberListState(participants);
     }
      catch (error) {
        console.error("Failed to fetch space participants:", error);
      }
    }
    fetchItem();
  },[spaceId])


  return (
    <header className="relative w-full group">
      {/* 상단 영역 - 전체 너비 */}
      <div className="absolute bg-cover bg-center bg-no-repeat w-full h-full opacity-90"
          style={{backgroundImage: `url(${coverImageUrl})`}}
      />
      <div className="absolute w-full h-full backdrop-blur-none group-hover:backdrop-blur-xs transition-all duration-300"/>

      {/* 어두운 그라데이션 오버레이 - 텍스트 가독성 향상 */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent pointer-events-none"></div>

      <div className={`relative flex flex-row justify-between items-center text-white w-full transition-all duration-300 ease-in-out ${
        isInFolderPage ? 'px-6 py-3.5' : 'px-8 py-15'
      }`}>
        <div
          className="z-10 cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => router.push(`/team-space/${params['team-archive']}`)}
        >
            <h1 className={`flex font-semibold transition-all duration-300 ${isInFolderPage ? 'text-base' : 'text-4xl'}`}>
              {nickname}의 팀 스페이스
            </h1>
            <p className={`text-white/90 transition-all duration-300 ${isInFolderPage ? 'text-[10px]' : 'text-sm'}`}>{description}</p>
        </div>

        <div className = "flex flex-col h-full justify-between">
        <div className="relative flex flex-row gap-2 h-full z-10">

          {/* 글 쓰기: READER 제외 (EDITOR, OWNER만 가능) */}
          {isFolderPage && !isReader && (
            <button className={`cursor-pointer rounded-md bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-all duration-300 border border-white/20 ${
              isInFolderPage ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm'
            }`} onClick={handleWrite}>
              글 쓰기
            </button>
          )}

          <button className={`cursor-pointer rounded-md bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-all duration-300 border border-white/20 ${
            isInFolderPage ? 'px-2 py-1 text-xs' : 'p-2'
          }`} onClick={handleMyMenuOpen}>
            내 메뉴
          </button>

          {/* 팀 관리: 모든 권한에서 접근 가능하지만, 내부에서 권한별로 다르게 표시 */}
          <button className={`cursor-pointer rounded-md bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-all duration-300 border border-white/20 ${
            isInFolderPage ? 'px-2 py-1 text-xs' : 'p-2'
          }`} onClick={handleModalOpen}>
            팀 관리
          </button>
          
          {isMyMenuModalOpen && (
            <TeamSpaceMyMenuModal
              spaceId={spaceId}
              isModalOpenState={isMyMenuModalOpen}
              handleModalClose={handleMyMenuClose}
              currentNickname={currentUserSpaceNickname}
              teamName={`${nickname} 님의 팀 스페이스`}
            />
          )}

          {isModalOpenState && (
            <TeamSpaceManageModal
              spaceId ={spaceId}
              isModalOpenState={isModalOpenState}
              handleModalClose={handleModalClose}
              modalTabState={modalTabState}
              setModalTabState={setModalTabState}
              memberListState={memberListState}
              ownerMemberState={ownerMemberState}
              setMemberListState={setMemberListState}
              userRole={userRole}
            />
          )}
        </div>
        <div className = "flex"></div>
      </div>
      </div>
    </header>
  );
}
