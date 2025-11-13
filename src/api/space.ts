import { ApiResponse, NoArgsResponse } from "@/types/apiTypes/common";
import { apiFetch } from "./fetcher";
import { ArticleData, DeleteTeamSpaceResponse, GetArchiveArticlesResponse, GetSpaceArchiveFoldersResponse, GetTeamSpaceListResponse, PatchMySpaceArchiveFolderDataRequest, PatchMySpaceArchiveFolderPinStatusRequest, PatchTeamSpaceRequest, PostArchiveArticleCreateRequest, PostArchiveArticleCreateResponse, PostMySpaceArchiveFolderRequest, PostMySpaceArchiveFolderResponse, PostTeamSpaceCreateRequest, PostTeamSpaceCreateResponse, PutArchiveArticleRequest } from "@/types/apiTypes/space";
import { SpaceRole, TeamSpaceRole } from "@/enum/TeamSpaceRole";


export const SpaceAPI = {

    /**
     * 스페이스의 아카이브 폴더 데이터를 조회하는 API입니다.
     */
    async getSpaceArchiveFoldersData(spaceId : number) : Promise<GetSpaceArchiveFoldersResponse | null> {
        if(!spaceId){ return null;}

        console.log("API spaceId ", spaceId);
        const res = await apiFetch <ApiResponse<GetSpaceArchiveFoldersResponse>>(`/api/v1/spaces/${spaceId}/folders`, {
            method: "GET",
        });

        return res.data;
    },


    /*
    * 마이스페이스의 아카이브 폴더를 추가하는 API입니다.
    */
    async postMySpaceArchiveFolderData(personalSpaceId : number | undefined, folderData : PostMySpaceArchiveFolderRequest): 
    Promise<PostMySpaceArchiveFolderResponse | null> {
        if(!personalSpaceId){
            return null;
        }
        console.log("폴더 데이터!! ", folderData)
        const res = await apiFetch<ApiResponse<PostMySpaceArchiveFolderResponse>>(`/api/v1/spaces/${personalSpaceId}/folders`, {
            method: "POST",
            body: JSON.stringify(folderData),
        });

        console.log("API Res ",res);
        return res.data;
    },


    /*
    * 마이스페이스의 아카이브 폴더를 삭제하는 API입니다.
    */
    async deleteMySpaceArchiveFolderData(personalSpaceId : number , folderId : number) : Promise<NoArgsResponse | null> {
        if(!personalSpaceId || !folderId) {
            return null;
        }

        const res = await apiFetch<ApiResponse<NoArgsResponse>>(`/api/v1/spaces/${personalSpaceId}/folders/${folderId}`, {
            method: "DELETE",
        });

        console.log("Delete API Res ",res);

        return res.data;
    },

    /*
    * 마이스페이스의 아카이브 폴더를 수정하는 API입니다.
    */
    async patchMySpaceArchiveFolderData (personalSpaceId : number, folderId : number, folderData : PatchMySpaceArchiveFolderDataRequest) : Promise<NoArgsResponse | null> {
        if(!personalSpaceId || !folderId) {
            return null;
        }
        console.log("폴더 수정 시도 ",folderId)
        const res = await apiFetch<NoArgsResponse>(`/api/v1/spaces/${personalSpaceId}/folders/${folderId}`, {
            method: "PATCH",
            body: JSON.stringify(folderData),
        });

        console.log("Patch API Res ",res);

        return res;
    },

    /*
    * 마이스페이스의 아카이브 폴더의 pinned 상태를 토글하는 API입니다.
    */
    async patchMySpaceArchiveFolderPinStatus (personalSpaceId : number, folderId : number) : Promise<PatchMySpaceArchiveFolderPinStatusRequest | null> {
        if(!personalSpaceId || !folderId) {
            return null;
        }

        const res = await apiFetch<ApiResponse<PatchMySpaceArchiveFolderPinStatusRequest>>(`/api/v1/spaces/${personalSpaceId}/folders/${folderId}/pin`, {
            method: "PATCH"
        });

        console.log("Patch API Res ",res);

        return res.data;
    },


    // 팀 스페이스

    /*
    * 팀 스페이스 목록을 조회하는 API입니다.
    */
    async getTeamSpaceList() : Promise<GetTeamSpaceListResponse | null> {
        const res = await apiFetch<ApiResponse<GetTeamSpaceListResponse>>(`/api/v1/spaces`, {
            method: "GET"
        });

        console.log("Get Team Space List API Res ",res);

        return res.data;
    },

    /*
        * 팀 스페이스를 생성하는 API입니다.
    */
    async postTeamSpaceCreate(teamSpaceData : PostTeamSpaceCreateRequest) : Promise<PostTeamSpaceCreateResponse | null> {
        const res = await apiFetch<ApiResponse<PostTeamSpaceCreateResponse>>(`/api/v1/spaces`, {
            method: "POST",
            body: JSON.stringify(teamSpaceData),
        });

        console.log("Post Team Space Create API Res ",res);

        return res.data;
    },

    /*
        * 팀 스페이스를 삭제하는 API입니다.
    */
    async deleteTeamSpace(teamSpaceId : number) : Promise<DeleteTeamSpaceResponse | null> {
        console.log("Delete Team Space ID ", teamSpaceId);    
    
        const res = await apiFetch<ApiResponse<DeleteTeamSpaceResponse>>(`/api/v1/spaces/${teamSpaceId}`, {
            method: "DELETE",
        });

        console.log("Delete Team Space API Res ",res);

        return res.data;
    },

    /*
        * 팀 스페이스를 수정하는 API입니다.
    */
    async patchTeamSpace(teamSpaceId : number, teamSpaceData : PatchTeamSpaceRequest) : Promise<NoArgsResponse | null> {
        const res = await apiFetch<NoArgsResponse>(`/api/v1/spaces/${teamSpaceId}`, {
            method: "PATCH",
            body: JSON.stringify(teamSpaceData),
        });

        console.log("Patch Team Space API Res ",res);
        return res;
    },
    

    // 아티클


    /*
        * 아카이브 아티클을 수정하는 API입니다.
    */
    async putArchiveArticle(spaceId : number, folderId : number, articleId : number, archiveArticleData : PutArchiveArticleRequest) : Promise<NoArgsResponse | null> {
        const res = await apiFetch<NoArgsResponse>(`/api/v1/spaces/${spaceId}/folders/${folderId}/articles/${articleId}`, {
            method: "PUT",
            body: JSON.stringify(archiveArticleData),
        });

        console.log("Put Archive Article API Res ",res);
        return res;
    },

    /* 
        * 아카이브 아티클을 삭제하는 API입니다.
    */
    async deleteArchiveArticle(spaceId : number, folderId : number, articleId : number) : Promise<NoArgsResponse | null> {
        const res = await apiFetch<NoArgsResponse>(`/api/v1/articles/${articleId}`, {
            method: "DELETE",
        });

        console.log("Delete Archive Article API Res ",res);
        return res;
    },

    /*
        * 아카이브 아티클을 생성하는 API입니다.
    */
    async postArchiveArticleCreate(spaceId : number, folderId : number, archiveArticleData : PostArchiveArticleCreateRequest) : Promise<PostArchiveArticleCreateResponse | null> {
        const res = await apiFetch<ApiResponse<PostArchiveArticleCreateResponse>>(`/api/v1/spaces/${spaceId}/folders/${folderId}/articles`, {
            method: "POST",
            body: JSON.stringify(archiveArticleData),
        });

        return res.data;
    },

    /*
        * 아카이브 아티클 목록을 조회하는 API입니다.
    */
    async getArchiveArticles(spaceId : number, folderId : number, type? : number, tag? : string, title? : string, page : number=1, size : number=10, sort : "latest"|"oldest" ="latest") : Promise<GetArchiveArticlesResponse | null> {
       
       const params=  new URLSearchParams();
        params.append("folderId", folderId.toString());
        if(type) params.append("type", type.toString());
        if(tag) params.append("tag", tag);
        if(title) params.append("title", title);
        params.append("page", page.toString());
        params.append("size", size.toString());
        params.append("sort", sort);

        console.log(`/api/v1/spaces/${spaceId}/articles?${params.toString()}`)

    //    ?type=${type}&tag=${tag}&title=${title}&page=${page}&size=${size}&sort=${sort}
    //    folders/${folderId}/

       const res = await apiFetch<ApiResponse<GetArchiveArticlesResponse>>(`/api/v1/spaces/${spaceId}/articles?${params.toString()}`, {
            method: "GET",
        });


        return res.data;
    },


    /*
        * 아카이브 아티클 상세 조회하는 API입니다.
    */
    async getArchiveArticleDetail(spaceId: number,  articleId : number) : Promise<ArticleData | null> {
        const res = await apiFetch<ApiResponse<ArticleData>>(`/api/v1/spaces/${spaceId}}/articles/${articleId}`, {
            method: "GET",
        });
        return res.data;
    },

    /*
        * 스페이스 참가자 목록을 조회하는 API입니다.
    */
    async getSpaceParticipants(spaceId : number){
        const res = await apiFetch<ApiResponse<getSpaceParticipantsResponse>>(`/api/v1/spaces/${spaceId}/participants`, {
            method: "GET",
        });

        return res.data;
    },


    /*
        * 스페이스 참가자를 초대하는 API입니다.
    */
    async postSpaceParticipantInvite(spaceId : number, inviteData : ParticipantReqs) : Promise<NoArgsResponse | null> {

        console.log("data ", inviteData, spaceId)
        const res = await apiFetch<ApiResponse<NoArgsResponse>>(`/api/v1/spaces/${spaceId}/participants`,
            {
                method : "POST",
                body : JSON.stringify(inviteData),
            }
        )
        console.log(res);
        return res.data;
    },


    async patchSpaceParticipantRole(spaceId:number, patchData : SimpleSpaceParticipant) : Promise<NoArgsResponse | null> {
        console.log("patchData ", patchData);   
        
        const res = await apiFetch<ApiResponse<NoArgsResponse>>(`/api/v1/spaces/${spaceId}/participants`,
            {
                method : "PATCH",
                body : JSON.stringify(patchData),
            }
        )
        return res.data;
    },

    async patchSpaceParticipantMyName(spaceId: number, patchData: PatchSpaceParticipantMyNameRequest) : Promise<NoArgsResponse | null> {
        const res = await apiFetch<ApiResponse<NoArgsResponse>>(`/api/v1/spaces/${spaceId}/participants/me`,
            {
                method : "PATCH",
                body : JSON.stringify(patchData),
            }
        )
        return res.data;
    },

    /*
        * 스페이스 참가자를 삭제하는 API입니다.
    */
    async deleteSpaceParticipant(spaceId:number, participantId:number){
        const res = await apiFetch<ApiResponse<NoArgsResponse>>(`/api/v1/spaces/${spaceId}/participants/${participantId}`,
            {
                method : "DELETE",
            }
        )
        return res.data;
    },

    async deleteSpaceParticipantWithdrawal(spaceId:number){
        const res = await apiFetch<ApiResponse<NoArgsResponse>>(`/api/v1/spaces/${spaceId}/participants/withdrawal`,
            {
                method : "DELETE",
            }
        )
        return res.data;
    },

};

export interface SpaceParticipants{
    participantId : number;
    nickname : string;
    role : SpaceRole;
    profileUrl : string;
    email :string;
}

export interface getSpaceParticipantsResponse{
    participants : SpaceParticipants[];
}

export interface SimpleSpaceParticipant{
    email:string;
    role : TeamSpaceRole;
}

export interface ParticipantReqs{
    participantReqs : SimpleSpaceParticipant[];
}


export interface PatchSpaceParticipantMyNameRequest{
    nickname : string;
}

export default SpaceAPI;