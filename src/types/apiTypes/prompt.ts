
export interface PostTextPromptRequest{
    prompt : string;
    exampleQuestion : string    
}

export interface PostTextPromptResponse{
    exampleAnswer : string;
}

export interface PostImagePromptRequest{
    prompt : string;
}

export interface PostImamgePromptResponse{
    cloudfrontUrl : string,
    key : string
}
