export interface getImagesS3UploadResponse{
    presignedUrl : string;
    key : string;
}


export interface uploadImageToS3Request{
    presignedUrl : string;
    file : File;
}