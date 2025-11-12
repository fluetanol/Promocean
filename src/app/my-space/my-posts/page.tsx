// frontend/src/app/my-space/archive/[folder]/page.tsx

import MySpaceTabs from "@/components/filter/MySpaceTabs";
import { SpaceArchiveBoardItemProps } from "@/components/item/SpaceArchiveBoardItem";
import { SpaceBoardHeader } from "@/components/layout/SpaceBoardHeader";
import SpaceArchiveBoardList from "@/components/list/SpaceArchiveBoardList";
import MySpaceArchiveFilterSection from "@/components/section/MySpaceArchiveFilterSection";


export default async function MySpaceMyPostPage() {
    const TitleName = "내가 쓴 글";

    const mySpaceBoardRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/mock/CommunityBoardListResponse.json`,
    { cache: "no-store" }
  );

  const mySpaceBoardData = await mySpaceBoardRes.json();
  const mySpaceBoardList: SpaceArchiveBoardItemProps[] = mySpaceBoardData.data.posts;

  return (

    <div className="min-h-screen bg-gray-50">

      <SpaceBoardHeader titleName={TitleName} description="지금까지 내가 쓴 글을 볼 수 있습니다." />

      <MySpaceArchiveFilterSection buttonMode="write"/>

      <SpaceArchiveBoardList
        folderId ={0}
        />

    </div>

  );
}
