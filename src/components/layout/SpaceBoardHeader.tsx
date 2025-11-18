'use client';

import { useArchiveFolderStore } from "@/store/archiveFolderStore";

export interface SpaceBoardHeaderProps {
    title? : string;
    description? : string
}



export function SpaceBoardHeader(   { title, description } : SpaceBoardHeaderProps ) {



    const folderStore = useArchiveFolderStore();
    const currentStore = folderStore.currentFolder;
    const titleName = currentStore ? currentStore.name : "";

    return(
        <div className="flex flex-col justify-start max-w-6xl px-4 py-3 text-[40px] font-bold text-gray-900">
            <h1 className="text-[40px] font-bold text-gray-900">{title ? title : titleName}</h1>
            {description && <span className="text-sm font-normal">{description}</span>}
      </div>
    )
}