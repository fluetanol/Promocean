'use client';

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UserGroup from "../icon/UserGroup";
import { useSpaceStore } from "@/store/spaceStore";
import { getTeamSpaceInfoToServer } from "@/server-side/TeamSpaceInfo";
import { TeamSpaceRoleToKorean } from "@/enum/TeamSpaceRole";
import { TeamSpaceItem } from "@/types/apiTypes/space";

export interface TeamSpaceChoiceItemProps extends TeamSpaceItem {}


export default function TeamSpaceChoiceItem({
    name,
    participantCnt,
    spaceId,
    spaceCoverUrl,
    userRole,
} : TeamSpaceChoiceItemProps) {
    const router = useRouter();
    const spaceStore = useSpaceStore();
    


    //팀 스페이스 아이템 클릭 핸들러
    const handleClick = async() => {
        spaceStore.setCurrentSpace({
           spaceId: spaceId,
           name: name,
           participantCnt: participantCnt,
           spaceCoverUrl: spaceCoverUrl
          ,userRole: userRole
        })
        console.log("현재 스페이스 설정됨, 내 권한 ", userRole);
        const res = await getTeamSpaceInfoToServer(spaceId, name, participantCnt, spaceCoverUrl);

        console.log("TeamSpaceTeamChoiceItem clicked");
        router.push(`/team-space/${encodeURIComponent(name)}`);
    }
        console.log("role : ", userRole);

    return(
           <button className="group relative flex flex-col h-64 rounded-2xl bg-white shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 ease-out border-2 border-gray-100 hover:border-primary/50 hover:-translate-y-2 active:translate-y-0 active:shadow-lg"
            onClick={handleClick}
            >
            {/* OWNER 배지 */}
            {userRole === "OWNER" && (
                <div className="absolute top-3 right-3 z-10 p-2 bg-primary text-white rounded-full shadow-lg">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                </div>
            )}

            <div className="relative shrink-0 h-36 w-full overflow-hidden transition-all duration-300 group-hover:h-44">
            {/* 이미지 영역 */}
                <Image
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                src={spaceCoverUrl!}
                alt={name!}
                width={160}
                height={160}
                >
                </Image>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/20"></div>
            </div>
            {/* 텍스트 영역 */}
            <div className="flex flex-col text-left items-start px-5 py-4 gap-2 flex-1 min-w-0 overflow-hidden bg-gradient-to-b from-white to-gray-50 group-hover:from-primary group-hover:to-primary/90">
                <div className="font-bold text-xl line-clamp-2 w-full wrap-break-words transition-colors group-hover:text-white">
                {name}
                </div>
                <div className = "flex-1"></div>
                <div className="flex justify-between items-center text-sm w-full">
                    <span className={`px-3 py-1.5 text-center rounded-full font-semibold shadow-sm transition-all ${
                        userRole === "OWNER"
                            ? "bg-primary/10 text-primary group-hover:bg-white/20 group-hover:text-white"
                            : "bg-gray-100 text-gray-700 group-hover:bg-white/20 group-hover:text-white"
                    }`}>
                        {TeamSpaceRoleToKorean(userRole)}
                    </span>
                    <span className="flex gap-1.5 justify-center items-center font-medium text-gray-600 group-hover:text-white transition-colors">
                        <UserGroup />
                        {participantCnt}명
                    </span>
                </div>
            </div>
    </button>
    )
}