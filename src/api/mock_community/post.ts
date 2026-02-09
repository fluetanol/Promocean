import { makeMockPostDetailFromFile } from "@/mock/communityMockHelper.server";
import { CommunityPostItemResponse } from "@/types/itemType";



export const MockPostAPI ={

    async getMockDetail(postId: number, token?: string | null) : Promise<{ communityPostDetailData: CommunityPostItemResponse | null }> {
        
          //console.log("error");
          const communityPostDetailData : CommunityPostItemResponse | null = await makeMockPostDetailFromFile(postId);
          //console.log("take ", communityPostDetailData);
    
          return { communityPostDetailData };
        
    }
}