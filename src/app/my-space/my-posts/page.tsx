// frontend/src/app/my-space/archive/[folder]/page.tsx
import { SpaceBoardHeader } from "@/components/layout/SpaceBoardHeader";
import SpaceArchiveBoardList from "@/components/list/SpaceArchiveBoardList";
import MySpaceArchiveFilterSection from "@/components/section/MySpaceArchiveFilterSection";


export default async function MySpaceMyPostPage() {

  return (

    <div className="min-h-screen bg-gray-50">

      <SpaceBoardHeader title="내가 쓴 글" description="지금까지 내가 쓴 글을 볼 수 있습니다." />

      <MySpaceArchiveFilterSection buttonMode="write"/>

      <SpaceArchiveBoardList />

    </div>

  );
}
