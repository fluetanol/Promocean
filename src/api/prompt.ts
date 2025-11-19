import { ApiResponse } from "@/types/apiTypes/common";
import { apiFetch } from "./fetcher";
import { PostImagePromptRequest, PostImamgePromptResponse, PostTextPromptRequest, PostTextPromptResponse } from "@/types/apiTypes/prompt";

export const PromptAPI = {

    /**
     * 텍스트 프롬프트 전송 및 답변 응답
     * @param req 
     * @returns 
     */
  async postTextPrompt(req : PostTextPromptRequest) : Promise<PostTextPromptResponse> {
    const res  = await apiFetch<ApiResponse<PostTextPromptResponse>>(`/api/v1/prompt/text`, {
      method: 'POST',
      body: JSON.stringify(req)
    });

    return res.data;
  },


  async postImagePrompt(req : PostImagePromptRequest) : Promise<PostImamgePromptResponse> {
    const res  = await apiFetch<ApiResponse<PostImamgePromptResponse>>(`/api/v1/prompt/image`, {
      method: 'POST',
      body: JSON.stringify(req)
    });

    return res.data;
  }


}