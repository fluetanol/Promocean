"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SpaceArchiveData } from "@/app/my-space/page";
import Pin from "../icon/Pin";
import SpaceArchiveDeleteModal from "../modal/SpaceArchiveDeleteModal";
import SpaceArchiveEditModal from "../modal/SpaceArchiveEditModal";
import SpaceAPI from "@/api/space";
import { colorCodeFrontToBack } from "@/utils/colorController";
import { useArchiveFolderStore } from "@/store/archiveFolderStore";
import { useSpaceStore } from "@/store/spaceStore";

export interface SpaceArchiveItemProps {
    folderId : number;
    name : string;
    color: string;
    isPinned: boolean;
    isTeamSpace :boolean;
    archiveItemListState: SpaceArchiveData[];
    setArchiveItemListState: (newState: SpaceArchiveData[]) => void;
    pinnedItemListState: SpaceArchiveData[];
    setPinnedItemListState: (newState: SpaceArchiveData[]) => void;
}


/**
 * Space Archive의 Folder 아이템 컴포넌트
 * 
 * 
 * @param param0 SpaceArchiveItemProps
 * - folderId : 폴더 ID
 * - name : 폴더 이름
 * - color : 폴더 배경색
 * - isPinned : 폴더 pinned 상태
 * - isTeamSpace : 팀 스페이스 여부
 * - teamName : 팀 스페이스 이름 (팀 스페이스인 경우에만 필요)
 * - spaceId : 스페이스 ID (수정, 삭제 필요 시 선택)
 * - archiveItemListState : 아카이브 일반 폴더 리스트 상태
 * - setArchiveItemListState : 아카이브 일반 폴더 리스트 상태 업데이트 함수
 * - pinnedItemListState : 아카이브 pinned 폴더 리스트 상태
 * - setPinnedItemListState : 아카이브 pinned 폴더 리스트 상태 업데이트 함수
 * 
 * 
 * @returns 
 */

