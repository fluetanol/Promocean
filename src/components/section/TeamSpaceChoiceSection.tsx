'use client';
import { useEffect, useState } from "react";
import TeamSpaceAddButton from "../button/TeamSpaceAddButton";
import SearchBar from "../filter/SearchBar";
import { TeamSpaceChoiceItemProps } from "../item/TeamSpaceTeamChoiceItem"
import TeamSpaceTeamChoiceList from "../list/TeamSpaceTeamChoiceLlist"
import TeamSpaceAddModal from "../modal/TeamSpaceAddModal";
import { SpaceAPI } from "@/api/space";
import { useSpaceStore } from "@/store/spaceStore";

export default function TeamSpaceChoiceSection(){
    
    const [isModalOpenState, setIsModalOpenState] = useState(false);
    const [shouldRenderModalState, setShouldRenderModalState] = useState(false);
    const [teamSpaceTeamChoiceListState, setTeamSpaceTeamChoiceListState] = useState<TeamSpaceChoiceItemProps[]>([]);
    const spaceStore = useSpaceStore();


    useEffect(()=>{
        // console.log("팀 스페이스 리스트 ", teamSpaceTeamChoiceListState);
        const fetchData = async () => {
            try {
                const res = await SpaceAPI.getTeamSpaceList();
                const spaceList = res?.spaces || [];

                console.log("팀 스페이스 리스트 재조회 ", spaceList);

                console.log("role!! :", spaceList[0]?.userRole);
                spaceStore.setAllTeamSpaces(spaceList);
                setTeamSpaceTeamChoiceListState(spaceList);

            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, []);





    const onOpenModal = () => {
        setShouldRenderModalState(true);
        // DOM에 마운트된 후 애니메이션 시작을 위해 약간의 지연
        setTimeout(() => {
            setIsModalOpenState(true);
        }, 10);
    };

    const onCloseModal = () => {
        setIsModalOpenState(false);
        // 애니메이션이 끝난 후 DOM에서 제거
        setTimeout(() => {
            setShouldRenderModalState(false);
        }, 300); // transition duration과 동일하게 설정
    };

    return(
        <div className="min-h-screen bg-gray-50 py-5 px-4 flex flex-col">
            <div className="flex flex-row justify-between items-center mb-5">
                <TeamSpaceAddButton 
                    isModalRef={isModalOpenState} 
                    setIsModalRef={onOpenModal}
                />
                <SearchBar/>
            </div>
            {/* 팀 스페이스 아이템들 */}
            {teamSpaceTeamChoiceListState.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                    <svg
                        className="w-24 h-24 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                    <p className="text-lg font-medium mb-2">팀 스페이스가 없습니다</p>
                    <p className="text-sm text-gray-400">새로운 팀 스페이스를 생성해보세요</p>
                </div>
            ) : (
                <TeamSpaceTeamChoiceList teamSpaceTeamChoiceList={teamSpaceTeamChoiceListState} />
            )}
            
            {shouldRenderModalState && (
                <TeamSpaceAddModal 
                    isModalState={isModalOpenState} 
                    setIsModalState={onCloseModal}
                    teamSpaceTeamChoiceList={teamSpaceTeamChoiceListState}
                    setTeamSpaceTeamChoiceList={setTeamSpaceTeamChoiceListState}
                />
            )}
        </div>
    )
}