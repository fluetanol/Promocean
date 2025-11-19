'use client';

// frontend/src/app/team-space/[spaceId]/[folderId]/page.tsx
import { SpaceBoardHeader } from "@/components/layout/SpaceBoardHeader";
import SpaceArchiveBoardList from "@/components/list/SpaceArchiveBoardList";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSpaceStore } from "@/store/spaceStore";
import { useArchiveFolderStore } from "@/store/archiveFolderStore";
import SpaceAPI from "@/api/space";

export default function TeamSpaceArchiveFolderPage() {
  const params = useParams();
  const router = useRouter();
  const spaceStore = useSpaceStore();
  const folderStore = useArchiveFolderStore();
  const [isLoading, setIsLoading] = useState(true);

  const spaceIdFromUrl = Number(params.spaceId);
  // "all-prompts"는 folderId 0으로 처리 (모든 프롬프트 보기)
  const isAllPromptsView = params.folderId === 'all-prompts';
  const folderIdFromUrl = isAllPromptsView ? 0 : Number(params.folderId);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        // 1. 스페이스 정보 확인 및 로드
        if (!spaceStore.currentSpace || spaceStore.currentSpace.spaceId !== spaceIdFromUrl) {
          console.log('스페이스 정보 없음 - 목록 조회');

          try {
            const teamSpaceList = await SpaceAPI.getTeamSpaceList();
            const spaces = teamSpaceList?.spaces || [];
            spaceStore.setAllTeamSpaces(spaces);

            const targetSpace = spaces.find(space => space.spaceId === spaceIdFromUrl);

            if (!targetSpace) {
              console.error('허가되지 않은 스페이스:', spaceIdFromUrl);
              router.push('/team-space');
              return;
            }

            spaceStore.setCurrentSpace(targetSpace);
          } catch (error) {
            console.error('스페이스 목록 조회 실패:', error);
            router.push('/team-space');
            return;
          }
        }

        // 2. 폴더 정보 확인 및 로드
        if (isAllPromptsView) {
          // "모든 프롬프트" 가상 폴더 설정
          console.log('모든 프롬프트 보기 모드');
          folderStore.setCurrentFolder({
            folderId: 0,
            name: '모든 프롬프트',
            color: 'bg-primary',
            isPinned: true
          });
        } else if (!folderStore.currentFolder || folderStore.currentFolder.folderId !== folderIdFromUrl) {
          console.log('폴더 정보 없음 - 폴더 목록 조회');

          try {
            const res = await SpaceAPI.getSpaceArchiveFoldersData(spaceIdFromUrl);
            const folders = res?.folders || [];
            folderStore.setAllFolderList(folders);

            const targetFolder = folders.find(folder => folder.folderId === folderIdFromUrl);

            if (!targetFolder) {
              console.error('존재하지 않는 폴더:', folderIdFromUrl);
              router.push(`/team-space/${spaceIdFromUrl}`);
              return;
            }

            // 색상 형식 변환
            targetFolder.color = `#${targetFolder.color}`;
            folderStore.setCurrentFolder(targetFolder);
          } catch (error) {
            console.error('폴더 목록 조회 실패:', error);
            router.push(`/team-space/${spaceIdFromUrl}`);
            return;
          }
        }

        setIsLoading(false);
      } catch (error) {
        console.error('데이터 로드 실패:', error);
        router.push('/team-space');
      }
    };

    loadData();
  }, [spaceIdFromUrl, folderIdFromUrl]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SpaceBoardHeader description={`자신이 아카이브에 쓴 글을 확인하세요`} />
      <SpaceArchiveBoardList />
    </div>
  );
}
