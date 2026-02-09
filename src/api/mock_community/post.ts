import { makeMockPostDetail } from "@/mock/communityMockHelper";
import { CommunityPostItemResponse } from "@/types/itemType";



export const MockPostAPI ={



    async getMockDetail(postId: number, token?: string | null) : Promise<{ communityPostDetailData: CommunityPostItemResponse | null }> {
        
          //console.log("error");
          const communityPostDetailData : CommunityPostItemResponse | null = await makeMockPostDetail(postId);
          //console.log("take ", communityPostDetailData);
    
          return { communityPostDetailData };
        
    }
}