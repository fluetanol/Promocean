import { ApiResponse } from "@/types/apiTypes/common";
import { apiFetch } from "./fetcher";

export interface TagItem{
    tagId : number;
    name : string;
    usageCnt : number;
}


export interface TagAutoCompleteResponse{
    data : TagItem[];
}


export const TagAPI = {


    async getTagAutoCompleteList(params ? : {keyword ? : string, size? : number}) : Promise<TagAutoCompleteResponse> {

        const queryParams = new URLSearchParams();

        //size default = 10
        if (!params?.size) queryParams.append('size', '10');

        if (params?.keyword) queryParams.append('keyword', params.keyword);
        if (params?.size) queryParams.append('size', params.size.toString());

        const res = await apiFetch<TagAutoCompleteResponse>(`/api/v1/tags/autocomplete?${queryParams.toString()}`, {
            method : 'GET',
        });

        return res;
    }
}