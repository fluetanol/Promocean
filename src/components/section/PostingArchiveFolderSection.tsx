'use client';

import React from "react";
import Pin from "@/components/icon/Pin";
import { SpaceArchiveData } from "@/app/my-space/page";

export interface ArchiveFolderItem {
  title: string;
  bgColor: string;
  isPinned: boolean;
}

export interface PostingArchiveFolderSectionProps {
  selectedFolder: string;
  onFolderChange: (folder: string, folderId :number) => void;
  pinnedFolders: SpaceArchiveData[];
  normalFolders: SpaceArchiveData[];
}

/**
 * PostingArchiveFolderSection component
 * @description 아카이브 폴더 선택 섹션 컴포넌트 (라디오 버튼 형태)
 * @returns {React.ReactNode}
 */
export default function PostingArchiveFolderSection({
  selectedFolder,
  onFolderChange,
  pinnedFolders,
  normalFolders
}: PostingArchiveFolderSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">아카이브 폴더</h3>

      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {/* Pinned 폴더 */}
        {pinnedFolders.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2">
              Pinned
            </p>
            {pinnedFolders.map((folder, index) => (
              <label
                key={`pinned-${index}`}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border
                  ${selectedFolder === folder.name
                    ? 'bg-primary/10 border-primary shadow-sm'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
              >
                <input
                  type="radio"
                  name="archive-folder"
                  value={folder.name}
                  checked={selectedFolder === folder.name}
                  onChange={(e) => onFolderChange(e.target.value, folder.folderId)}
                  className="w-4 h-4 text-primary focus:ring-primary focus:ring-2"
                />
                <div className="flex items-center gap-2 flex-1">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: folder.color }}
                  />
                  <span className="font-medium text-gray-800">{folder.name}</span>
                  <Pin className="w-4 h-4 fill-red-400 stroke-gray-800 ml-auto" />
                </div>
              </label>
            ))}
          </div>
        )}

        {/* Normal 폴더 */}
        {normalFolders.length > 0 && (
          <div className="space-y-2">
            {pinnedFolders.length > 0 && (
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2 mt-4">
                Folder
              </p>
            )}
            {normalFolders.map((folder, index) => (
              <label
                key={`normal-${index}`}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border
                  ${selectedFolder === folder.name
                    ? 'bg-primary/10 border-primary shadow-sm'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
              >
                <input
                  type="radio"
                  name="archive-folder"
                  value={folder.name}
                  checked={selectedFolder === folder.name}
                  onChange={(e) => onFolderChange(e.target.value, folder.folderId)}
                  className="w-4 h-4 text-primary focus:ring-primary focus:ring-2"
                />
                <div className="flex items-center gap-2 flex-1">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: folder.color }}
                  />
                  <span className="font-medium text-gray-800">{folder.name}</span>
                </div>
              </label>
            ))}
          </div>
        )}

        {pinnedFolders.length === 0 && normalFolders.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">
            생성된 아카이브 폴더가 없습니다.
          </p>
        )}
      </div>

      <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-200">
        게시글을 저장할 아카이브 폴더를 선택하세요
      </p>
    </div>
  );
}
