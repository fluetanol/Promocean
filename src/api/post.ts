import { ApiResponse } from "@/types/apiTypes/common";
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

    /**
     * 게시글 작성하는 API입니다.
     * @page /post?type={type}
     * @endpoint POST /api/v1/posts
     * @description 게시글을 작성하는 API입니다.
     * @param {PostArticleRequest} data - 게시글 작성 요청 데이터
     * @returns {Promise<{ message: string | null, data: PostArticleResponse }>}
     */
    async postArticlePost(data: PostArticleRequest) {
        const res = await apiFetch<ApiResponse<PostArticleResponse>>(`/api/v1/posts`, {
            method: 'POST',
            body: JSON.stringify(data)
        });

        return res.data;
    },

    /**
     * 게시글 수정하는 API입니다.
     * @page /post?type=community&mode=edit&postId={postId}
     * @endpoint PUT /api/v1/posts/{postId}
     * @description 커뮤니티 게시글을 수정하는 API입니다.
     * @param {number} postId - 게시글 ID
     * @param {PostArticleRequest} data - 게시글 수정 요청 데이터
     * @returns {Promise<{ message: string | null, data: PostArticleResponse }>}
     */
    async putArticlePost(postId: number, data: PostArticleRequest) {
        const res = await apiFetch<ApiResponse<PostArticleResponse>>(`/api/v1/posts/${postId}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });

        return res.data;
    },

    /**
     * 게시글 삭제하는 API입니다.
     * @page /community/[postId]
     * @endpoint DELETE /api/v1/posts/{postId}
     * @description 커뮤니티 게시글을 삭제하는 API입니다.
     * @param {number} postId - 게시글 ID
     * @returns {Promise<{ message: string | null, data: null }>}
     */
    async deletePost(postId: number) { 
        const res = await apiFetch<ApiResponse<null>>(`/api/v1/posts/${postId}`, {
            method: 'DELETE'
        });

        return res.data;
    }

}