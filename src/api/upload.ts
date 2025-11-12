import { ApiResponse } from "./common";
import { apiFetch } from "./fetcher";
import { NoArgsResponse } from "./space";


export interface getImagesS3UploadResponse{
    presignedUrl : string;
    key : string;
}


export interface uploadImageToS3Request{
    presignedUrl : string;
    file : File;
}

export const UploadAPI = {

    async getImagesS3Upload(fileName : string) : Promise<getImagesS3UploadResponse | null>{

        const res = await apiFetch<ApiResponse<getImagesS3UploadResponse>>(`/api/v1/images?filename=${encodeURIComponent(fileName)}`, {
        });
        console.log("getImagesS3Upload response:", res);
        return res.data;
    },

    async uploadImageToS3(req: uploadImageToS3Request) : Promise<Response | null>{
     
        const res = await fetch(req.presignedUrl, {
            method : 'PUT',
            body : req.file,
            headers: {  
                'Content-Type': req.file.type
            },
            
        })

        
        return res;
    } 

}