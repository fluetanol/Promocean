'use client';

import { useArchiveFolderStore } from "@/store/archiveFolderStore";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Folder, Bookmark, PenSquare } from "lucide-react";
import { useSpaceStore } from "@/store/spaceStore";

export interface SpaceBoardHeaderProps {
    title? : string;
    description? : string;
    showFolderUI? : boolean;
    customIcon? : 'bookmark' | 'pen-square';
    customIconColor? : string;
}



export function SpaceBoardHeader(   { title, description, showFolderUI = true, customIcon, customIconColor = "#6366f1" } : SpaceBoardHeaderProps ) {

    const router = useRouter();
    const pathname = usePathname();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const folderStore = useArchiveFolderStore();
    const spaceStore = useSpaceStore();
    const currentStore = folderStore.currentFolder;
    const currentSpace = spaceStore.currentSpace;
    const allFolders = folderStore.allFolderList;
    const titleName = currentStore ? currentStore.name : "";

    const handleFolderChange = (folderId: number) => {
        const selectedFolder = allFolders.find(folder => folder.folderId === folderId);
        if (selectedFolder) {
            folderStore.setCurrentFolder(selectedFolder);

            // 현재 경로가 팀 스페이스인지 마이 스페이스인지 확인
            const isTeamSpace = pathname?.startsWith('/team-space');

            if (isTeamSpace && currentSpace) {
                // 팀 스페이스: /team-space/[spaceId]/[folderId]
                router.push(`/team-space/${currentSpace.spaceId}/${folderId}`);
            } else {
                // 마이 스페이스: /my-space/archive/[folderId]
                router.push(`/my-space/archive/${folderId}`);
            }
        }
        setIsDropdownOpen(false);
    };

    // 현재 폴더를 제외한 다른 폴더들만 표시
    const otherFolders = allFolders.filter(folder => folder.folderId !== currentStore?.folderId);

    return(
        <div className="relative w-full px-4 py-6">
            {/* 배경 그라디언트 - 폴더 색상 활용 */}
            {showFolderUI && currentStore && (
                <div
                    className="absolute inset-0 opacity-5 overflow-hidden"
                    style={{
                        background: `linear-gradient(135deg, ${currentStore.color}22 0%, transparent 50%, ${currentStore.color}11 100%)`
                    }}
                />
            )}

            {/* 장식 요소 */}
            {showFolderUI && currentStore && (
                <div className="absolute top-0 right-0 w-64 h-64 opacity-3 overflow-hidden pointer-events-none">
                    <div
                        className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl"
                        style={{ backgroundColor: currentStore.color }}
                    />
                </div>
            )}

            <div className="relative flex items-start justify-between w-full">
                <div className="flex items-start gap-4">
                    {/* 폴더 아이콘 또는 커스텀 아이콘 */}
                    {showFolderUI && currentStore && (
                        <div
                            className="flex items-center justify-center w-14 h-14 rounded-xl shadow-sm mt-1"
                            style={{
                                backgroundColor: `${currentStore.color}15`,
                                border: `2px solid ${currentStore.color}30`
                            }}
                        >
                            <Folder
                                className="w-7 h-7"
                                style={{ color: currentStore.color }}
                                strokeWidth={2}
                            />
                        </div>
                    )}
                    {!showFolderUI && customIcon && (
                        <div
                            className="flex items-center justify-center w-14 h-14 rounded-xl shadow-sm mt-1"
                            style={{
                                backgroundColor: `${customIconColor}15`,
                                border: `2px solid ${customIconColor}30`
                            }}
                        >
                            {customIcon === 'bookmark' && (
                                <Bookmark
                                    className="w-7 h-7"
                                    style={{ color: customIconColor }}
                                    strokeWidth={2}
                                />
                            )}
                            {customIcon === 'pen-square' && (
                                <PenSquare
                                    className="w-7 h-7"
                                    style={{ color: customIconColor }}
                                    strokeWidth={2}
                                />
                            )}
                        </div>
                    )}

                    {/* 제목 및 설명 */}
                    <div className="flex flex-col justify-start">
                        <div className="flex items-center gap-3">
                            <h1 className="text-[40px] font-bold text-gray-900 leading-tight">
                                {title ? title : titleName}
                            </h1>
                            {showFolderUI && currentStore?.isPinned && (
                                <span className="text-2xl" title="고정된 폴더">📌</span>
                            )}
                        </div>
                        {description && (
                            <span className="text-sm font-normal text-gray-600 mt-1">
                                {description}
                            </span>
                        )}
                        {/* 폴더 색상 인디케이터 바 */}
                        {showFolderUI && currentStore && (
                            <div className="flex items-center gap-2 mt-3">
                                <div
                                    className="h-1 w-16 rounded-full"
                                    style={{ backgroundColor: currentStore.color }}
                                />
                                <span className="text-xs text-gray-400">
                                    {allFolders.length}개의 폴더
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* 폴더 이동 드롭다운 */}
                {showFolderUI && currentStore && otherFolders.length > 0 && (
                    <div className="relative mt-2 ml-auto z-50">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm whitespace-nowrap"
                        >
                            <span>다른 폴더로 이동</span>
                            <ChevronDown
                                className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                            />
                        </button>

                        {isDropdownOpen && (
                            <>
                                {/* 배경 클릭시 닫기 */}
                                <div
                                    className="fixed inset-0 z-60"
                                    onClick={() => setIsDropdownOpen(false)}
                                />

                                {/* 드롭다운 메뉴 */}
                                <div className="absolute right-0 z-70 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl max-h-80 overflow-y-auto">
                                    {otherFolders.map((folder) => (
                                        <button
                                            key={folder.folderId}
                                            onClick={() => handleFolderChange(folder.folderId)}
                                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-all flex items-center gap-3 border-b border-gray-100 last:border-b-0 group"
                                        >
                                            <div
                                                className="w-5 h-5 rounded-lg shrink-0 shadow-sm transition-transform group-hover:scale-110"
                                                style={{ backgroundColor: folder.color }}
                                            />
                                            <span className="text-sm font-medium text-gray-900 truncate flex-1">
                                                {folder.name}
                                            </span>
                                            {folder.isPinned && (
                                                <span className="text-xs">📌</span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
      </div>
    )
}