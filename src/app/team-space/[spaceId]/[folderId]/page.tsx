// frontend/src/app/my-space/archive/[folder]/page.tsx
import { SpaceBoardHeader } from "@/components/layout/SpaceBoardHeader";
import SpaceArchiveBoardList from "@/components/list/SpaceArchiveBoardList";
import MySpaceArchiveFilterSection from "@/components/section/MySpaceArchiveFilterSection";


export interface TeamSpaceArchiveFolderPageProps {
  params : Promise<{ folderId : number }>

}


export default async function TeamSpaceArchiveFolderPage({ params }: TeamSpaceArchiveFolderPageProps) {
  const { folderId } = await params;
    console.log("!!!");
  return (

    <div className="min-h-screen bg-gray-50">

      <SpaceBoardHeader description={`자신이 아카이브에 쓴 글을 확인하세요`} /> 


      <SpaceArchiveBoardList />

    </div>

  );
}
