import { ApiResponse } from "@/types/apiTypes/common";
import { apiFetch } from "./fetcher";


export type GradeCode = 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
export type GradeTranslationCode = '커먼' | '레어' | '에픽' | '레전더리';

enum GradeProbability {
    COMMON = 50,
    RARE = 30,
    EPIC = 15,
    LEGENDARY = 5
}

/**
 * 이모지 아이템 타입
 * @property emojiId 이모지 아이디
 * @property grade 이모지 등급
 * @property imageUrl 이모지 이미지 URL
 * @property obtainedAt 획득 일시
 */
export interface EmojiItem {
    emojiId : number;
    grade : GradeTranslationCode;
    imageUrl : string;
    obtainedAt : Date;
}

export interface EmojiCategory{
    categoryId : number;
    categoryName : string;
    emojis : EmojiItem[];
}

export interface getGachaListResponse{
    categories : EmojiCategory[];
    totalCount : number;
}

export const GachaAPI = {

    /**
     * 사용자가 보유한 이모지 목록을 조회합니다.
     * @slug /api/v1/gacha/my-emojis
     * @method GET
     */
    async getGachaList():Promise<getGachaListResponse | null>{  
        try{
            const res = await apiFetch<ApiResponse<getGachaListResponse>>('/api/v1/gacha/my-emojis', {
            method : 'GET',
            });
            return res.data;
        }
        catch(error){
            console.error("Error fetching gacha list: ", error);
        }

        return null;
    },


    /**
     * 가챠를 뽑습니다.
     * @slug /api/v1/gacha/draw
     * @method POST
     */
    async drawGacha () : Promise<EmojiItem | null>{ 
        try{
            const res = await apiFetch<ApiResponse<EmojiItem>>('/api/v1/gacha/draw', {
                method : 'POST',
            });
            return res.data;
        }
        catch(error){
            console.error("Error drawing gacha: ", error);
        }

        return null;
    },



    async getGachaMileage() : Promise<number>{
        try{
            const res = await apiFetch<ApiResponse<number>>('/api/v1/gacha/mileage', {
                method : 'GET',
            });
            console.log("Gacha mileage response: ", res);
            return res.data;
        }
        catch(error){
            console.error("Error fetching gacha mileage: ", error);
        } 

        return 0;
    }

}