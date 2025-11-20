import { useState } from "react";
import TeamSpaceTeamChoiceLabelList from "../list/TeamSpaceTeamChoiceLabelList";
import { TeamSpaceChoiceItemProps } from "../item/TeamSpaceTeamChoiceItem";
import { TeamSpaceRole } from "@/enum/TeamSpaceRole";
import SpaceAPI from "@/api/space";
import { authAPI } from "@/api/auth";

export interface SelectedMember {
    name: string;
    email: string;
    role: TeamSpaceRole;
    profileUrl?: string | null;
}


export interface TeamSpaceAddModalProps{
    //추가 필요시 여기에 작성
    isModalState: boolean;
    setIsModalState: (state: boolean) => void;
    teamSpaceTeamChoiceList?: TeamSpaceChoiceItemProps[];
    setTeamSpaceTeamChoiceList: (list: TeamSpaceChoiceItemProps[]) => void;
}


/**
 *  팀 스페이스 생성 모달 컴포넌트
 * @param param0 
 * @returns 
 */
export default function TeamSpaceAddModal({isModalState, setIsModalState, teamSpaceTeamChoiceList, setTeamSpaceTeamChoiceList}: TeamSpaceAddModalProps){

    const [selectedMembersState, setSelectedMembersState] = useState<Map<string, SelectedMember>>(new Map());
    const [spaceNameState, setSpaceNameState] = useState("");
    const [spaceNameErrorState, setSpaceNameErrorState] = useState(false);
    const [spaceImageState, setSpaceImageState] = useState<File | null>(null);
    const [searchInputState, setSearchInputState] = useState("");
    const [searchMode, setSearchMode] = useState<"email" | "nickname">("email");
    const [searchError, setSearchError] = useState("");

    // 검색 입력 후 엔터 키 처리
    const handleSearchKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchInputState.trim()) {
            e.preventDefault();
            setSearchError(""); // 에러 메시지 초기화

            const searchValue = searchInputState.trim();

            // 이미 추가 목록에 있는지 확인
            const isDuplicate = Array.from(selectedMembersState.values()).some(m =>
                searchMode === "email"
                    ? m.email === searchValue
                    : m.name === searchValue
            );
            if (isDuplicate) {
                setSearchError(`이미 추가된 ${searchMode === "email" ? "이메일" : "닉네임"}입니다.`);
                return;
            }

            // 회원 정보 조회
            try {
                const memberInfo = await authAPI.getMemberinfo(
                    searchMode === "email"
                        ? { email: searchValue }
                        : { nickname: searchValue }
                );

                // 새 멤버 추가
                const newMember: SelectedMember = {
                    name: memberInfo.nickname,
                    email: memberInfo.email,
                    role: TeamSpaceRole.READER,
                    profileUrl: memberInfo.profileUrl
                };

                const newMap = new Map(selectedMembersState);
                newMap.set(newMember.email, newMember);
                setSelectedMembersState(newMap);

                setSearchInputState(""); // 입력창 초기화
                setSearchError(""); // 에러 메시지 초기화
            } catch (error) {
                console.error("Error fetching member info:", error);
                setSearchError(`존재하지 않는 ${searchMode === "email" ? "이메일" : "닉네임"}입니다. 다시 확인해주세요.`);
            }
        }
    };

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
                spaceId: res!.spaceId,
                userRole: "OWNER"
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


                            <div className="flex flex-col gap-3">
                                {/* 검색 모드 선택 드롭다운 */}
                                <div className="flex items-center gap-2">
                                    <label className="text-sm text-gray-600">검색 방식:</label>
                                    <select
                                        value={searchMode}
                                        onChange={(e) => {
                                            setSearchMode(e.target.value as "email" | "nickname");
                                            setSearchError("");
                                            setSearchInputState("");
                                        }}
                                        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        <option value="email">이메일</option>
                                        <option value="nickname">닉네임</option>
                                    </select>
                                </div>

                                {/* 검색 입력 필드 */}
                                <div className="flex flex-col gap-1">
                                    <input
                                        type={searchMode === "email" ? "email" : "text"}
                                        placeholder={searchMode === "email"
                                            ? "초대할 멤버의 이메일을 입력하고 Enter를 누르세요"
                                            : "초대할 멤버의 닉네임을 입력하고 Enter를 누르세요"
                                        }
                                        className={`w-full border rounded-[10px] px-4 py-2 focus:outline-none focus:ring-2 transition-all ${
                                            searchError
                                                ? "border-red-500 focus:ring-red-500"
                                                : "border-gray-300 focus:ring-primary"
                                        }`}
                                        value={searchInputState}
                                        onChange={(e) => {
                                            setSearchInputState(e.target.value);
                                            setSearchError(""); // 입력 시 에러 메시지 제거
                                        }}
                                        onKeyDown={handleSearchKeyPress}
                                    />
                                    {/* 인라인 에러 메시지 */}
                                    {searchError && (
                                        <p className="text-red-500 text-sm px-1">{searchError}</p>
                                    )}
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