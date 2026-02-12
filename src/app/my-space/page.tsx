'use client'

import { useEffect, useState } from "react";
import SpaceCardHeader from "@/components/layout/SpaceCardHeader";
import SpaceArchiveList from "@/components/list/SpaceArchiveList";
import AuthGuard from "@/components/auth/AuthGuard";
import { useAuthStore } from "@/store/authStore";
import { SpaceAPI } from "@/api/space";
import { useSpaceStore } from "@/store/spaceStore";
import { useArchiveFolderStore } from "@/store/archiveFolderStore";
import { ErrorFetchResponse, ErrorType } from "@/api/fetcher";
import MockSpaceAPI from "@/api/mock_space/space";
import { GetSpaceArchiveFoldersResponse } from "@/types/apiTypes/space";

export interface SpaceArchiveData {
  folderId : number;
  name: string;
  color: string;
  isPinned: boolean;
}

export default function MySpacePage() {
  return (
    <AuthGuard>
      <MySpaceContent />
    </AuthGuard>
  );
}


function ArchivefolderProcessing(res:GetSpaceArchiveFoldersResponse) : { newArchiveItemListState : SpaceArchiveData[], newPinnedItemListState : SpaceArchiveData[]} {
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
    return { newArchiveItemListState, newPinnedItemListState  };
}


function setCurrentSpaceInStore(spaceId: number, name: string) {
  const spaceStore = useSpaceStore();
  spaceStore.setCurrentSpace({
    spaceId: spaceId,
    name : name,  
    participantCnt : 1,
    spaceCoverUrl : "",
    userRole : "OWNER"
  });
}



function MySpaceContent() {
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
        if(!res) return;
      
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

        const { newArchiveItemListState, newPinnedItemListState } = ArchivefolderProcessing(res);

        setPinnedItemListState(newPinnedItemListState || []);
        setArchiveItemListState(newArchiveItemListState || []);
      } catch(error) {
        console.log("Error fetching space archive folders:", error);

        const fetchError : ErrorFetchResponse =  error as ErrorFetchResponse;
        
        if(fetchError.type === ErrorType.Timeout){
            MockSpaceAPI.getMockSpaceArchiveFoldersData().then((res)=>{
                if(!res) return;
            
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

                const { newArchiveItemListState, newPinnedItemListState } = ArchivefolderProcessing(res);
                
                setPinnedItemListState(newPinnedItemListState || []);
                setArchiveItemListState(newArchiveItemListState || []);
              
            });
        }

      } finally{
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