// frontend/src/app/my-space/archive/[folder]/page.tsx
import { SpaceBoardHeader } from "@/components/layout/SpaceBoardHeader";
import MySpaceArchiveFilterSection from "@/components/section/MySpaceArchiveFilterSection";
import MySpaceMyPostSection from "@/components/section/MySpaceMyPostSection";
import { Suspense } from "react";


export default  function MySpaceMyPostPage() {

  return (

    <div className="min-h-screen bg-gray-50">

      <SpaceBoardHeader
        title="내가 쓴 글"
        description="지금까지 내가 쓴 글을 볼 수 있습니다."
        showFolderUI={false}
        customIcon="pen-square"
        customIconColor="#8b5cf6"
      />

      <Suspense>
        <MySpaceMyPostSection />
      </Suspense>

    </div>

  );
}
