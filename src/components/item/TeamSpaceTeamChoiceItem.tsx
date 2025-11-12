'use client';

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UserGroup from "../icon/UserGroup";
import { useSpaceStore } from "@/store/spaceStore";

export interface TeamSpaceChoiceItemProps {
    // Define props here if needed in the future
    name : string;
    participantCnt : number;
    spaceCoverUrl : string;
    spaceId : number;
}


export default function TeamSpaceChoiceItem({
    name,
    participantCnt,
    spaceId,
    spaceCoverUrl,
} : TeamSpaceChoiceItemProps) {
    const router = useRouter();
    const spaceStore = useSpaceStore();
    
    //팀 스페이스 아이템 클릭 핸들러
    const handleClick = () => {
        spaceStore.setCurrentSpace({
           spaceId: spaceId,
           name: name,
           participantCnt: participantCnt,
           spaceCoverUrl: spaceCoverUrl
        })
        console.log("TeamSpaceTeamChoiceItem clicked");
        router.push(`/team-space/${encodeURIComponent(name)}`);
    }
    

    return(
           <button className="group flex flex-col h-60 rounded-2xl bg-white/50 hover:bg-primary/90 overflow-hidden transition-all duration-300 ease-out border-gray-400 backdrop-blur-md hover:shadow-2xs hover:border-3 hover:-translate-y-1 active:translate-y-0 active:shadow-md"
            onClick={handleClick}
            >

            <div className="relative shrink-0 h-32 w-full overflow-hidden transition-all duration-300 group-hover:h-40">
            {/* 이미지 영역 */}
                <Image
                className="w-full h-full object-cover"
                src={spaceCoverUrl!}
                alt={name!}
                width={160}
                height={160}  
                >
                </Image>
                    <div className="absolute inset-0 backdrop-blur-[1px] group-hover:backdrop-blur-none"></div>
            </div>
            {/* 텍스트 영역 */}
            <div className="flex flex-col text-left items-start px-5 py-3 gap-1 flex-1 min-w-0 overflow-hidden">
                <div className="font-semibold text-2xl line-clamp-1 w-full wrap-break-words transition-colors group-hover:text-primary-foreground">
                {name}
                </div>
                <div className = "flex-1"></div>
                <div className="flex justify-between flex-row-reverse items-center text-xs leading-tight line-clamp-2 w-full wrap-break-words transition-opacity group-hover:opacity-0">
                    <span className = "flex gap-1 justify-center items-center"><UserGroup />    {participantCnt}</span>
                    <span className = "w-14 text-center bg-gray-200 rounded-3xl p-2"> 권한 </span>
                </div>
            </div>
    </button>
    )
}