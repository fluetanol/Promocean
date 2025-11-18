'use client'

import { useState } from "react";
import SpaceArchiveItem from "../item/SpaceArchiveItem";
import SpaceArchiveAddModal from "../modal/SpaceArchiveAddModal";
import { SpaceArchiveData } from "@/app/my-space/page";
import { useAuthStore } from "@/store/authStore";
import { useSpaceStore } from "@/store/spaceStore";

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
    const spaceStore = useSpaceStore();

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


    // console.log("isPinnedList:", isPinnedList);

    const displayList = isPinnedList ? pinnedItemListState : archiveItemListState;
    // console.log("displayList:", displayList);

    return (
        <div className="flex flex-wrap flex-row p-7 gap-4">
            {isPinnedList ? (
                <button
                    className={`${interactiveBtnClasses} bg-white outline-2 outline-dodger-blue-11`}
                    aria-label="모든 프롬프트 보기"
                >
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center text-black text-xl font-medium leading-6">
                            모든<br />프롬프트
                        </div>
                    </div>
                </button>
            ) : (
                /* 폴더 추가 버튼: READER 제외 (개인 스페이스 또는 EDITOR, OWNER만 가능) */
                canCreateFolder && (
                    <button
                        className={`${interactiveBtnClasses} bg-white outline-2 outline-dodger-blue-11`}
                        aria-label="새 항목 추가"
                        onClick={onOpenAddModal}
                    >
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="text-center text-black text-4xl font-medium leading-9">+</div>
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