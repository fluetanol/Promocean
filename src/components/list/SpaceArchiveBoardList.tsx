'use client';
import { useAuthStore } from "@/store/authStore";
import SpaceArchiveBoardItem, { SpaceArchiveBoardItemProps } from "../item/SpaceArchiveBoardItem"
import { useEffect, useState } from "react";
import SpaceAPI, { ArticleData } from "@/api/space";



export interface SpaceArchiveBoardListProps{
    //  mySpaceBoardList : SpaceArchiveBoardItemProps[]
    spaceId? : number;
    folderId : number
}



export default function SpaceArchiveBoardList({
    // mySpaceBoardList
    spaceId,
    folderId
}: SpaceArchiveBoardListProps){
        const [mySpaceBoardList, setMySpaceBoardList] =  useState<SpaceArchiveBoardItemProps[] | null>([]);
        
        const authStore = useAuthStore();

        console.log("SpaceArchiveBoardList 폴더 아이디 ", spaceId);
        //개인 스페이스의 경우 직접 authStore에서 가져와야 합니다.
        if(spaceId === undefined){
            
            spaceId = authStore.user?.personalSpaceId;
        }

        useEffect(()=>{
            if(!spaceId) return;

            console.log("개인 스페이스 아이디 in useEffect ", spaceId);
            // spaceId를 사용하여 필요한 작업 수행
            const fetcher = async () =>
                {
                    console.log("??!!");
                    const res = await SpaceAPI.getArchiveArticles(spaceId, folderId);
                    const articles : ArticleData[] = res?.articles|| [];
                    console.log("가져온 아카이브 글들 ", res?.articles);
                    
                    const boardList : SpaceArchiveBoardItemProps[]=[];
                    for(const article of articles){
                        boardList.push({
                            id: article.articleId,
                            category:article.type,
                            title:article.title,
                            tags: article.tags,
                            image:article.fileUrl
                        });
                    }

  

                    setMySpaceBoardList(boardList);
                    
                    console.log("가져온 아카이브 글들2 ", boardList);
                }

            fetcher();
        },[spaceId])

        return(
        <div className="flex flex-col px-4 gap-2">
        {
            mySpaceBoardList?.map((item, index) => (
                <SpaceArchiveBoardItem
                    key={index}
                    id={item.id}
                    category={item.category}
                    title={item.title}
                    tags={item.tags}
                    image={item.image}
                />
            ))
        }
        </div>
        )
}