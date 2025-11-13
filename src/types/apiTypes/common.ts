export interface ApiResponse<T>{
    message : string | null;
    data : T;
}

export interface NoArgsResponse{
    message : string;
}
