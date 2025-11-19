'use client';

import { useArchiveFolderStore } from "@/store/archiveFolderStore";
import { useRouter, usePathname } from "next/navigation";
import { useSpaceStore } from "@/store/spaceStore";

export interface SpaceBoardHeaderProps {
    title? : string;
    description? : string
}



export function SpaceBoardHeader(   { title, description } : SpaceBoardHeaderProps ) {

    const router = useRouter();
    const pathname = usePathname();
    const folderStore = useArchiveFolderStore();
    const spaceStore = useSpaceStore();
    const currentStore = folderStore.currentFolder;
    const titleName = currentStore ? currentStore.name : "";
    const folderId = currentStore?.folderId;

    const handleClick = () => {
        if (!folderId) return;

        // 현재 경로가 팀 스페이스인지 개인 스페이스인지 확인
        const isTeamSpace = pathname?.startsWith('/team-space');

        if (isTeamSpace) {
            // 팀 스페이스: /team-space/[spaceId]/[folderId]
            const spaceId = spaceStore.currentSpace?.spaceId;
            if (spaceId) {
                router.push(`/team-space/${spaceId}/${folderId}`);
            }
        } else {
            // 개인 스페이스: /my-space/archive/[folderId]
            router.push(`/my-space/archive/${folderId}`);
        }
    };

    return(
        <div
            className="flex flex-col justify-start max-w-6xl px-4 py-3 text-[40px] font-bold text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors rounded-lg"
            onClick={handleClick}
        >
            <h1 className="text-[40px] font-bold text-gray-900">{title ? title : titleName}</h1>
            {description && <span className="text-sm font-normal">{description}</span>}
      </div>
    )
}