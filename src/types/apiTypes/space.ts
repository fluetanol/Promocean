import { TeamSpaceRole } from "@/enum/TeamSpaceRole";
import { TeamSpaceChoiceItemProps } from "@/components/item/TeamSpaceTeamChoiceItem";
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

export interface GetTeamSpaceListResponse{
    spaces : TeamSpaceChoiceItemProps[];
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
    filePath : string;
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


export interface ArticleData{
    articleId : number;
    title : string;
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
