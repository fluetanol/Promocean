import { ApiResponse } from "@/types/apiTypes/common";
import { GetSpaceArchiveFoldersResponse, GetTeamSpaceListResponse } from "@/types/apiTypes/space";
import { apiFetch } from "../fetcher";
import { TeamSpaceChoiceItemProps } from "@/components/item/TeamSpaceTeamChoiceItem";
import { getSpaceParticipantsResponse } from "../space";




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
    },

    async getMockSpaceParticipants(spaceId : number) : Promise< getSpaceParticipantsResponse | null> {
        try {
            const response = await fetch(`/mock/TeamSpaceParticipantsResponse.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            const filteredParticipants : getSpaceParticipantsResponse = data[spaceId] || { participants : [] };

            console.log(`Mock 데이터에서 spaceId ${spaceId}에 해당하는 참가자 목록:`, filteredParticipants);

            return filteredParticipants;
            
        } catch (error) {
            console.error('Mock 데이터 로딩 실패:', error);
            return null;
        }
    }

}

export default MockSpaceAPI;