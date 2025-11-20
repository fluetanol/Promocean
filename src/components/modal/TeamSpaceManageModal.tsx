import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import TeamSpaceInsertionModalTabs from "../filter/TeamSpaceInsertionModalTabs";
import SpaceAddMemberItem from "../item/SpaceAddMemberItem";
import TeamSpaceMemberItem from "../item/TeamSpaceMemberItem";
import TeamSpaceMemberList from "../list/TeamSpaceMemberList";
import ImageChoiceButton from "../button/ImageChoiceButton";
import SpaceAPI, { SpaceParticipants } from "@/api/space";
import { UploadAPI } from "@/api/upload";
import { ChangeSpaceRoleToValue, SpaceRole, TeamSpaceRole } from "@/enum/TeamSpaceRole";
import { Space } from "lucide-react";
import { authAPI } from "@/api/auth";
import { useAuthStore } from "@/store/authStore";
import { TeamSpaceInfo, useSpaceStore } from "@/store/spaceStore";

export interface TeamSpacePageProps {
    spaceId? : number;
    isModalOpenState: boolean;
    handleModalClose: () => void;
    modalTabState: "멤버" | "초대" | "수정" | "삭제";
    setModalTabState: (tab: "멤버" | "초대" | "수정" | "삭제") => void;
    memberListState: SpaceParticipants[];
    ownerMemberState?: SpaceParticipants | null;
    setMemberListState: (members: SpaceParticipants[]) => void;
    teamName?: string;
    userRole?: "READER" | "EDITOR" | "OWNER";
}



