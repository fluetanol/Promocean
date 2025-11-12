import { ApiResponse } from "./common";
import { apiFetch } from "./fetcher";
import { PostCategory, PromptType } from "@/types/postEnum";

export interface PostArticleRequest {
    title: string;
    description: string;
    category : PostCategory;
    prompt : string;
    promptType : PromptType;
    sampleQuestion : string;
    sampleAnswer : string;
    filePath? : string;
    tags : string[];
}


export interface PostArticleResponse{
    postId : number;
}

export const PostAPI = {

    async postArticlePost(data: PostArticleRequest) {
        const res = await apiFetch<ApiResponse<PostArticleResponse>>(`/api/v1/posts`, {
            method: 'POST',
            body: JSON.stringify(data)
        });

        return res.data;
    }

}