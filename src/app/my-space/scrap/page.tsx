import { SpaceBoardHeader } from "@/components/layout/SpaceBoardHeader";
import SpaceScrapBoardList from "@/components/list/SpaceScrapBoardList";
import MySpaceArchiveFilterSection from "@/components/section/MySpaceArchiveFilterSection"

// frontend/src/app/my-space/scrap/[id]/page.tsx
export default async function MySpaceScrapPage() {

return (

    <div className="min-h-screen bg-gray-50">
  
      <SpaceBoardHeader title="스크랩" description="스크랩한 글을 모아볼 수 있습니다." />
      <MySpaceArchiveFilterSection buttonMode="search"/>

      <SpaceScrapBoardList/>
    </div>

  );
}