export default function SpaceArchiveItem({
    folderId,
    name,
    color,
    isPinned,
    isTeamSpace,
    archiveItemListState,
    setArchiveItemListState,
    pinnedItemListState,
    setPinnedItemListState
}: SpaceArchiveItemProps) {

    const router = useRouter();
    const [isPinnedState, setIsPinnedState] = useState(isPinned);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const archiveFolderStore = useArchiveFolderStore();
    const spaceStore = useSpaceStore();
    const spaceId = spaceStore.currentSpace?.spaceId;

    // 팀 스페이스의 경우 권한 확인
    const userRole = isTeamSpace ? spaceStore.currentSpace?.userRole : null;
    const isReader = userRole === "READER";
    const canEdit = !isTeamSpace || !isReader; // 개인 스페이스 또는 READER가 아닌 경우
    
    const handleArchiveRoute = () => {
        console.log(`${name} 아카이브 아이템 클릭됨`);
        archiveFolderStore.setCurrentFolder({
            name : name,
            folderId : folderId,
            color : color,
            isPinned : isPinned
        })

        if(isTeamSpace && spaceId) {
          router.push(`/team-space/${spaceId}/${folderId}`);
        } else {
          router.push(`/my-space/archive/${folderId}`);
        }
    }

    const handlePinnedClick = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        const res = await SpaceAPI.patchMySpaceArchiveFolderPinStatus(spaceId!, folderId);
        const newPinnedState = !isPinnedState;
        setIsPinnedState(newPinnedState);
        // false → true (일반 폴더 → Pinned)
        if (newPinnedState) {
            // 일반 리스트에서 제거
            const updatedArchiveList = archiveItemListState.filter(item => item.name !== name);
            setArchiveItemListState(updatedArchiveList);
            // Pinned 리스트에 추가
            setPinnedItemListState([...pinnedItemListState, { folderId, name, color, isPinned: true }]);
        }
        // true → false (Pinned → 일반 폴더)
        else {
            // Pinned 리스트에서 제거
            const updatedPinnedList = pinnedItemListState.filter(item => item.name !== name);
            setPinnedItemListState(updatedPinnedList);
            // 일반 리스트에 추가
            setArchiveItemListState([...archiveItemListState, { folderId, name, color, isPinned: false }]);
        }
        
        const res2 = await SpaceAPI.getSpaceArchiveFoldersData(spaceId!);
        

        console.log("pin res " ,res);
        console.log(`${name} 아카이브 폴더 pinned ${newPinnedState ? '설정' : '해제'}됨`);

    console.log("폴더 데이터 재조회 ",res2);
    }

    const handleDelete = async() => {
        // Pinned 상태에 따라 해당 리스트에서 삭제
        const res = await SpaceAPI.deleteMySpaceArchiveFolderData(spaceId!, folderId);

        if (isPinnedState) {
            const updatedPinnedList = pinnedItemListState.filter(item => item.name !== name);
            setPinnedItemListState(updatedPinnedList);
        } else {
            const updatedArchiveList = archiveItemListState.filter(item => item.name !== name);
            setArchiveItemListState(updatedArchiveList);
        }
        

    //   setArchiveItemListState([]);
    //     setPinnedItemListState([]);


        console.log(`${name} 아카이브 폴더 삭제됨`);
    }

    const handleEdit = async (newTitle: string, newBgColor: string) => {
        console.log("id ",spaceId, folderId)

        await SpaceAPI.patchMySpaceArchiveFolderData(spaceId!, folderId, {
            name: newTitle,
            color: colorCodeFrontToBack(newBgColor),
        });

        // Pinned 상태에 따라 해당 리스트에서 업데이트
        if (isPinnedState) {
            const updatedPinnedList = pinnedItemListState.map(item =>
                item.folderId === folderId ? { ...item, name: newTitle, color: newBgColor } : item
            );
            setPinnedItemListState(updatedPinnedList);
        } else {
            const updatedArchiveList = archiveItemListState.map(item =>
                item.folderId === folderId ? { ...item, name: newTitle, color: newBgColor } : item
            );
            setArchiveItemListState(updatedArchiveList);
        }


        // setArchiveItemListState([]);
        // setPinnedItemListState([]);

        console.log(`${name} 아카이브 폴더 수정됨:`, { newTitle, newBgColor });
    }

    // 드래그 시작 핸들러
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        // Reader 권한인 경우 드래그 불가
        if (!canEdit) {
            e.preventDefault();
            return;
        }

        setIsDragging(true);
        //dataTransfer란 드래그 앤 드롭 시에 데이터를 전달하는 역할을 하는 객체
        //effectAllowed는 드래그 앤 드롭 작업에서 허용되는 효과를 지정
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('application/json', JSON.stringify({
            folderId,
            name,
            color,
            isPinned: isPinnedState
        }));
    };

    // 드래그 종료 핸들러
    const handleDragEnd = () => {
        setIsDragging(false);
    };

    // 드래그 오버 핸들러
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        //dataTransfer은 기본적으로 드롭이 불가능하도록 설정되어 있어야 하므로, 
        //여기서 드롭 가능하도록 설정
        //dropEffect는 커서 모양을 지정
        e.dataTransfer.dropEffect = 'move';
    };

    // 드롭 핸들러
    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        //어차피 자스 객체들은 제이슨 형태라서 파싱 가능함을 잊지 말자
        const draggedData = JSON.parse(e.dataTransfer.getData('application/json')) as SpaceArchiveData;

        // 자기 자신에게 드롭한 경우 무시
        if (draggedData.folderId === folderId) {
            return;
        }

        // 드래그한 폴더와 드롭 대상 폴더의 pinned 상태가 다른 경우 핀 상태 변경
        if (draggedData.isPinned !== isPinnedState) {
            // API 호출로 핀 상태 변경
            await SpaceAPI.patchMySpaceArchiveFolderPinStatus(spaceId!, draggedData.folderId);

            // 드래그한 아이템을 원래 리스트에서 제거하고 새 리스트에 추가
            if (draggedData.isPinned) {
                // Pinned -> 일반 폴더로 이동
                const updatedPinnedList = pinnedItemListState.filter(item => item.folderId !== draggedData.folderId);
                setPinnedItemListState(updatedPinnedList);
                setArchiveItemListState([...archiveItemListState, { ...draggedData, isPinned: false }]);
            } else {
                // 일반 폴더 -> Pinned로 이동
                const updatedArchiveList = archiveItemListState.filter(item => item.folderId !== draggedData.folderId);
                setArchiveItemListState(updatedArchiveList);
                setPinnedItemListState([...pinnedItemListState, { ...draggedData, isPinned: true }]);
            }

            console.log(`${draggedData.name} 폴더를 드래그하여 ${isPinnedState ? 'Pinned' : '일반'}로 이동`);
        }
    };

    return (
        <>
            <div
                draggable={canEdit}
                onDragStart={canEdit ? handleDragStart : undefined}
                onDragEnd={canEdit ? handleDragEnd : undefined}
                onDragOver={canEdit ? handleDragOver : undefined}
                onDrop={canEdit ? handleDrop : undefined}
                className={`
                    group w-32 h-44 relative rounded-xl
                    shadow-md overflow-hidden
                    transition-all duration-300 ease-out
                    hover:-translate-y-2 hover:shadow-2xl
                    active:translate-y-0 active:scale-95 active:shadow-md
                    cursor-pointer border-2 border-white/50 hover:border-white
                    ${isDragging ? 'opacity-50 scale-95' : ''}
                `}
                style={{ backgroundColor: color }}
                onClick={handleArchiveRoute}
            >
                {/* 배경 그라데이션 오버레이 */}
                <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-black/10 group-hover:from-white/20 group-hover:to-black/5 transition-all duration-300"></div>

                {/* 폴더 아이콘 워터마크 */}
                <div className="absolute top-2 left-2 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    </svg>
                </div>

                {/* 폴더 이름 영역 */}
                <div className="absolute w-full h-14 px-2 py-2.5 left-0 top-30 bg-white/95 backdrop-blur-sm flex justify-center items-center shadow-lg">
                    <div className="text-center text-gray-800 text-base font-semibold leading-tight line-clamp-2 px-1">
                        {name}
                    </div>
                </div>

                {/* Pin 영역 - Reader 권한이 아닐 때만 표시 */}
                {canEdit && (
                    <div className="absolute top-2.5 right-2.5 z-10" onClick={(e) => e.stopPropagation()}>
                        <label className="relative block w-7 h-7 cursor-pointer group/pin">
                            <input
                                type="checkbox"
                                checked={isPinnedState}
                                className="absolute opacity-0 w-7 h-7 cursor-pointer"
                                aria-label={`${name} 아카이브 폴더 pinned 설정`}
                                onChange={handlePinnedClick}
                            />
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                                isPinnedState
                                    ? 'bg-white shadow-lg scale-105'
                                    : 'bg-white/90 hover:bg-white group-hover/pin:shadow-md group-hover/pin:scale-105'
                            }`}>
                                <Pin
                                    className={`w-4 h-4 transition-all duration-200 ${
                                        isPinnedState
                                            ? 'fill-red-500 stroke-red-600 drop-shadow-sm'
                                            : 'fill-none stroke-gray-500 group-hover/pin:stroke-gray-700'
                                    }`}
                                />
                            </div>
                        </label>
                    </div>
                )}

                {/* 수정 및 삭제 버튼 영역 - Reader 권한이 아닐 때만 표시 */}
                {canEdit && (
                    <div className="absolute bottom-16 left-0 w-full flex flex-row gap-1.5 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="flex-1 px-2.5 py-2 bg-white text-gray-700 text-xs font-medium rounded-lg
                                hover:bg-gray-50 hover:shadow-lg active:scale-95 transition-all duration-150 border border-gray-200"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsEditModalOpen(true);
                            }}
                        >
                            수정
                        </button>
                        <button
                            className="flex-1 px-2.5 py-2 bg-red-500 text-white text-xs font-medium rounded-lg
                                hover:bg-red-600 hover:shadow-lg active:scale-95 transition-all duration-150"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsDeleteModalOpen(true);
                            }}
                        >
                            삭제
                        </button>
                    </div>
                )}
            </div>

            {/* 삭제 확인 모달 */}
            <SpaceArchiveDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title={name}
            />

            {/* 수정 모달 */}
            <SpaceArchiveEditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                currentTitle={name}
                currentBgColor={color}
                onSave={handleEdit}
            />
        </>
    );
}