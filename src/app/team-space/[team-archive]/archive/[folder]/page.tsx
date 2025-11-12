// frontend/src/app/team-space/[team-archive]/archive/[folder]/page.tsx

import { SpaceArchiveBoardItemProps } from "@/components/item/SpaceArchiveBoardItem";
import { SpaceBoardHeader } from "@/components/layout/SpaceBoardHeader";
import SpaceArchiveBoardList from "@/components/list/SpaceArchiveBoardList";
import MySpaceArchiveFilterSection from "@/components/section/MySpaceArchiveFilterSection";



export default function TeamSpaceArchiveFolderPage() {


  return (

    <div className="min-h-screen bg-gray-50">

      <SpaceBoardHeader
      />

      <MySpaceArchiveFilterSection
        buttonMode="write"
        isTeamSpace={true}
      />

      <SpaceArchiveBoardList/>

    </div>

  );
}
