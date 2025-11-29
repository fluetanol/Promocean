'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import MypageHeader from '@/components/layout/MypageHeader';
import { EmojiItem, GachaAPI, GradeTranslationCode } from '@/api/gacha';
import Image from 'next/image';
import { rarityConfig } from '@/constants/rarityConfigConstants';

interface GachaResult {
  id: number;
  imageUrl: string;
  grade: GradeTranslationCode;
}

export interface GachaResultItemStyle{
  gradeName : string;
  bgColor: string;
  borderColor: string;
  color: string;
  weight: number;
  hover? : string;
}


export default function GachaPage() {
  const router = useRouter();
  const { user, isLoggedIn, hasHydrated } = useAuthStore();

  // 임시 데이터
  const [mileage, setMileage] = useState(1500);
  const [isSpinning, setIsSpinning] = useState(false);
  const [gachaResult, setGachaResult] = useState<GachaResult | null>(null);
  const [showResult, setShowResult] = useState(false);


  const GACHA_COST = 100; // 가챠 1회 비용

  useEffect(() => {
    if (!hasHydrated) return;

    if (!isLoggedIn || !user) {
      router.push('/auth/login?tab=login');
      return;
    }
  }, [hasHydrated, isLoggedIn, user, router]);

  //마일리지 초기화
  useEffect(()=>{
    const fetchMileage = async() =>{
      const initialMileage = await GachaAPI.getGachaMileage();
          console.log("Initial mileage fetched and set.", initialMileage);
      setMileage(initialMileage);
    }
    fetchMileage();
  },[])


  const getRandomEmoticon = async (): Promise<GachaResult> => {
    const res = await GachaAPI.drawGacha();
    if(!res){
      throw new Error("Failed to draw gacha");
    }

    console.log("Gacha API Response : ", res);

    const result: GachaResult = {
       id: res.emojiId,
       grade:res.grade,
       imageUrl : res.imageUrl,
    }

    return result;
  };

  const handleGacha = async () => {
    if (mileage < GACHA_COST) {
      alert('마일리지가 부족합니다!');
      return;
    }

    setIsSpinning(true);
    setShowResult(false);
    setGachaResult(null);

    //성공한 경우
    try{
      const result = await getRandomEmoticon();
      setGachaResult(result);
      console.log("Gacha Result : ", result);
      setMileage(prev => prev - GACHA_COST);
    } 
    //실패한 경우 (모든 이모티콘을 다 뽑은 경우 )
    catch (error) {
      console.error("Error during gacha draw: ", error);
      alert("모든 이모티콘을 다 뽑았습니다. 이모티콘 업데이트를 기대해주세요!");
      setIsSpinning(false);
    }

    // 가챠 애니메이션 시뮬레이션 (2초)
    setTimeout(() => {
      setIsSpinning(false);

      // 결과 표시 (0.5초 후)
      setTimeout(() => {
        setShowResult(true);
      }, 500);
    }, 2000);
  };

  const handleClose = () => {
    setShowResult(false);
    setGachaResult(null);
  };

  if (!isLoggedIn || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MypageHeader />
      <div className="max-w-12xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            뒤로 가기
          </button>
          <h1 className="text-3xl font-bold text-gray-900">이모티콘 가챠</h1>
          <p className="text-gray-600 mt-2">마일리지를 사용해서 랜덤 이모티콘을 획득하세요!</p>
        </div>

        {/* 마일리지 정보 */}
        <div className="bg-linear-to-r from-primary to-primary/80 rounded-lg p-6 text-white shadow-lg mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">보유 마일리지</p>
              <p className="text-3xl font-bold">{mileage.toLocaleString()} M</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90 mb-1">가챠 1회 비용</p>
              <p className="text-2xl font-bold">{GACHA_COST} M</p>
            </div>
          </div>
        </div>

        {/* 확률 정보 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">등급별 확률</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(rarityConfig).map(([rarity, config]) => (
              <div key={rarity} className={`${config.bgColor} ${config.borderColor} border-2 rounded-lg p-4 text-center`}>
                <p className={`font-bold ${config.color} text-lg mb-1`}>{config.gradeName}</p>
                <p className="text-2xl font-bold text-gray-900">{config.weight}%</p>
              </div>
            ))}
          </div>
        </div>

        {/* 가챠 머신 */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="max-w-md mx-auto">
            {/* 가챠 디스플레이 */}
            <div className="relative mb-8">
              <div className={`
                aspect-square bg-linear-to-br from-purple-100 to-pink-100 rounded-3xl
                flex items-center justify-center border-8 border-purple-300 shadow-2xl
                transition-all duration-500
                ${isSpinning ? 'animate-spin' : ''}
              `}>
                {gachaResult && !isSpinning ? (
                  <div className="text-center">
                    <Image
                      src={gachaResult.imageUrl}
                      alt="획득한 이모티콘"
                      width={140}
                      height={140}
                      className="mx-auto mb-4"
                    />
                    <p className={`text-xl font-bold ${rarityConfig[gachaResult.grade].color}`}>
                      {rarityConfig[gachaResult.grade].gradeName}
                    </p>
                  </div>
                ) : (
                  <div className="text-8xl">
                    {isSpinning ? '🎲' : '❓'}
                  </div>
                )}
              </div>

              {/* 장식 효과 */}
              {isSpinning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-full h-full rounded-3xl bg-linear-to-r from-yellow-400 via-pink-400 to-purple-400 opacity-30 animate-pulse"></div>
                </div>
              )}
            </div>

            {/* 가챠 버튼 */}
            <button
              onClick={handleGacha}
              disabled={isSpinning || mileage < GACHA_COST}
              className={`
                w-full py-4 px-6 rounded-xl font-bold text-lg
                transition-all duration-300 shadow-lg
                ${isSpinning || mileage < GACHA_COST
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-linear-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:shadow-xl transform hover:scale-105'
                }
              `}
            >
              {isSpinning ? '뽑는 중...' : mileage < GACHA_COST ? '마일리지 부족' : `${GACHA_COST}M로 가챠 돌리기!`}
            </button>

            {mileage < GACHA_COST && (
              <p className="text-center text-sm text-red-500 mt-3">
                마일리지가 부족합니다. ({mileage}M / {GACHA_COST}M)
              </p>
            )}
          </div>
        </div>

        {/* 가챠 팁 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">💡 가챠 팁</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 중복된 이모티콘은 나오지 않습니다</li>
            <li>• 높은 등급일수록 획득 확률이 낮습니다</li>
            <li>• 마일리지는 사이트 활동을 통해 획득할 수 있습니다</li>
            <li>• 획득한 이모티콘은 마이페이지를 통해 확인할 수 있습니다</li>
          </ul>
        </div>
      </div>

      {/* 결과 모달 */}
      {showResult && gachaResult && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform ">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🎉 축하합니다!</h2>

              <div className={`border-4 rounded-2xl p-8 mb-4`}>
                <Image  
                  src={gachaResult.imageUrl}
                  alt="획득한 이모티콘"
                  width={125}
                  height={125}
                  className="mx-auto mb-4"
                />
                <p className={`text-xl font-bold mb-2`}>
                  {rarityConfig[gachaResult.grade].gradeName}
                </p>
              </div>

              <p className="text-gray-600 mb-6">
                새로운 이모티콘을 획득했습니다!
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleClose}
                  className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                >
                  닫기
                </button>
                <button
                  onClick={() => {
                    handleClose();
                    handleGacha();
                  }}
                  disabled={mileage < GACHA_COST}
                  className="flex-1 py-3 px-6 bg-linear-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  다시 뽑기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
