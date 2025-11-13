import { useState } from "react";
import Image from "next/image";
import { SpaceAddMemberItemProps } from "../item/SpaceAddMemberItem";
import TeamSpaceAddMemberList from "../list/TeamSpaceAddMemberList";
import TeamSpaceTeamChoiceLabelList from "../list/TeamSpaceTeamChoiceLabelList";
import { TeamSpaceChoiceItemProps } from "../item/TeamSpaceTeamChoiceItem";
import { TeamSpaceRole } from "@/enum/TeamSpaceRole";
import SpaceAPI from "@/api/space";

export interface SelectedMember {
    name: string;
    email: string;
    role: TeamSpaceRole;
}


export interface TeamSpaceAddModalProps{
    //추가 필요시 여기에 작성
    isModalState: boolean;
    setIsModalState: (state: boolean) => void;
    teamSpaceTeamChoiceList?: TeamSpaceChoiceItemProps[];
    setTeamSpaceTeamChoiceList: (list: TeamSpaceChoiceItemProps[]) => void;
}



export default function TeamSpaceAddModal({isModalState, setIsModalState, teamSpaceTeamChoiceList, setTeamSpaceTeamChoiceList}: TeamSpaceAddModalProps){

    const [isMemberExistState, setIsMemberExistState] = useState(false);
    const [searchSpaceMemberListState, setSearchSpaceMemberListState] = useState<SpaceAddMemberItemProps[]>([])
    const [selectedMembersState, setSelectedMembersState] = useState<Map<string, SelectedMember>>(new Map());
    const [spaceNameState, setSpaceNameState] = useState("");
    const [spaceNameErrorState, setSpaceNameErrorState] = useState(false);
    const [spaceImageState, setSpaceImageState] = useState<File | null>(null);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(spaceNameState.trim() === ""){
            setSpaceNameErrorState(true);
            return;
        }
        // 여기에 팀 스페이스 생성 로직 추가
        console.log("팀 스페이스 생성:", {
            name: spaceNameState,
            image: spaceImageState,
            members: Array.from(selectedMembersState.values())
        });

        

        const res = await SpaceAPI.postTeamSpaceCreate({
            name: spaceNameState,
            participants: [...Array.from(selectedMembersState.values()).map((member) => ({
                email: member.email,
                role: member.role
            }))]
        })


        setTeamSpaceTeamChoiceList([
            ...teamSpaceTeamChoiceList!,
            {
                name: res!.name,
                participantCnt: res!.participantsCnt,
                spaceCoverUrl: res!.spaceCoverUrl,
                spaceId: res!.spaceId
            }
        ])

        // 생성 후 모달 닫기
        setIsModalState(false);
    }
        
    return(
            <div
                className={`fixed flex inset-0 z-10 w-full h-full bg-black/40 backdrop-blur-xs justify-center items-center
                transition-opacity duration-300 ease-out
                ${isModalState ? 'opacity-100' : 'opacity-0'}`}
                onClick={() => setIsModalState(false)}
                >
                    <form 
                        onSubmit={handleSubmit} 
                        className={`flex flex-col bg-white p-10 rounded-lg w-[450px]  h-[680px] justify-between
                            transition-all duration-300 ease-out
                            ${isModalState ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4'}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        
                        <div className="flex flex-col gap-3">
                            <h2 className="text-3xl font-bold pb-2">팀 스페이스 생성</h2>
                            {/* 팀 스페이스 생성 폼 내용 */}


                            {/* 팀 스페이스 이름 및 팀원 추가 */}

                            <div className = "flex flex-col">
                                <input
                                    type="text"
                                    placeholder="팀 스페이스 이름을 입력하세요"
                                    className={` w-full border rounded-[10px] p-3 ${
                                        spaceNameErrorState ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    value={spaceNameState}
                                    onChange={(e) => {
                                        setSpaceNameState(e.target.value);
                                        if(spaceNameErrorState) setSpaceNameErrorState(false);
                                    }}
                                />
                                {spaceNameErrorState && (
                                    <div className="text-red-500 text-sm mt-1">팀 스페이스 이름을 입력해주세요</div>
                                )}
                            </div>


                            <div>
                                <div className="relative">
                                <input type="text"
                                    placeholder="팀원 닉네임 또는 이메일을 입력하세요"
                                    className = "w-full border border-gray-300 rounded-[10px] p-3"
                                    onKeyDown={(e)=>{
                                              if(e.key === '\n' || e.key === 'Enter'){
                                            console.log("zz");
                                        }
                                    }}
                                />

                                {isMemberExistState &&
                                    <TeamSpaceAddMemberList
                                    searchSpaceMemberListState={searchSpaceMemberListState}
                                    selectedMembersState={selectedMembersState}
                                    setSelectedMembersState={setSelectedMembersState} />
                                }
                                </div>

                                <TeamSpaceTeamChoiceLabelList
                                    selectedMembersState={selectedMembersState}
                                    setSelectedMembersState={setSelectedMembersState}
                                />

                            </div>
                        </div>

        
                        
                        <div className="flex flex-row gap-8 justify-center-safe w-full">
                            <button 
                                type="button"
                                className="px-5 py-3 items-center justify-center bg-gray-200 rounded-4xl w-40
                                hover:bg-gray-300 active:bg-gray-400"
                                onClick={() => setIsModalState(false)}
                            >
                                등록 취소
                            </button>
                            <input 
                                type="submit" 
                                value={"생성하기"}
                                className="px-5 py-3 items-center justify-center bg-primary text-white rounded-4xl w-40
                                hover:bg-primary/90 active:bg-primary/80 cursor-pointer"
                            />
                        </div>
                    </form>
                </div>
    )
}