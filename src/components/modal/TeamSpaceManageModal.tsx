import { useState } from "react";
import { useRouter } from "next/navigation";
import TeamSpaceInsertionModalTabs from "../filter/TeamSpaceInsertionModalTabs";
import SpaceAddMemberItem from "../item/SpaceAddMemberItem";
import TeamSpaceRoleItem from "../item/TeamSpaceRoleItem";
import TeamSpaceRoleList from "../list/TeamSpaceRoleList";
import ImageChoiceButton from "../button/ImageChoiceButton";
import SpaceAPI from "@/api/space";
import { UploadAPI } from "@/api/upload";

export interface TeamSpacePageProps {
    spaceId? : number;
    isModalOpenState: boolean;
    handleModalClose: () => void;
    modalTabState: "권한" | "초대" | "수정" | "삭제";
    setModalTabState: (tab: "권한" | "초대" | "수정" | "삭제") => void;
    memberListState: string[];
    setMemberListState: (members: string[]) => void;
    teamName?: string;

}



export default function TeamSpaceManageModal( { spaceId, isModalOpenState, handleModalClose, modalTabState, setModalTabState, memberListState, setMemberListState, teamName = "팀 스페이스"}: TeamSpacePageProps) {
    console.log("spaceId in TeamSpaceManageModal:", spaceId);
    const router = useRouter();
    const [addMemberListState, setAddMemberListState] = useState<string[]>([
        "정태승",
        "김민수",
        "이수진",
        "박영희",
        "최지훈",
    ]);

    // 수정 탭 state
    const [editSpaceImageState, setEditSpaceImageState] = useState<File | null>(null);
    const [editSpaceNameState, setEditSpaceNameState] = useState(teamName);

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
        console.log("s3Res ", s3res);

        const presignedUrl = s3res?.presignedUrl;
        const key = s3res?.key;

        if(s3res && editSpaceImageState) {

            const uploadS3Res = await UploadAPI.uploadImageToS3({
                presignedUrl : presignedUrl!,
                file : editSpaceImageState
            });

            // console.log("Upload S3 Res ", uploadS3Res);

            const patchRes = await SpaceAPI.patchTeamSpace(spaceId!, {
                name: editSpaceNameState,
                spaceCoverPath : key!
            });

            console.log("Patch Res ", patchRes);

            alert(`${teamName}이 수정되었습니다`);

            handleModalClose();
        }
        else{
            console.log("No image to upload, just update name");
            handleModalClose();
        }

    }


    return(
        <>
            {/* 오버레이 - 바깥쪽 클릭 감지 */}
            <div
                className="fixed inset-0 bg-black/30 z-10"
                onClick={handleModalClose}
            />

            {/* 모달 */}
            <div className="absolute w-100 max-h-[90vh] z-20 top-8 right-8 bg-white rounded-md shadow-md text-black flex flex-col">
                <div className="py-4 px-4 border-b border-gray-200">
                    <TeamSpaceInsertionModalTabs
                        modalTabState={modalTabState}
                        setModalTabState={setModalTabState}/>
                </div>

                <div className="flex-1 overflow-y-auto py-4 px-4 flex flex-col gap-4">

                <h2 className = {`font-semibold text-2xl ${modalTabState === "삭제" ? "text-red-500" : ""}`}>{modalTabState}</h2>

                {modalTabState === "권한" ? (
                    <>
                        <span className = "text-sm text-gray-500">나의 권한</span>
                        <TeamSpaceRoleItem member="정태승" index={-1}/>
                        <span className = "border-b border-gray-300 w-full"></span>
                        <TeamSpaceRoleList memberListState={memberListState}/>
                    </>
                ) : modalTabState === "초대" ? (
                    <>
                        <input type="text"
                                placeholder="초대할 멤버의 닉네임 또는 이메일을 입력하세요."
                                className = "w-full border border-gray-300 rounded-[10px] px-4 py-2"
                                onChange={(e) => {}}
                            />
                        <ul className = "flex flex-col gap-1 max-h-56 overflow-y-scroll">
                            {addMemberListState.map((memberName, index) => (
                                <SpaceAddMemberItem
                                    key={index}
                                    name={memberName}
                                    email={`${memberName.toLowerCase()}@example.com`}/>
                            ))}
                        </ul>

                        <div className="flex flex-row justify-center gap-8 py-2 w-full">
                            <button type="button" className="bg-gray-200 px-4 py-2  rounded-md
                            hover:bg-gray-300" onClick={handleModalClose}>취소하기</button>
                            <button type="submit" className ="bg-primary text-white px-4 py-2 rounded-md
                            hover:bg-primary/80">초대하기</button>
                        </div>

                    </>
                ) : modalTabState === "수정" ? (
                    <>
                        {/* 수정 탭 */}
                        <div className="flex flex-col gap-6">
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

                            {/* 버튼 섹션 */}
                            <div className="flex flex-row justify-center gap-4 py-2 w-full">
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
                                        // TODO: API 호출하여 팀 스페이스 정보 업데이트
                                        // console.log("Team space update:", {
                                        //     spaceId,
                                        //     name: editSpaceNameState,
                                        //     image: null
                                        // });
                                        handleInsertionTeam();
                                        handleModalClose();
                                    }}
                                >
                                    저장하기
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {/* 삭제 탭 */}
                        <div className="flex flex-col gap-4">
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

                            <div className="flex flex-col gap-2 mt-4">
                                <button
                                    type="button"
                                    onClick={handleDeleteTeam}
                                    disabled={!isDeleteValid}
                                    className={`w-full px-4 py-3 rounded-lg font-medium transition-all
                                        ${isDeleteValid
                                            ? 'bg-red-500 text-white hover:bg-red-600 active:scale-95'
                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    팀 스페이스 삭제
                                </button>
                                <button
                                    type="button"
                                    onClick={handleModalClose}
                                    className="w-full px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    취소
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