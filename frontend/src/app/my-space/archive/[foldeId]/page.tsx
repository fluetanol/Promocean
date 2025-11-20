// frontend/src/app/my-space/archive/[folder]/page.tsx
import { SpaceBoardHeader } from "@/components/layout/SpaceBoardHeader";
import SpaceArchiveBoardList from "@/components/list/SpaceArchiveBoardList";
import MySpaceArchiveFilterSection from "@/components/section/MySpaceArchiveFilterSection";



export default async function MySpaceArchiveFolderPage() {

  return (
      <SpaceArchiveBoardList />
  );
}
