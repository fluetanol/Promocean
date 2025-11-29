import { getGachaListResponse } from "@/api/gacha";
import { rarityConfig } from "@/constants/rarityConfigConstants";
import Image from "next/image";


export interface EmoticonMyHoldSectionProps {
    emoticonsState: getGachaListResponse;
    currentEmojiCategoryState: getGachaListResponse["categories"][0] | null;
    handleCategoryClick : (categoryId : number) => void;
}



export default function EmoticonMyHoldSection({ emoticonsState, currentEmojiCategoryState, handleCategoryClick }: EmoticonMyHoldSectionProps) {

  console.log("EmoticonMyHoldSection - emoticonsState : ", emoticonsState, " currentEmojiCategoryState : ", currentEmojiCategoryState);

  return (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">보유 이모티콘</h3>
              <span className="text-sm text-gray-500">{emoticonsState.totalCount}개 보유</span>
            </div>
              
            <div>
              
              { emoticonsState.totalCount > 0 ? (
              <div className ="flex flex-row gap-2 rounded-t-lg whitespace-nowrap overflow-auto bg-gray-200">
                {/*이모티콘 카테고리 탭바 */}
                {
                  emoticonsState.categories.map((item, idx)=>(
                    <button key={idx} onClick = {()=>handleCategoryClick(item.categoryId)} 
                    className ="px-4 py-1 hover:bg-primary/20 active:bg-primary/50 transition-colors border-r border-gray-300">
                      {item.categoryName}
                    </button>
                  ))
                }
              </div>
              ) : 
              <div className =" rounded-t-lg bg-gray-100 ">              
                  <button className ="px-4 py-1 hover:bg-primary/20 active:bg-primary/50 transition-colors border-r border-gray-300">
                     테스트
                  </button>
              </div>
            }
            
    
    
            {emoticonsState.totalCount === 0 ? (
              <div className="bg-gray-50 border border-gray-200 rounded-b-lg p-12 text-center">
                <Image
                  src="/assets/icon_awkward_duck.png"
                  alt="No Emoticons"
                  width={80}
                  height={80}
                  className="mx-auto mb-4"
                />
                <p className="text-gray-500">아직 보유한 이모티콘이 없습니다</p>
                <p className="text-sm text-gray-400 mt-2">마일리지로 이모티콘을 구매해보세요!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-2 border border-gray-200">
                {currentEmojiCategoryState && currentEmojiCategoryState.emojis.map((emoticon) => (
                  <div key={emoticon.emojiId} className={`${rarityConfig[emoticon.grade].bgColor} border ${rarityConfig[emoticon.grade].borderColor} rounded-lg p-4 text-center ${rarityConfig[emoticon.grade].hover}`}>
                    <Image
                      src={emoticon.imageUrl}
                      alt={emoticon.emojiId.toString()}
                      width={100}
                      height={100}
                      className="mx-auto mb-2"
                    />
                    {/* <p className="text-sm font-medium text-gray-900">{emoticon.emojiId}</p> */}
                    <p className="py-1 text-xs text-gray-500">획득일: {new Date(emoticon.obtainedAt).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            )}
            </div>
          </section>
  );
}   