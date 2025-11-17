

  // frontend/src/app/layout.tsx
  
  import type { Metadata } from "next";
  import Sidebar from "@/components/layout/Sidebar";
  import { SidebarProvider } from "@/contexts/SidebarContext";
  import MySpaceHeader from "@/components/layout/SpaceHeader";
  import MySpaceTabs from "@/components/filter/MySpaceTabs";
import TeamSpaceHeader from "@/components/layout/TeamSpaceHeader";
import { cookies } from "next/headers";
  
  
export  default  async function TeamLayout({
      children
  }: Readonly<{children: React.ReactNode}>){

        const cookieStore = await cookies();
        const teamSpaceInfoCookie = cookieStore.get('teamSpaceInfo');
        console.log("teamSpaceInfoCookie ", JSON.parse(teamSpaceInfoCookie?.value || '{}'));

        const { spaceId, name, spaceCoverUrl } = JSON.parse(teamSpaceInfoCookie?.value || '{}');
          return(
              <div>
                <TeamSpaceHeader 
                nickname={name||"팀 이름"} 
                coverImageUrl={spaceCoverUrl || "defaultCoverUrl"} 
                spaceId={spaceId}/>
               {children}
              </div>
          )
  }