'use client';

// frontend/src/app/team-space/[spaceId]/layout.tsx

import TeamSpaceHeader from "@/components/layout/TeamSpaceHeader";
import { useSpaceStore } from "@/store/spaceStore";
import { useParams } from "next/navigation";

export default function TeamLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const spaceStore = useSpaceStore();
  const params = useParams();
  const currentSpace = spaceStore.currentSpace;

  // URL의 spaceId와 store의 spaceId가 일치하는지 확인
  const spaceIdFromUrl = Number(params.spaceId);
  const shouldShowHeader = currentSpace && currentSpace.spaceId === spaceIdFromUrl;

  return (
    <div>
      {shouldShowHeader && (
        <TeamSpaceHeader
          nickname={currentSpace.name || "팀 이름"}
          coverImageUrl={currentSpace.spaceCoverUrl || "/default-cover.jpg"}
          spaceId={currentSpace.spaceId}
        />
      )}
      {children}
    </div>
  );
}