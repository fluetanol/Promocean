

import SpaceHeader from "@/components/layout/SpaceHeader";
import TeamSpaceChoiceSection from "@/components/section/TeamSpaceChoiceSection";


// frontend/src/app/team-space/page.tsx
export default async function TeamSpacePage() {

  return (
    <div>
        <SpaceHeader isTeamSpace={true}/>
        <TeamSpaceChoiceSection/>
    </div>
  );
}
