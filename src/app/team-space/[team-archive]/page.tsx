'use client'

import { useEffect, useState } from "react";
import SpaceCardHeader from "@/components/layout/SpaceCardHeader";
import SpaceArchiveList from "@/components/list/SpaceArchiveList";
import MySpaceArchiveFilterSection from "@/components/section/MySpaceArchiveFilterSection";
import { SpaceArchiveData } from "@/app/my-space/page";
import SpaceAPI from "@/api/space";
import TeamSpaceHeader from "@/components/layout/TeamSpaceHeader";
import { useSpaceStore } from "@/store/spaceStore";
import { useArchiveFolderStore } from "@/store/archiveFolderStore";

export default function TeamSpaceArchivePage() {
  const [archiveItemListState, setArchiveItemListState] = useState<SpaceArchiveData[]>([]);
  const [pinnedItemListState, setPinnedItemListState] = useState<SpaceArchiveData[]>([]);
  const [isLoadingState, setIsLoadingState] = useState(true);

  const spaceStore = useSpaceStore();
 
  const archiveFolderStore = useArchiveFolderStore();
  const currentSpace = spaceStore.currentSpace;
  const spaceId = currentSpace?.spaceId;
  const name  = currentSpace?.name;

  console.log("스페이스 ",currentSpace);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(!currentSpace) return;
        
        console.log("스페이스 아이디 useEffect ", spaceId);
        //없으면 -1로 보내어 의도적인 에러 발생
        const res = await SpaceAPI.getSpaceArchiveFoldersData(spaceId || -1);

        const archiveFolders = res?.folders;
        archiveFolderStore.setAllFolderList(archiveFolders || []);

        const newArchiveItemListState : SpaceArchiveData[] = [];
        const newPinnedItemListState : SpaceArchiveData[] = [];

        for(const folder of archiveFolders || []){
          folder.color = `#${folder.color}`;
          if(folder.isPinned){
            newPinnedItemListState.push(folder);
          } else {
            newArchiveItemListState.push(folder);
          }
        }

          setPinnedItemListState(newPinnedItemListState);
          setArchiveItemListState(newArchiveItemListState);
          setIsLoadingState(false);
        }
       catch (error) {
        console.error("Failed to fetch data:", error);
        setIsLoadingState(false);
      }
    }

    fetchData();
  }, [currentSpace]);

  if (isLoadingState) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <>
    <TeamSpaceHeader nickname={name||"팀 이름"} spaceId={spaceId}/>
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-end-safe">
        <div className="shrink-0 min-w-[380px]">
          <MySpaceArchiveFilterSection buttonMode="search"/>
        </div>
      </div>

      <div className="flex justify-start p-4 w-full">
        <div className="w-full">
          <SpaceCardHeader title="Pinned"/>
          <SpaceArchiveList
            isPinnedList={true}
            isTeamSpace={true}

            spaceId={spaceId}
            archiveItemListState={archiveItemListState}
            setArchiveItemListState={setArchiveItemListState}
            pinnedItemListState={pinnedItemListState}
            setPinnedItemListState={setPinnedItemListState}
          />
        </div>
      </div>

      <div className="flex justify-start p-4 w-full">
        <div className="w-full">
          <SpaceCardHeader title="Folder"/>
          <SpaceArchiveList
            isPinnedList={false}
            isTeamSpace={true}
            spaceId={spaceId}
            archiveItemListState={archiveItemListState}
            setArchiveItemListState={setArchiveItemListState}
            pinnedItemListState={pinnedItemListState}
            setPinnedItemListState={setPinnedItemListState}
          />
        </div>
      </div>
    </div>
    </>
  );
}