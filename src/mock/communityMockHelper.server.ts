import { CommunityPostItemResponse } from "@/types/itemType";
import { promises as fs } from 'fs';

// 파일 시스템을 이용한 mock detail 데이터 생성 함수
export async function makeMockPostDetailFromFile(
  postId: number
): Promise<CommunityPostItemResponse | null> {
  //console.log("makeMockPostDetailFromFile called with postId:", postId);
  
  try {
    //파일 위치 : public/mock/CommunityPostDetailResponse.json
    const data = await fs.readFile('public/mock/CommunityPostDetailResponse.json', 'utf-8');
    console.log(data);
    const list : CommunityPostItemResponse[] = JSON.parse(data);
    
    console.log("list " ,list);
    if (!Array.isArray(list) || list.length === 0) {
      return null;
    }
    
    const safePostId = Number.isFinite(postId) ? postId : 0;

    const index = ((safePostId % list.length) + list.length) % list.length;

    return list[index] ?? null;
  }
  catch (error) {
    console.error("Error reading mock data from file:", error);
    return null;
  }
}
