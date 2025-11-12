'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SpaceCardHeader from "@/components/layout/SpaceCardHeader";
import SpaceArchiveList from "@/components/list/SpaceArchiveList";
import MySpaceArchiveFilterSection from "@/components/section/MySpaceArchiveFilterSection";
import { SpaceArchiveData } from "@/app/my-space/page";
import SpaceAPI from "@/api/space";

export default function TeamSpaceArchivePage() {
  const params = useParams();
  const spaceIdParams = params["team-archive"];
  const spaceId = Number(spaceIdParams);
  console.log("스페이스 id ", spaceId);

  const [archiveItemListState, setArchiveItemListState] = useState<SpaceArchiveData[]>([]);
  const [pinnedItemListState, setPinnedItemListState] = useState<SpaceArchiveData[]>([]);
  const [isLoadingState, setIsLoadingState] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("스페이스 아이디 useEffect ", spaceId);
        const res = await SpaceAPI.getSpaceArchiveFoldersData(spaceId);

        const spaceData = res?.folders;
        console.log("data ", spaceData);

        const newArchiveItemListState : SpaceArchiveData[] = [];
        const newPinnedItemListState : SpaceArchiveData[] = [];

        for(const folder of spaceData || []){
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
  }, []);

  if (isLoadingState) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
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
            teamName={"teamName"}
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
            teamName={"teamName"}
            spaceId={spaceId}
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