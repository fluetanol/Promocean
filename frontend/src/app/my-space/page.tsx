'use client'

import { use, useEffect, useState } from "react";
import SpaceCardHeader from "@/components/layout/SpaceCardHeader";
import SpaceArchiveList from "@/components/list/SpaceArchiveList";
import MySpaceArchiveFilterSection from "@/components/section/MySpaceArchiveFilterSection";
import { useAuthStore } from "@/store/authStore";
import { SpaceAPI } from "@/api/space";
import { useSpaceStore } from "@/store/spaceStore";
import { useArchiveFolderStore } from "@/store/archiveFolderStore";

export interface SpaceArchiveData {
  folderId : number;
  name: string;
  color: string;
  isPinned: boolean;
}

export default function MySpacePage() {
  const [archiveItemListState, setArchiveItemListState] = useState<SpaceArchiveData[]>([]);
  const [pinnedItemListState, setPinnedItemListState] = useState<SpaceArchiveData[]>([]);
  const [isLoadingState, setIsLoadingState] = useState(true);

  //부분적 구독을 하고 싶으면 이런 구문을 쓰자.
  //const personalSpaceIdState = useAuthStore((state)=>state.user?.personalSpaceId);
  // console.log("렌더링?")

  const authStore = useAuthStore();
  const spaceStore = useSpaceStore();
  const folderStore = useArchiveFolderStore();
  const user = authStore.user;
  const personalSpaceId = user?.personalSpaceId;
  const name = user?.nickname || "나의 스페이스";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await SpaceAPI.getSpaceArchiveFoldersData(personalSpaceId!);

        if(!res){ 
          return;
        }

        if(personalSpaceId){
          
        spaceStore.setCurrentSpace({
          spaceId: personalSpaceId!,
          name : name,
          participantCnt : 1,
          spaceCoverUrl : "",
          userRole : "OWNER"
        });
        }
        
        folderStore.setAllFolderList(res.folders);

        //TODO :  가져온 response 를 pinned 와 none pinned로 나누어 리스트를 연결해야 합니다.
        const newArchiveItemListState : SpaceArchiveData[] = [];
        const newPinnedItemListState : SpaceArchiveData[] = [];

        for(const folder of res.folders){
          folder.color = `#${folder.color}`;
          if(folder.isPinned){
            newPinnedItemListState.push(folder);
          } else {
            newArchiveItemListState.push(folder);
          }
        }
        // const mySpaceData = await mySpaceArchiveRes.json() as MySpaceArchiveDataResponse;
        // console.log("data ", mySpaceData);
        setPinnedItemListState(newPinnedItemListState || []);
        setArchiveItemListState(newArchiveItemListState || []);
        setIsLoadingState(false);
      } catch (error) {
        setIsLoadingState(false);
      }
    };

    fetchData();
  }, [personalSpaceId]);

  if (isLoadingState) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <div className="flex justify-end-safe">
        <div className="shrink-0 min-w-[380px]">
          <MySpaceArchiveFilterSection buttonMode="search" />
        </div>
      </div> */}

      <div className="flex justify-start px-6 pt-6 pb-2 w-full">
        <div className="w-full">
          <SpaceCardHeader title="Pinned" />
          <SpaceArchiveList
            isPinnedList={true}
            isTeamSpace={false}
            spaceId={personalSpaceId!}
            archiveItemListState={archiveItemListState}
            setArchiveItemListState={setArchiveItemListState}
            pinnedItemListState={pinnedItemListState}
            setPinnedItemListState={setPinnedItemListState}
          />
        </div>
      </div>

      <div className="flex justify-start px-6 pt-4 pb-6 w-full">
        <div className="w-full">
          <SpaceCardHeader title="Folder" />
          <SpaceArchiveList
            isPinnedList={false}
            isTeamSpace={false}
            spaceId={personalSpaceId!}
            archiveItemListState={archiveItemListState}
            setArchiveItemListState={setArchiveItemListState}
            pinnedItemListState={pinnedItemListState}
            setPinnedItemListState={setPinnedItemListState}
          />
        </div>
      </div>
    </div>
  );
}