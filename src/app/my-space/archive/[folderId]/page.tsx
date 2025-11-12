// frontend/src/app/my-space/archive/[folder]/page.tsx
import { SpaceBoardHeader } from "@/components/layout/SpaceBoardHeader";
import SpaceArchiveBoardList from "@/components/list/SpaceArchiveBoardList";
import MySpaceArchiveFilterSection from "@/components/section/MySpaceArchiveFilterSection";


export interface MySpaceArchiveFolderPageProps {
  params : Promise<{ folderId : number }>

}


export default async function MySpaceArchiveFolderPage({ params }: MySpaceArchiveFolderPageProps) {
  const { folderId } = await params;
  
  console.log("폴더 아이디 ", folderId);
  
  return (

    <div className="min-h-screen bg-gray-50">

      <SpaceBoardHeader description={`자신이 아카이브에 쓴 글을 확인하세요`} /> 

      <div className="flex justify-end-safe">
        <div className="shrink-0 min-w-[380px]">
          <MySpaceArchiveFilterSection
            buttonMode="write"
            folderName={folderId.toString()}
            isTeamSpace={false}
          />
        </div>
      </div>

      <SpaceArchiveBoardList />

    </div>

  );
}
