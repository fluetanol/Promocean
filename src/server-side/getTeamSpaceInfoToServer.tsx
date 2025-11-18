'use server'

import { cookies } from "next/headers"


export interface NextSimpleResponse{
    status: number;
    message: string;
}

/**
 * 
 * 
 * @param spaceId 
 * @param name 
 * @param participantCnt 
 * @param spaceCoverUrl 
 * @returns 
 */
export async function getTeamSpaceInfoToServer(spaceId:number, name:string, participantCnt:number, spaceCoverUrl:string) {
  
    const newcookies = await cookies();
    
    
    newcookies.set('teamSpaceInfo', JSON.stringify({
        spaceId: spaceId,
        name: name,
        participantCnt: participantCnt,
        spaceCoverUrl: spaceCoverUrl
    }),{ path: '/', httpOnly: false });


    //백엔드 입장에서 받기를 바라는 형식이다.
    return {
        status: 200,
        message: "Team space info set in cookies"
    }
}

