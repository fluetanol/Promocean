'use client';

import { EmojiCategory, GachaAPI, getGachaListResponse } from '@/api/gacha';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import EmoticonMyHoldSection from '../section/EmoticonMyHoldSection';


interface EmoticonItem {
  id: number;
  name: string;
  imageUrl: string;
  acquiredDate: string;
}

export default function EmoticonTab() {
  // 임시 데이터 (추후 API로 대체)
  const [mileage, setMileage] = useState(0);
  const [emoticonsState, setEmoticonsState] = useState<getGachaListResponse>({
    categories: [],
    totalCount: 0,
  });
  const [currentEmojiCategoryState, setCurrentEmojiCategoryState] = useState<EmojiCategory | null>(null);


  useEffect(()=>{
    const fetchData = async () => {
      const res = await GachaAPI.getGachaList();
      if(res){
      console.log("res : ", res);
      setEmoticonsState(res);
      setCurrentEmojiCategoryState(res.categories[0] || null);
      }
      else{
        console.error("Failed to fetch gacha list.");
      }
    };

    const fetchMileage = async() =>{
      const initialMileage = await GachaAPI.getGachaMileage();
      console.log("Initial mileage fetched and set.", initialMileage);
      setMileage(initialMileage);
    }

    fetchData();
     fetchMileage();
  }, [])

  //현재 선택된 카테고리에 따른 이모티콘만 가져옵니다.
  const handleCategoryClick = (categoryId: number) => {
    // 카테고리 클릭 시 동작 (필터링 등)
    console.log('Clicked category ID:', categoryId);
    setCurrentEmojiCategoryState(emoticonsState.categories.find(category => category.categoryId === categoryId) || null);
  }

  return (
    <div className="space-y-8">
      {/* 마일리지 정보 */}
      <div className="bg-linear-to-r from-primary to-primary/80 rounded-lg p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90 mb-1">보유 마일리지</p>
            <p className="text-3xl font-bold">{mileage} M</p>
          </div>
          <div className="text-5xl">💰</div>
        </div>
        <p className="text-xs opacity-75 mt-4">
          마일리지를 사용하여 다양한 이모티콘을 구매할 수 있습니다
        </p>
      </div>

      {/* 배지 정보 */}
      {/* <EmoticonBadgeSection currentBadge={currentBadge} badges={badges} badgeOrder={badgeOrder} /> */}

      {/* 보유 이모티콘 섹션 */}
      <EmoticonMyHoldSection 
        emoticonsState={emoticonsState} 
        currentEmojiCategoryState={currentEmojiCategoryState}
        handleCategoryClick={handleCategoryClick}
      />
      

      {/* 이모티콘 가챠샵 링크 */}
      <div className="bg-linear-to-r bg-primary rounded-lg p-6 text-white text-center">
        <p className="text-lg font-semibold mb-2">🎰 새로운 이모티콘을 획득하세요!</p>
        <p className="text-sm opacity-90 mb-4">마일리지를 사용해서 랜덤 이모티콘을 뽑아보세요</p>
        <a
          href="/gacha"
          className="inline-block px-6 py-2 bg-white text-primary font-semibold rounded-md hover:bg-gray-100 transition-colors"
        >
          가챠샵 가기
        </a>
      </div>
    </div>
  );
}
