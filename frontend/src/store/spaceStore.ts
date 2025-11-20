// frontend/src/store/spaceStore.ts

import { SpaceRole } from '@/enum/TeamSpaceRole';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * TeamSpaceInfo 인터페이스 - 팀 스페이스 정보
 * @property name - 스페이스 이름
 * @property participantCnt - 참여자 수
 * @property spaceCoverUrl - 스페이스 커버 이미지 URL
 * @property spaceId - 스페이스 ID
 */
export interface TeamSpaceInfo {
  name: string;
  participantCnt: number;
  spaceCoverUrl: string;
  spaceId: number;
  userRole : SpaceRole;
}

/**
 * SpaceState 인터페이스
 * @property allTeamSpaces - 전체 팀 스페이스 목록
 * @property currentSpace - 현재 선택된 스페이스 정보 (팀 스페이스 또는 개인 스페이스)
 * @property setAllTeamSpaces - 전체 팀 스페이스 목록 설정 함수
 * @property setCurrentSpace - 현재 스페이스 설정 함수
 * @property clearCurrentSpace - 현재 스페이스 초기화 함수
 * @property clearAllSpaces - 모든 스페이스 정보 초기화 함수
 */
interface SpaceState {
  allTeamSpaces: TeamSpaceInfo[];
  currentSpace: TeamSpaceInfo | null;
  setAllTeamSpaces: (spaces: TeamSpaceInfo[]) => void;
  setCurrentSpace: (space: TeamSpaceInfo) => void;
  clearCurrentSpace: () => void;
  clearAllSpaces: () => void;
}

export const useSpaceStore = create<SpaceState>()(
  persist(
    (set) => ({
      allTeamSpaces: [],
      currentSpace: null,

      setAllTeamSpaces: (spaces: TeamSpaceInfo[]) => {
        set({
          allTeamSpaces: spaces,
        });
      },

      setCurrentSpace: (space: TeamSpaceInfo) => {
        set({
          currentSpace: space,
        });
      },

      clearCurrentSpace: () => {
        set({
          currentSpace: null,
        });
      },

      clearAllSpaces: () => {
        set({
          allTeamSpaces: [],
          currentSpace: null,
        });
      },
    }),
    {
      name: 'space-storage',
    }
  )
);
