'use client';
import { useAuthStore } from "@/store/authStore";
import SpaceArchiveBoardItem, { SpaceArchiveBoardItemProps } from "../item/SpaceArchiveBoardItem"
import { useEffect, useState } from "react";
import SpaceAPI, { ArticleData } from "@/api/space";
import { useArchiveFolderStore } from "@/store/archiveFolderStore";
import { useSpaceStore } from "@/store/spaceStore";


export default function SpaceArchiveBoardList(
){
        const [mySpaceBoardList, setMySpaceBoardList] =  useState<SpaceArchiveBoardItemProps[] | null>([]);        
        const spaceStore = useSpaceStore();
        const currentSpace = spaceStore.currentSpace;
        const spaceId = currentSpace?.spaceId;
        const folderStore = useArchiveFolderStore();
        const folderId = folderStore.currentFolder?.folderId;
        
        console.log("SpaceArchiveBoardList 폴더 아이디 ", folderId);
        //개인 스페이스의 경우 직접 authStore에서 가져와야 합니다.

        useEffect(()=>{
            if(!currentSpace) return;

            console.log("개인 스페이스 아이디 in useEffect ", spaceId);
            // spaceId를 사용하여 필요한 작업 수행
            const fetcher = async () =>
                {
                    console.log("api ",spaceId, folderId);
                    const res = await SpaceAPI.getArchiveArticles(spaceId||-1, folderId||-1);
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
        },[currentSpace])

        return(
        <div className="flex flex-col px-4 gap-2">
        {
            mySpaceBoardList && mySpaceBoardList.length > 0 ? (
                mySpaceBoardList.map((item, index) => (
                    <SpaceArchiveBoardItem
                        key={index}
                        id={item.id}
                        category={item.category}
                        title={item.title}
                        tags={item.tags}
                        image={item.image}
                    />
                ))
            ) : (
                <div className="flex flex-col items-center justify-center py-16 px-4">
                    <div className="text-center space-y-4">
                        <svg
                            className="mx-auto h-16 w-16 text-gray-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                        <div className="space-y-2">
                            <h3 className="text-lg font-medium text-gray-700">아카이브된 글이 없습니다</h3>
                            <p className="text-sm text-gray-500">
                                이 폴더에 저장된 글이 아직 없습니다.<br />
                                새로운 글을 작성하여 아카이브에 추가해보세요.
                            </p>
                        </div>
                    </div>
                </div>
            )
        }
        </div>
        )
}