"use client";

import { useEffect, useState } from "react";
import SpaceScrapItem from "../item/SpaceScrapItem";
import { SpaceScrapBoardItemProps } from "../item/SpaceScrapBoardItem";
import { ScrapAPI } from "@/api/community";
import SpaceAPI from "@/api/space";



export default function SpaceScrapBoardList(){
    const [scrapList, setScrapList] = useState<SpaceScrapBoardItemProps[]>([]);
    const [totalCnt, setTotalCnt] = useState(0);

    useEffect(()=>{

        const fetchData = async() => {
            try{
                const res = await ScrapAPI.list();
                if(!res){
                    return;
                }
                
                const newPostList : SpaceScrapBoardItemProps[] =res.posts;
                const newTotalCnt = res.totalCnt;
                console.log("Fetched scrap data:", newPostList, newTotalCnt);

                setScrapList(newPostList);
                setTotalCnt(newTotalCnt);
            }    catch(error){
                console.error("Failed to fetch scrap data:", error);
            }
        }
        fetchData();
    },[]);


    const handleScrapToggle = (id: string) => {
        // 해당 id를 가진 아이템을 리스트에서 제거
        setScrapList(prevList => prevList.filter(item => item.postId !== id));
        console.log(`게시물 ID ${id} 스크랩 해제됨`);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-8 py-6">
          {
            scrapList?.map((item) => (
                <SpaceScrapItem
                    key={item.postId}
                    postId={item.postId}
                    title={item.title}
                    profileUrl={item.profileUrl}
                    author={item.author}
                    category={item.category}
                    tags={item.tags}
                    likeCnt={item.likeCnt}
                    replyCnt={item.replyCnt}
                    image={item.image}
                    onScrapToggle={handleScrapToggle}
                />
            ))
          }
        </div>
    )
}