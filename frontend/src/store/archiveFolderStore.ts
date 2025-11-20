// frontend/src/store/archiveFolderStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * SpaceArchiveData 인터페이스 - 아카이브 폴더 정보
 * @property folderId - 폴더 ID
 * @property name - 폴더 이름
 * @property color - 폴더 색상
 * @property isPinned - 핀 고정 여부
 */
export interface SpaceArchiveData {
  folderId: number;
  name: string;
  color: string;
  isPinned: boolean;
}

/**
 * ArchiveFolderState 인터페이스
 * @property allFolderList - API 호출로 얻은 전체 폴더 목록
 * @property currentFolder - 현재 선택된 폴더 정보
 * @property setAllFolderList - 전체 폴더 목록 설정 함수
 * @property setCurrentFolder - 현재 폴더 설정 함수
 * @property clearCurrentFolder - 현재 폴더 초기화 함수
 * @property clearAllFolders - 모든 폴더 정보 초기화 함수
 * @property addFolder - 폴더 추가 함수
 * @property updateFolder - 폴더 업데이트 함수
 * @property deleteFolder - 폴더 삭제 함수
 * @property togglePinFolder - 폴더 핀 상태 토글 함수
 */
interface ArchiveFolderState {
  allFolderList: SpaceArchiveData[];
  currentFolder: SpaceArchiveData | null;
  setAllFolderList: (folders: SpaceArchiveData[]) => void;
  setCurrentFolder: (folder: SpaceArchiveData) => void;
  clearCurrentFolder: () => void;
  clearAllFolders: () => void;
  addFolder: (folder: SpaceArchiveData) => void;
  updateFolder: (folderId: number, updates: Partial<SpaceArchiveData>) => void;
  deleteFolder: (folderId: number) => void;
  togglePinFolder: (folderId: number) => void;
}

export const useArchiveFolderStore = create<ArchiveFolderState>()(
  persist(
    (set, get) => ({
      allFolderList: [],
      currentFolder: null,

      setAllFolderList: (folders: SpaceArchiveData[]) => {
        set({
          allFolderList: folders,
        });
      },

      setCurrentFolder: (folder: SpaceArchiveData) => {
        set({
          currentFolder: folder,
        });
      },

      clearCurrentFolder: () => {
        set({
          currentFolder: null,
        });
      },

      clearAllFolders: () => {
        set({
          allFolderList: [],
          currentFolder: null,
        });
      },

      addFolder: (folder: SpaceArchiveData) => {
        const { allFolderList } = get();
        set({
          allFolderList: [...allFolderList, folder],
        });
      },

      updateFolder: (folderId: number, updates: Partial<SpaceArchiveData>) => {
        const { allFolderList, currentFolder } = get();

        const updatedList = allFolderList.map((folder) =>
          folder.folderId === folderId ? { ...folder, ...updates } : folder
        );

        // 현재 선택된 폴더가 업데이트되는 경우 currentFolder도 업데이트
        const updatedCurrentFolder =
          currentFolder?.folderId === folderId
            ? { ...currentFolder, ...updates }
            : currentFolder;

        set({
          allFolderList: updatedList,
          currentFolder: updatedCurrentFolder,
        });
      },

      deleteFolder: (folderId: number) => {
        const { allFolderList, currentFolder } = get();
        set({
          allFolderList: allFolderList.filter(
            (folder) => folder.folderId !== folderId
          ),
          // 삭제된 폴더가 현재 선택된 폴더인 경우 null로 설정
          currentFolder:
            currentFolder?.folderId === folderId ? null : currentFolder,
        });
      },

      togglePinFolder: (folderId: number) => {
        const { allFolderList, currentFolder } = get();

        const updatedList = allFolderList.map((folder) =>
          folder.folderId === folderId
            ? { ...folder, isPinned: !folder.isPinned }
            : folder
        );

        // 현재 선택된 폴더의 핀 상태도 업데이트
        const updatedCurrentFolder =
          currentFolder?.folderId === folderId
            ? { ...currentFolder, isPinned: !currentFolder.isPinned }
            : currentFolder;

        set({
          allFolderList: updatedList,
          currentFolder: updatedCurrentFolder,
        });
      },
    }),
    {
      name: 'archive-folder-storage',
    }
  )
);
