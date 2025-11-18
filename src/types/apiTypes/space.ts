import { TeamSpaceRole } from "@/enum/TeamSpaceRole";
import { SpaceArchiveData } from "@/store/archiveFolderStore";

export interface GetSpaceArchiveFoldersResponse{
     folders : SpaceArchiveData[];
}

export interface PostMySpaceArchiveFolderRequest {
    name :string;
    color:string;
}

export interface PostMySpaceArchiveFolderResponse {
    folderId : number;
    name :string;
    color:string;
    isPinned : boolean;
}

export interface PatchMySpaceArchiveFolderDataRequest {
    name : string;
    color : string;
}

export interface PatchMySpaceArchiveFolderPinStatusRequest {
    folderId : number;
    name : string;
    color : string;
    isPinned : boolean;
}

/**
 * 팀 스페이스 아이템 데이터 타입
 * API에서 role은 문자열("READER", "EDITOR", "OWNER")로 반환됩니다.
 */
export interface TeamSpaceItem {
    name: string;
    participantCnt: number;
    spaceCoverUrl: string;
    spaceId: number;
    userRole: "READER" | "EDITOR" | "OWNER";
}

export interface GetTeamSpaceListResponse{
    spaces : TeamSpaceItem[];
}

export interface Participants{
    email : string;
    role : TeamSpaceRole;
}

export interface PostTeamSpaceCreateRequest{
    name : string;
    participants : Participants[];
}

export interface PostTeamSpaceCreateResponse{
    spaceId : number;
    name : string;
    participantsCnt : number;
    spaceCoverUrl : string;
}

export interface DeleteTeamSpaceResponse{
    folders : SpaceArchiveData[];
}

export interface PatchTeamSpaceRequest{
    name : string;
    spaceCoverPath : string;
}

export interface PutArchiveArticleRequest{
    title : string;
    description : string;
    prompt : string;
    type : number;
    exampleQuestion : string;
    exampleAnswer : string;
    filePath : string;
    tags : string[];
}


export interface PostArchiveArticleCreateRequest{
    title : string;
    description : string;
    prompt : string;
    type : number;
    exampleQuestion : string;
    exampleAnswer : string;
    filePath? : string;
    tags : string[];
}

export interface PostArchiveArticleCreateResponse{
    articleId : number;
    title : string;
    description : string;
    prompt : string;
    type : string;
    exampleQuestion : string;
    exampleAnswer : string;
    filePath : string;
    updatedAt : string;
    tags : string[];
}

/**
 * 스페이스 아카이브 글 데이터의 타입입니다.
 */
export interface ArticleData{
    articleId : number;
    title : string;
    description : string;
    prompt : string;
    sampleQuestion : string;
    sampleAnswer : string;
    fileUrl : string;
    type : string;
    updatedAt : string;
    tags : string[];
}


export interface GetArchiveArticlesResponse{
    articles : ArticleData[];
    itemCnt : number;
    totalCnt : number;
    totalPages : number;
    currentPage : number;
}
