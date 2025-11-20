import { useState } from "react";
import ColorPickerModal from "./ColorPickerModal";
import { SpaceArchiveData } from "@/app/my-space/page";

export interface SpaceArchiveEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentTitle: string;
    currentBgColor: string;
    onSave: (newTitle: string, newBgColor: string) => void;
}

export default function SpaceArchiveEditModal({
    isOpen,
    onClose,
    currentTitle,
    currentBgColor,
    onSave
}: SpaceArchiveEditModalProps) {

    const [selectedColorState, setSelectedColorState] = useState(currentBgColor);
    const [showColorPickerState, setShowColorPickerState] = useState(false);
    const [titleState, setTitleState] = useState(currentTitle);
    const [titleErrorState, setTitleErrorState] = useState(false);

    const onToggleColorPicker = () => {
        setShowColorPickerState(!showColorPickerState);
    }

    const onCloseColorPicker = () => {
        setShowColorPickerState(false);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (titleState.trim() === "") {
            setTitleErrorState(true);
            return;
        }

        // 수정된 내용 저장
        onSave(titleState, selectedColorState);

        // 모달 닫기
        onClose();
    }

    return (
        <div
            className={`fixed flex inset-0 z-50 w-full h-full bg-black/40 backdrop-blur-xs justify-center items-center
                transition-opacity duration-300 ease-out
                ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={onClose}
        >
            <form
                onSubmit={handleSubmit}
                className={`flex flex-col bg-background w-[540px] rounded-2xl p-10 gap-6 shadow-xl
                    transition-all duration-300 ease-out
                    ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <h1 className="text-3xl font-bold">아카이브 폴더 수정</h1>

                {/* 배경색 영역 */}
                <div className="flex flex-col w-full gap-4">
                    {/* 색상 미리보기 */}
                    <div className="flex w-full h-32 rounded-xl shadow-md justify-center items-center">
                        <div
                            className="flex w-full h-full rounded-xl justify-center items-center text-2xl font-medium shadow-inner"
                            style={{ backgroundColor: selectedColorState }}
                        >
                            {selectedColorState}
                        </div>
                    </div>

                    {/* 컬러 팔레트 버튼 */}
                    <button
                        type="button"
                        className="flex flex-row w-full px-4 py-3 rounded-lg border-2 border-primary gap-3 justify-center items-center
                          transition-all duration-200 hover:bg-primary/10 active:scale-95"
                        onClick={onToggleColorPicker}
                    >
                        <div
                            className="w-6 h-6 rounded-md shadow-sm"
                            style={{ backgroundColor: selectedColorState }}
                        ></div>
                        <span className="text-sm font-semibold">컬러 팔레트 열기</span>
                    </button>
                </div>

                {/* 컬러 피커 팝업 */}
                {showColorPickerState && (
                    <ColorPickerModal
                        onCloseColorPicker={onCloseColorPicker}
                        parentSelectedColorState={selectedColorState}
                        parentSetSelectedColorState={setSelectedColorState}
                    />
                )}

                {/* 입력창 */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">폴더 이름</label>
                    <input
                        type="text"
                        placeholder="폴더 이름을 입력하세요"
                        className={`flex w-full h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all
                            ${titleErrorState ? 'border-red-500' : 'border-gray-300'}`}
                        value={titleState}
                        onChange={(e) => {
                            setTitleState(e.target.value);
                            if (titleErrorState) setTitleErrorState(false);
                        }}
                    />
                    {titleErrorState && (
                        <p className="text-red-500 text-sm">폴더 이름을 입력해주세요</p>
                    )}
                </div>

                {/* 하단 버튼 영역 */}
                <div className="flex flex-row justify-end gap-3 mt-2">
                    {/* 취소 버튼 */}
                    <button
                        type="button"
                        className="px-6 py-2.5 bg-gray-200 text-gray-700 font-medium rounded-lg
                            hover:bg-gray-300 active:scale-95 transition-all duration-150"
                        onClick={onClose}
                    >
                        취소
                    </button>

                    {/* 제출 버튼 */}
                    <input
                        type="submit"
                        value="수정"
                        className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg
                            cursor-pointer transition-all duration-150 hover:bg-primary/90 active:scale-95"
                    />
                </div>
            </form>
        </div>
    );
}