export default function TeamSpaceManageModal( { spaceId, isModalOpenState, handleModalClose, modalTabState, setModalTabState, memberListState, ownerMemberState, setMemberListState, teamName = "팀 스페이스", userRole}: TeamSpacePageProps) {
    console.log("spaceId in TeamSpaceManageModal:", spaceId);
    const router = useRouter();
    const { user } = useAuthStore();
    const userNickname = useAuthStore((state) => state.user?.nickname);

    const spaceStore = useSpaceStore();
    const currentSpace = spaceStore.currentSpace;
    const setCurrentSpace = spaceStore.setCurrentSpace;

    // 권한 확인
    const isOwner = userRole === "OWNER";
    const isEditor = userRole === "EDITOR";
    const isReader = userRole === "READER";

    // OWNER만 초대, 수정, 삭제 가능
    // EDITOR, READER는 멤버 조회만 가능
    const canInvite = isOwner;
    const canEdit = isOwner;
    const canDelete = isOwner;
    
    const [addMemberListState, setAddMemberListState] = useState<SpaceParticipants[]>([]);
    const [searchInputState, setSearchInputState] = useState("");
    const [searchMode, setSearchMode] = useState<"email" | "nickname">("email");
    const [searchError, setSearchError] = useState("");
    // 수정 탭 state
    const [editSpaceImageState, setEditSpaceImageState] = useState<File | null>(null);
    const [editSpaceNameState, setEditSpaceNameState] = useState(currentSpace?.name || teamName);
    // 삭제 탭 state
    const [deleteInputState, setDeleteInputState] = useState("");
    const deleteConfirmText = `${teamName}를 삭제 하겠습니다`;
    const isDeleteValid = deleteInputState === deleteConfirmText;

    const handleDeleteTeam = async () => {
        console.log("handle " ,spaceId);
        if (isDeleteValid) {
   
            const res = await SpaceAPI.deleteTeamSpace(spaceId!);
            console.log("Res ",res);
            //handleModalClose();
            alert(`${teamName}이 삭제되었습니다`);

            router.push('/team-space');
        }
    };

    const handleInsertionTeam = async () => {
        
        const s3res =await UploadAPI.getImagesS3Upload(editSpaceImageState ? editSpaceImageState.name : "default.png");
        const presignedUrl = s3res?.presignedUrl;
        const key = s3res?.key;


        if(s3res && editSpaceImageState) {

            // 이미지가 있을 때만 업로드 진행
            const uploadS3Res = await UploadAPI.uploadImageToS3({
                presignedUrl : presignedUrl!,
                file : editSpaceImageState
            });

            // 업로드 성공 시에만 팀 스페이스 정보 업데이트
            const patchRes = await SpaceAPI.patchTeamSpace(spaceId!, {
                name: editSpaceNameState,
                spaceCoverPath : key!
            });

            alert(`${teamName}이 수정되었습니다`);
            const file = editSpaceImageState;

            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setCurrentSpace({
                        ...currentSpace!,
                        name : editSpaceNameState,
                        spaceCoverUrl :reader.result as string
                    })
                };
            reader.readAsDataURL(file);
            }
            handleModalClose();
        }
        else{
            setCurrentSpace({
                ...currentSpace!,
                name : editSpaceNameState,
            })

            const patchRes = await SpaceAPI.patchTeamSpace(spaceId!, {
                name: editSpaceNameState,
            });


            alert(`${teamName}이 수정되었습니다`);
            console.log("No image to upload, just update name");
            handleModalClose();
        }
    }

    // 검색 입력 후 엔터 키 처리
    const handleSearchKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchInputState.trim()) {
            e.preventDefault();
            setSearchError(""); // 에러 메시지 초기화

            const searchValue = searchInputState.trim();

            // 이미 팀원인지 확인
            const isExistInTeam = memberListState.some(m =>
                searchMode === "email"
                    ? m.email === searchValue
                    : m.nickname === searchValue
            );
            if (isExistInTeam) {
                setSearchError("이미 팀 스페이스에 존재하는 멤버입니다.");
                return;
            }

            // 이미 추가 목록에 있는지 확인
            const isDuplicate = addMemberListState.some(m =>
                searchMode === "email"
                    ? m.email === searchValue
                    : m.nickname === searchValue
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
                const newMember: SpaceParticipants = {
                    participantId: Date.now(), // 임시 ID
                    nickname: memberInfo.nickname,
                    email: memberInfo.email,
                    role: "READER",
                    profileUrl: memberInfo.profileUrl || ""
                };

                setAddMemberListState(prev => [...prev, newMember]);
                setSearchInputState(""); // 입력창 초기화
                setSearchError(""); // 에러 메시지 초기화
            } catch (error) {
                console.error("Error fetching member info:", error);
                setSearchError(`존재하지 않는 ${searchMode === "email" ? "이메일" : "닉네임"}입니다. 다시 확인해주세요.`);
            }
        }
    };

    // 멤버 권한 변경
    const handleMemberRoleChange = (email: string, newRole: TeamSpaceRole) => {
        setAddMemberListState(prev =>
            prev.map(member =>
                member.email === email
                    ? { ...member, role: newRole === TeamSpaceRole.READER ? "READER" : newRole === TeamSpaceRole.EDITOR ? "EDITOR" : "OWNER" }
                    : member
            )
        );
    };

    // 멤버 제거
    const handleRemoveMember = (email: string) => {
        setAddMemberListState(prev => prev.filter(member => member.email !== email));
    };

    // 초대하기 버튼 클릭
    const handleInviteTeamMembers = async () => {
        if (addMemberListState.length === 0) {
            alert("초대할 멤버를 추가해주세요.");
            return;
        }

        console.log("Inviting members:", addMemberListState);

        // ParticipantReqs 형식으로 변환
        const inviteData = {
            participantReqs: addMemberListState.map(member => ({
                email: member.email,
                role: ChangeSpaceRoleToValue(member.role)
            }))
        };

        try {
            const res = await SpaceAPI.postSpaceParticipantInvite(spaceId!, inviteData);

            console.log("Invite res", res);
            alert("멤버 초대가 완료되었습니다.");

            // 멤버 목록 업데이트
            const updateRes = await SpaceAPI.getSpaceParticipants(spaceId!);
            const participants = updateRes.participants;
            const owner = participants.find(participant => participant.nickname === userNickname) || null;
           
            console.log("새로 추가된 ",participants);

            if (owner) {
                participants.splice(participants.indexOf(owner), 1); // 소유자 제외
            }

            setMemberListState(participants);


            
            // 초대 목록 초기화 및 모달 닫기
            setAddMemberListState([]);
            setSearchInputState("");
            setSearchError("");
        } catch (error) {
            console.error("Error inviting members:", error);
            alert("멤버 초대 중 오류가 발생했습니다.");
        }
    }

    // 멤버 role 변경 핸들러
    const handleMemberRoleChangeInList = async (email: string, newRole: TeamSpaceRole) => {
        console.log("Change role for email:", email, "to:", newRole);

        try {
            const res = await SpaceAPI.patchSpaceParticipantRole(spaceId!, {
                email: email,
                role: newRole
            });
            console.log("Role change res:", res?.message);

            // 멤버 목록 업데이트 - API 재호출하여 최신 데이터 가져오기
            const updateRes = await SpaceAPI.getSpaceParticipants(spaceId!);
            const participants = updateRes.participants;
            const owner = participants.find(participant => participant.nickname === userNickname) || null;
            if (owner) {
                participants.splice(participants.indexOf(owner), 1); // 소유자 제외
            }

            setMemberListState(participants);
        } catch (error) {
            console.error("Error changing member role:", error);
            alert("권한 변경에 실패했습니다.");
        }
    };

    // 멤버 삭제 핸들러
    const handleDeleteMember = async (participantId: number) => {
        console.log("Delete member with participantId:", participantId);

        const res = await SpaceAPI.deleteSpaceParticipant(spaceId!, participantId);
        console.log("Delete res:", res);

        // 멤버 목록 업데이트
        const updateRes = await SpaceAPI.getSpaceParticipants(spaceId!);
        const participants = updateRes.participants;
        const owner = participants.find(participant => participant.nickname === userNickname) || null;
        if (owner) {
        participants.splice(participants.indexOf(owner), 1); // 소유자 제외
        }

        setMemberListState(participants);
    };


    return(
        <>
            {/* 오버레이 - 바깥쪽 클릭 감지 */}
            <div
                className="fixed inset-0 bg-black/30 z-10"
                onClick={handleModalClose}
            />

            {/* 모달 */}
            <div className="absolute w-100 h-[600px] z-20 top-8 right-8 bg-white rounded-md shadow-md text-black flex flex-col">
                {/* 헤더 - 고정 */}
                <div className="py-4 px-4 border-b border-gray-200">
                    <TeamSpaceInsertionModalTabs
                        modalTabState={modalTabState}
                        setModalTabState={setModalTabState}
                        canInvite={canInvite}
                        canEdit={canEdit}
                        canDelete={canDelete}
                    />
                </div>

                {/* 컨텐츠 영역 - 스크롤 가능 */}
                <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
                    <h2 className={`font-semibold text-2xl ${modalTabState === "삭제" ? "text-red-500" : ""}`}>{modalTabState}</h2>

                {modalTabState === "멤버" ? (
                    <div className="flex flex-col gap-4 h-full">
                        <span className="text-sm text-gray-500">나의 권한</span>
                        <TeamSpaceMemberItem
                            member={ownerMemberState!}
                            index={-1}
                            currentUserEmail={user?.email}
                        />
                        <span className="border-b border-gray-300 w-full"></span>
                        <div className="flex-1 overflow-y-auto">
                            <TeamSpaceMemberList
                                memberListState={memberListState}
                                currentUserEmail={user?.email}
                                onDelete={handleDeleteMember}
                                onRoleChange={handleMemberRoleChangeInList}
                                canManageMembers={isOwner}
                            />
                        </div>
                    </div>
                ) : modalTabState === "초대" ? (
                    <div className="flex flex-col gap-4 h-full">
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

                        <div className="flex-1 overflow-y-auto">
                            {addMemberListState && addMemberListState.length > 0 ? (
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm text-gray-500">초대 대상 ({addMemberListState.length}명)</p>
                                    <ul className="flex flex-col gap-1">
                                        {addMemberListState.map((member) => (
                                            <SpaceAddMemberItem
                                                key={member.email}
                                                member={member}
                                                isMinusButton={true}
                                                showRoleDropdown={true}
                                                onRoleChange={handleMemberRoleChange}
                                                onRemove={handleRemoveMember}
                                            />
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full gap-3">
                                    <svg
                                        className="w-14 h-14 text-gray-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                    <div className="text-center">
                                        <p className="text-gray-600 font-medium mb-1">초대할 멤버를 추가하세요</p>
                                        <p className="text-gray-400 text-sm">이메일을 입력하고 Enter를 누르세요</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-row justify-center gap-8 py-2 w-full">
                            <button
                                type="button"
                                className="bg-gray-200 px-6 py-2 rounded-md hover:bg-gray-300"
                                onClick={handleModalClose}
                            >
                                취소하기
                            </button>
                            <button
                                type="button"
                                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/80 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                onClick={handleInviteTeamMembers}
                                disabled={addMemberListState.length === 0}
                            >
                                초대하기
                            </button>
                        </div>
                    </div>
                ) : modalTabState === "수정" ? (
                    <div className="flex flex-col gap-4 h-full">
                        {/* 커버 이미지 섹션 */}
                        <ImageChoiceButton setSpaceImageState={setEditSpaceImageState} />

                        {/* 팀 스페이스 이름 섹션 */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">
                                팀 스페이스 이름
                            </label>
                            <input
                                type="text"
                                value={editSpaceNameState}
                                onChange={(e) => setEditSpaceNameState(e.target.value)}
                                placeholder="팀 스페이스 이름을 입력하세요"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                            />
                        </div>

                        {/* 버튼을 하단에 고정하기 위한 spacer */}
                        <div className="flex-1"></div>

                        {/* 버튼 섹션 */}
                        <div className="flex flex-row justify-center gap-8 py-2 w-full">
                            <button
                                type="button"
                                className="bg-gray-200 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
                                onClick={handleModalClose}
                            >
                                취소하기
                            </button>
                            <button
                                type="button"
                                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/80 transition-colors"
                                onClick={() => {
                                    handleInsertionTeam();
                                    handleModalClose();
                                }}
                            >
                                저장하기
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* 삭제 탭 */}
                        <div className="flex flex-col gap-4 h-full">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <p className="text-red-700 text-sm font-medium mb-2">⚠️ 경고</p>
                                <p className="text-red-600 text-sm">
                                    팀 스페이스를 삭제하면 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
                                </p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">
                                    다음 문구를 정확히 입력해주세요:
                                </label>
                                <div className="bg-gray-100 px-3 py-2 rounded-md">
                                    <code className="text-sm font-mono text-gray-800">{deleteConfirmText}</code>
                                </div>
                            </div>

                            <input
                                type="text"
                                value={deleteInputState}
                                onChange={(e) => setDeleteInputState(e.target.value)}
                                placeholder="위 문구를 정확히 입력하세요"
                                className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 transition-all
                                    ${isDeleteValid
                                        ? 'border-red-500 focus:ring-red-500 bg-red-50'
                                        : 'border-gray-300 focus:ring-gray-400'
                                    }`}
                            />

                            {/* 버튼을 하단에 고정하기 위한 spacer */}
                            <div className="flex-1"></div>

                            <div className="flex flex-row justify-center gap-8 py-2 w-full">
                                <button
                                    type="button"
                                    onClick={handleModalClose}
                                    className="bg-gray-200 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
                                >
                                    취소하기
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDeleteTeam}
                                    disabled={!isDeleteValid}
                                    className={`px-6 py-2 rounded-md font-medium transition-all
                                        ${isDeleteValid
                                            ? 'bg-red-500 text-white hover:bg-red-600 active:scale-95'
                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    삭제하기
                                </button>
                            </div>
                        </div>
                    </>
                )}
                </div>
            </div>
        </>
    )
}