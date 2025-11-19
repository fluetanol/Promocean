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
import { useParams, useRouter } from "next/navigation";


/**
 * 특정 팀 스페이스의 아카이브 폴더 리스트가 표시되는 페이지
 * @returns 
 */
export default function TeamSpaceArchivePage() {
  const [archiveItemListState, setArchiveItemListState] = useState<SpaceArchiveData[]>([]);
  const [pinnedItemListState, setPinnedItemListState] = useState<SpaceArchiveData[]>([]);
  const [isLoadingState, setIsLoadingState] = useState(true);
  const [hasError, setHasError] = useState(false);

  const spaceStore = useSpaceStore();
  const archiveFolderStore = useArchiveFolderStore();
  const params = useParams();
  const router = useRouter();

  const spaceIdFromUrl = Number(params.spaceId);
  const currentSpace = spaceStore.currentSpace;
  const spaceId = currentSpace?.spaceId;
  const name = currentSpace?.name;
  const coverImageUrl = currentSpace?.spaceCoverUrl;

  console.log("스페이스 ", currentSpace);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingState(true);
        setHasError(false);

        // 1. currentSpace가 없거나 URL의 spaceId와 다르면 전체 스페이스 목록을 먼저 가져옴
        if (!currentSpace || currentSpace.spaceId !== spaceIdFromUrl) {
          console.log('스페이스 정보 없음 - 전체 목록 조회 시도');

          try {
            const teamSpaceList = await SpaceAPI.getTeamSpaceList();
            const spaces = teamSpaceList?.spaces || [];

            // 전체 스페이스 목록 저장
            spaceStore.setAllTeamSpaces(spaces);

            // URL의 spaceId와 일치하는 스페이스 찾기
            const targetSpace = spaces.find(space => space.spaceId === spaceIdFromUrl);

            if (!targetSpace) {
              // 허가되지 않은 스페이스 - 리다이렉션
              console.error('허가되지 않은 스페이스 접근:', spaceIdFromUrl);
              router.push('/team-space');
              return;
            }

            // currentSpace 설정
            spaceStore.setCurrentSpace(targetSpace);
            console.log('스페이스 정보 설정 완료:', targetSpace);
          } catch (error) {
            // API 에러 (403, 404 등) - 리다이렉션
            console.error('스페이스 목록 조회 실패:', error);
            router.push('/team-space');
            return;
          }
        }

        // 2. 폴더 목록 가져오기
        const res = await SpaceAPI.getSpaceArchiveFoldersData(spaceIdFromUrl);

        const archiveFolders = res?.folders;
        archiveFolderStore.setAllFolderList(archiveFolders || []);

        const newArchiveItemListState: SpaceArchiveData[] = [];
        const newPinnedItemListState: SpaceArchiveData[] = [];

        for (const folder of archiveFolders || []) {
          folder.color = `#${folder.color}`;
          if (folder.isPinned) {
            newPinnedItemListState.push(folder);
          } else {
            newArchiveItemListState.push(folder);
          }
        }

        setPinnedItemListState(newPinnedItemListState);
        setArchiveItemListState(newArchiveItemListState);
        setIsLoadingState(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setHasError(true);
        setIsLoadingState(false);
        // 에러 발생 시 리다이렉션
        router.push('/team-space');
      }
    }

    fetchData();
  }, [spaceIdFromUrl]);

  if (isLoadingState) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <>
    <div className="min-h-screen bg-gray-50">

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