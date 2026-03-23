import { ApiResponse } from "@/types/apiTypes/common";
import { GetSpaceArchiveFoldersResponse, GetTeamSpaceListResponse } from "@/types/apiTypes/space";
import { apiFetch } from "../fetcher";
import { TeamSpaceChoiceItemProps } from "@/components/item/TeamSpaceTeamChoiceItem";




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

    async getMockTeamSpaceListData() : Promise<GetTeamSpaceListResponse | null> {
        try {
            const response = await fetch('/mock/TeamSpaceListResponse.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: GetTeamSpaceListResponse = await response.json();
            return data;
        } catch (error) {
            console.error('Mock 데이터 로딩 실패:', error);
            return null;
        }
    }

}

export default MockSpaceAPI;