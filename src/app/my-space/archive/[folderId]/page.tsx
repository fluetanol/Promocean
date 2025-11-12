// frontend/src/app/my-space/archive/[folder]/page.tsx

import MySpaceTabs from "@/components/filter/MySpaceTabs";
import SpaceArchiveBoardItem, { SpaceArchiveBoardItemProps } from "@/components/item/SpaceArchiveBoardItem";
import { SpaceBoardHeader } from "@/components/layout/SpaceBoardHeader";
import SpaceArchiveBoardList from "@/components/list/SpaceArchiveBoardList";
import SpaceArchiveList from "@/components/list/SpaceArchiveList";
import MySpaceArchiveFilterSection from "@/components/section/MySpaceArchiveFilterSection";


export interface MySpaceArchiveFolderPageProps {
  params : Promise<{ folderId : number }>

}


export default async function MySpaceArchiveFolderPage({ params }: MySpaceArchiveFolderPageProps) {
  const { folderId } = await params;
  
  console.log("폴더 아이디 ", folderId);
  
  // decodeURIComponent : URL에 인코딩된 문자열을 원래 문자열로 디코딩하는 함수
  // 예를 들어, "AI%20챗봇"이라는 제목은 "AI 챗봇"으로 디코딩됩니다. 
  // encodeURIComponent를 쓴 문자열에 대해선 꼭 해줘야 함.

  //   const mySpaceBoardRes = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/mock/CommunityBoardListResponse.json`,
  //   { cache: "no-store" }


  // );
  // const mySpaceBoardData = await mySpaceBoardRes.json();

  // const mySpaceBoardList: SpaceArchiveBoardItemProps[] = mySpaceBoardData.data.posts;

  
  return (

    <div className="min-h-screen bg-gray-50">

      <SpaceBoardHeader titleName={folderId.toString()} description={`자신이 아카이브에 쓴 글을 확인하세요`} /> 

      <div className="flex justify-end-safe">
        <div className="shrink-0 min-w-[380px]">
          <MySpaceArchiveFilterSection
            buttonMode="write"
            folderName={folderId.toString()}
            isTeamSpace={false}
          />
        </div>
      </div>

      <SpaceArchiveBoardList 
        folderId = {folderId}
        // mySpaceBoardList={mySpaceBoardList}
        />

    </div>

  );
}
