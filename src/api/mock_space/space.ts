import { ApiResponse } from "@/types/apiTypes/common";
import { GetSpaceArchiveFoldersResponse } from "@/types/apiTypes/space";
import { apiFetch } from "../fetcher";




const MockSpaceAPI = {

    async getMockSpaceArchiveFoldersData(): Promise<GetSpaceArchiveFoldersResponse | null> {
        try {
            const response = await fetch('/mock/SpaceArchiveFoldersResponse.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: GetSpaceArchiveFoldersResponse = await response.json();
            return data;
        } catch (error) {
            console.error('Mock 데이터 로딩 실패:', error);
            return null;
        }
    },


}

export default MockSpaceAPI;