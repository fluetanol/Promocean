'use client'

import { useState } from "react";
import SpaceArchiveItem from "../item/SpaceArchiveItem";
import SpaceArchiveAddModal from "../modal/SpaceArchiveAddModal";
import { SpaceArchiveData } from "@/app/my-space/page";
import { useAuthStore } from "@/store/authStore";
import { useSpaceStore } from "@/store/spaceStore";
import { SpaceAPI } from "@/api/space";
import { useRouter } from "next/navigation";
import { useArchiveFolderStore } from "@/store/archiveFolderStore";

export interface SpaceArchiveListProps {
  isPinnedList?: boolean;
  isTeamSpace: boolean;
  spaceId?: number;
  archiveItemListState: SpaceArchiveData[];
  setArchiveItemListState: (newState: SpaceArchiveData[]) => void;
  pinnedItemListState: SpaceArchiveData[];
  setPinnedItemListState: (newState: SpaceArchiveData[]) => void;
}

const interactiveBtnClasses = `
  w-32 h-44 relative rounded-[10px]
  shadow-[0px_4px_6px_0px_rgba(0,0,0,0.10)] overflow-hidden
  transition-all duration-200 ease-in-out
  hover:-translate-y-1 hover:brightness-105 hover:shadow-lg
  active:translate-y-0 active:scale-95 active:shadow-sm
`;

export default function SpaceArchiveList({
    isPinnedList,
    isTeamSpace,
    spaceId,
    archiveItemListState,
    setArchiveItemListState,
    pinnedItemListState,
    setPinnedItemListState
}: SpaceArchiveListProps) {
    const [isModalOpenState, setIsModalOpenState] = useState(false);
    const [shouldRenderModalState, setShouldRenderModalState] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const spaceStore = useSpaceStore();
    const folderStore = useArchiveFolderStore();

    // 팀 스페이스인 경우 권한 확인
    const userRole = isTeamSpace ? spaceStore.currentSpace?.userRole : null;
    const canCreateFolder = !isTeamSpace || (userRole !== "READER"); // 개인 스페이스 또는 READER가 아닌 경우

    const onOpenAddModal = () => {
        setShouldRenderModalState(true);
        setTimeout(() => {
            setIsModalOpenState(true);
        }, 10);
    };

    const onCloseAddModal = () => {
        setIsModalOpenState(false);
        setTimeout(() => {
            setShouldRenderModalState(false);
        }, 300);
    };

    // 드래그 오버 핸들러
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setIsDragOver(true);
    };

    // 드래그 리브 핸들러
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const router = useRouter();
    const handleAllPrompt = () => {

            folderStore.setCurrentFolder({
            folderId : 0,
            name : "모든 프롬프트",
            color : "bg-primary",
            isPinned : true
            })

        if(isTeamSpace){
            router.push(`/team-space/${spaceId}/all-prompts`)
        }
        else {
            router.push(`/my-space/archive/all-prompts`)
        }
    }

    // 드롭 핸들러 - 빈 공간에 드롭했을 때
    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);

        const draggedData = JSON.parse(e.dataTransfer.getData('application/json')) as SpaceArchiveData;

        // 드래그한 폴더와 드롭 대상의 pinned 상태가 다른 경우에만 처리
        if (draggedData.isPinned !== isPinnedList) {
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

            console.log(`${draggedData.name} 폴더를 드래그하여 ${isPinnedList ? 'Pinned' : '일반'}로 이동`);
        }
    };

    // console.log("isPinnedList:", isPinnedList);

    const displayList = isPinnedList ? pinnedItemListState : archiveItemListState;
    // console.log("displayList:", displayList);

    return (
        <div
            className={`flex flex-wrap flex-row p-6 gap-4 min-h-[200px] transition-all duration-200 ${
                isDragOver ? 'bg-blue-50 ring-2 ring-blue-300 ring-inset rounded-lg' : ''
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {isPinnedList ? (
                <button
                    className={`${interactiveBtnClasses} bg-white border-2 border-gray-200`}
                    aria-label="모든 프롬프트 보기"
                    onClick={handleAllPrompt}
                >
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center text-gray-800 text-xl font-semibold leading-6">
                            모든<br />프롬프트
                        </div>
                    </div>
                </button>
            ) : (
                /* 폴더 추가 버튼: READER 제외 (개인 스페이스 또는 EDITOR, OWNER만 가능) */
                canCreateFolder && (
                    <button
                        className={`${interactiveBtnClasses} bg-white border-2 border-gray-200 hover:border-primary`}
                        aria-label="새 항목 추가"
                        onClick={onOpenAddModal}
                    >
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="text-center text-gray-400 group-hover:text-primary text-4xl font-light leading-9 transition-colors">+</div>
                        </div>
                    </button>
                )
            )}

            {displayList.map((item, index) => (
                <SpaceArchiveItem
                    key={item.folderId ?? index}
                    folderId={item.folderId}
                    name={item.name}
                    color={item.color}
                    isPinned={item.isPinned}
                    isTeamSpace={isTeamSpace}
                    archiveItemListState={archiveItemListState}
                    setArchiveItemListState={setArchiveItemListState}
                    pinnedItemListState={pinnedItemListState}
                    setPinnedItemListState={setPinnedItemListState}
                />
            ))}

            {shouldRenderModalState && (
                <SpaceArchiveAddModal 
                    isOpen={isModalOpenState} 
                    onCloseAddModal={onCloseAddModal}
                    spaceId={spaceId!}
                    archiveItemListState={archiveItemListState}
                    setArchiveItemListState={setArchiveItemListState}
                />
            )}
        </div>
    );
}