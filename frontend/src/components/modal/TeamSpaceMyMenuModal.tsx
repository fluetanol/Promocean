import { useState } from "react";
import SpaceAPI from "@/api/space";
import { useRouter } from "next/navigation";

export interface TeamSpaceMyMenuModalProps {
    spaceId?: number;
    isModalOpenState: boolean;
    handleModalClose: () => void;
    currentNickname: string;
    teamName?: string;
}

export default function TeamSpaceMyMenuModal({
    spaceId,
    isModalOpenState,
    handleModalClose,
    currentNickname,
    teamName = "팀 스페이스"
}: TeamSpaceMyMenuModalProps) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"nickname" | "leave">("nickname");

    // 별명 수정 state
    const [nicknameInput, setNicknameInput] = useState(currentNickname);

    // 탈퇴 state
    const [leaveConfirmInput, setLeaveConfirmInput] = useState("");
    const leaveConfirmText = `${teamName}에서 탈퇴하겠습니다`;
    const isLeaveValid = leaveConfirmInput === leaveConfirmText;

    // 별명 수정 핸들러
    const handleNicknameUpdate = async () => {
        if (!nicknameInput.trim()) {
            alert("별명을 입력해주세요.");
            return;
        }

        if (nicknameInput === currentNickname) {
            alert("현재 별명과 동일합니다.");
            return;
        }

        try {
            const res = await SpaceAPI.patchSpaceParticipantMyName(spaceId!, {
                nickname: nicknameInput.trim()
            });

            console.log("Nickname update res:", res?.message);
            alert("별명이 변경되었습니다.");
            handleModalClose();
            // 페이지 새로고침하여 변경사항 반영
            router.refresh();
        } catch (error) {
            console.error("Error updating nickname:", error);
            alert("별명 변경에 실패했습니다.");
        }
    };

    // 팀 스페이스 탈퇴 핸들러
    const handleLeaveTeamSpace = async () => {
        if (!isLeaveValid) {
            return;
        }

        try {
            const res = await SpaceAPI.deleteSpaceParticipantWithdrawal(spaceId!);
            console.log("Leave team res:", res);
            alert(`${teamName}에서 탈퇴하였습니다.`);
            handleModalClose();
            router.push('/team-space');
        } catch (error) {
            console.error("Error leaving team space:", error);
            alert("팀 스페이스 탈퇴에 실패했습니다.");
        }
    };

    return (
        <>
            {/* 오버레이 */}
            <div
                className="fixed inset-0 bg-black/30 z-10"
                onClick={handleModalClose}
            />

            {/* 모달 */}
            <div className="absolute w-96 z-20 top-8 right-8 bg-white rounded-md shadow-md text-black flex flex-col">
                {/* 헤더 */}
                <div className="py-4 px-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold">내 메뉴</h2>
                </div>

                {/* 탭 */}
                <div className="flex flex-row border-b border-gray-200">
                    <button
                        className={`flex-1 py-3 px-4 text-center transition-colors ${
                            activeTab === "nickname"
                                ? "text-primary border-b-2 border-primary font-medium"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                        onClick={() => setActiveTab("nickname")}
                    >
                        별명 수정
                    </button>
                    <button
                        className={`flex-1 py-3 px-4 text-center transition-colors ${
                            activeTab === "leave"
                                ? "text-red-500 border-b-2 border-red-500 font-medium"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                        onClick={() => setActiveTab("leave")}
                    >
                        팀 탈퇴
                    </button>
                </div>

                {/* 컨텐츠 */}
                <div className="px-4 py-6">
                    {activeTab === "nickname" ? (
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    팀 스페이스 내 별명
                                </label>
                                <input
                                    type="text"
                                    value={nicknameInput}
                                    onChange={(e) => setNicknameInput(e.target.value)}
                                    placeholder="별명을 입력하세요"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                    maxLength={20}
                                />
                                <p className="text-xs text-gray-400 mt-1">
                                    현재 별명: {currentNickname}
                                </p>
                            </div>

                            <div className="flex flex-row justify-center gap-3 pt-2">
                                <button
                                    type="button"
                                    className="bg-gray-200 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
                                    onClick={handleModalClose}
                                >
                                    취소
                                </button>
                                <button
                                    type="button"
                                    className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/80 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    onClick={handleNicknameUpdate}
                                    disabled={!nicknameInput.trim() || nicknameInput === currentNickname}
                                >
                                    저장
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <p className="text-red-700 text-sm font-medium mb-2">⚠️ 경고</p>
                                <p className="text-red-600 text-sm">
                                    팀 스페이스에서 탈퇴하면 더 이상 해당 팀의 데이터에 접근할 수 없습니다.
                                </p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">
                                    다음 문구를 정확히 입력해주세요:
                                </label>
                                <div className="bg-gray-100 px-3 py-2 rounded-md">
                                    <code className="text-sm font-mono text-gray-800">
                                        {leaveConfirmText}
                                    </code>
                                </div>
                            </div>

                            <input
                                type="text"
                                value={leaveConfirmInput}
                                onChange={(e) => setLeaveConfirmInput(e.target.value)}
                                placeholder="위 문구를 정확히 입력하세요"
                                className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 transition-all
                                    ${isLeaveValid
                                        ? 'border-red-500 focus:ring-red-500 bg-red-50'
                                        : 'border-gray-300 focus:ring-gray-400'
                                    }`}
                            />

                            <div className="flex flex-row justify-center gap-3 pt-2">
                                <button
                                    type="button"
                                    className="bg-gray-200 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
                                    onClick={handleModalClose}
                                >
                                    취소
                                </button>
                                <button
                                    type="button"
                                    onClick={handleLeaveTeamSpace}
                                    disabled={!isLeaveValid}
                                    className={`px-6 py-2 rounded-md font-medium transition-all
                                        ${isLeaveValid
                                            ? 'bg-red-500 text-white hover:bg-red-600 active:scale-95'
                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    탈퇴하기
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
