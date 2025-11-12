import { SpaceScrapBoardItemProps } from "@/components/item/SpaceScrapBoardItem";
import { SpaceBoardHeader } from "@/components/layout/SpaceBoardHeader";
import SpaceScrapBoardList from "@/components/list/SpaceScrapBoardList";
import MySpaceArchiveFilterSection from "@/components/section/MySpaceArchiveFilterSection"

// frontend/src/app/my-space/scrap/[id]/page.tsx
export default async function MySpaceScrapPage() {
  // 커뮤니티 게시판 데이터 fetch
  const communityBoardRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/mock/CommunityBoardListResponse.json`,
    { cache: "no-store" }
  );


  const spaceScrapBoardData = await communityBoardRes.json();
  const spaceScrapBoardList = spaceScrapBoardData.data.posts;


  console.log("spaceScrapBoardList:", spaceScrapBoardList);

return (

    <div className="min-h-screen bg-gray-50">
  
      <SpaceBoardHeader title="스크랩" description="스크랩한 글을 모아볼 수 있습니다." />
      <MySpaceArchiveFilterSection buttonMode="search"/>

      <SpaceScrapBoardList itemList={spaceScrapBoardList}/>
    </div>

  );
}
