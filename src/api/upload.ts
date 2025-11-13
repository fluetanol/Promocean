import { ApiResponse } from "@/types/apiTypes/common";
import { apiFetch } from "./fetcher";
import { getImagesS3UploadResponse, uploadImageToS3Request } from "@/types/apiTypes/upload";


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