import { SpaceBoardHeader } from "@/components/layout/SpaceBoardHeader";
import SpaceScrapBoardList from "@/components/list/SpaceScrapBoardList";
import { Suspense } from "react";

// frontend/src/app/my-space/scrap/page.tsx
export default function MySpaceScrapPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SpaceBoardHeader
        title="스크랩"
        description="스크랩한 글을 모아볼 수 있습니다."
        showFolderUI={false}
        customIcon="bookmark"
        customIconColor="#f59e0b"
      />
      <Suspense>
        <SpaceScrapBoardList/>
      </Suspense>`
    </div>
  );
}
