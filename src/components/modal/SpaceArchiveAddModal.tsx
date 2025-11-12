import { useEffect, useState } from "react"
import { HexColorPicker } from "react-colorful";
import ColorPickerModal from "./ColorPickerModal";
import { SpaceArchiveData } from "@/app/my-space/page";
import { useAuthStore } from "@/store/authStore";
import SpaceAPI, { PostMySpaceArchiveFolderRequest } from "@/api/space";
import { Space } from "lucide-react";
import { colorCodeBackToFront } from "@/utils/colorController";


export interface SpaceArchiveAddModalProps{
    isOpen : boolean,
    spaceId : number,
    onCloseAddModal : () => void
    archiveItemListState: SpaceArchiveData[];
    setArchiveItemListState: (newState: SpaceArchiveData[]) => void;
}

export default function SpaceArchiveAddModal({ isOpen, spaceId, onCloseAddModal, archiveItemListState, setArchiveItemListState }: SpaceArchiveAddModalProps) {
    
    const [selectedColorState, setSelectedColorState] = useState("#000000")
    const [showColorPickerState, setShowColorPickerState] = useState(false);
    const [titleState, setTitleState] = useState("");
    const [titleErrorState, setTitleErrorState] = useState(false);
    const [descriptionState, setDescriptionState] = useState("");


    const onToggleColorPicker = () => {
        setShowColorPickerState(!showColorPickerState);
    }

    const onCloseColorPicker = () => {
        setShowColorPickerState(false);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if(titleState.trim() === ""){
            setTitleErrorState(true);
            return;
        }

        const req : PostMySpaceArchiveFolderRequest={
            name : titleState,
            color : selectedColorState.replace("#","")
        }
        console.log("Request Data:", req);

        
        const res = await SpaceAPI.postMySpaceArchiveFolderData(spaceId, req);
        if(!res){
            console.error("Failed to add new archive folder");
                return;
            }
            else{
                console.log("Successfully added new archive folder:", res);
            }
            
            console.log("Response Datazz:", res);
            
        const newArchiveData : SpaceArchiveData = {
            folderId : res.folderId, // 임시 ID, 실제로는 백엔드에서 받아와야 함
            name: res.name,
            color: colorCodeBackToFront(res.color),
            isPinned: res.isPinned
            };

        setArchiveItemListState([...archiveItemListState, newArchiveData]);

        // setArchiveItemListState([]);
        // 추가 후 모달 닫기 및 상태 초기화
        setTitleState("");
        setDescriptionState("");
        setSelectedColorState("#000000");
        setTitleErrorState(false);
        onCloseAddModal();
    }

    return (
        <div
            className={`fixed flex inset-0 z-10 w-full h-full bg-black/40 backdrop-blur-xs justify-center items-center
                transition-opacity duration-300 ease-out
                ${isOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={onCloseAddModal}
        >
            <form
                onSubmit={handleSubmit}
                className={`flex flex-col bg-background w-[540px] h-[650px] rounded-2xl p-10 gap-5 shadow-xl
                    transition-all duration-300 ease-out
                    ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <h1 className="text-[2.5rem] font-semibold">카테고리 추가</h1>

                {/* 배경색 영역 */}
                <div className="flex flex-row w-full h-[146px] p-2.5 bg-white justify-between rounded-xl shadow-inner">
                    <div 
                        className="flex w-[304px] rounded-lg justify-center items-center text-2xl font-medium"
                        style={{backgroundColor:selectedColorState}}
                    >
                        {selectedColorState}
                    </div>

                    <div className="flex flex-col w-[136px] px-2 py-2.5 justify-center gap-y-2.5">
                        {/* 사진 버튼 */}
                        <button
                            type="button"
                            className="flex flex-row w-full px-3 py-2.5 rounded-4xl border-2 border-primary gap-1 
                              transition-all duration-200 hover:bg-primary/10 active:scale-95 active:brightness-95"
                        >
                            <div className="w-8 h-8 bg-primary rounded-lg"></div>
                            <div className="flex flex-1 text-[0.75rem] font-semibold justify-center items-center">
                                사진
                            </div>
                        </button>

                        {/* 컬러 팔레트 버튼 */}
                        <button
                            type="button"
                            className="flex flex-row w-full px-3 py-2.5 rounded-4xl border-2 border-primary gap-1 
                              transition-all duration-200 hover:bg-primary-content/10 active:scale-95 active:brightness-95"
                            onClick={onToggleColorPicker}
                        >
                            <div 
                                className={`w-8 h-8 rounded-lg`}
                                style = {{backgroundColor : selectedColorState}}
                            ></div>
                            <div className="flex flex-1 text-[0.75rem] font-semibold justify-center items-center">
                                컬러 팔레트
                            </div>
                        </button>
                    </div>
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
                <div>
                    <input
                        type="text"
                        placeholder="제목을 입력하세요"
                        className={`flex w-full h-12 shadow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all
                            ${titleErrorState ? 'border-red-500' : 'border-gray-300'}`}
                        value={titleState}
                        onChange={(e) => {
                            setTitleState(e.target.value);
                            if(titleErrorState) setTitleErrorState(false);
                        }}
                    />
                    {titleErrorState && (
                        <p className="text-red-500 text-sm mt-1">제목을 입력해주세요</p>
                    )}
                </div>

                <textarea
                    placeholder="카테고리 설명을 적어주세요"
                    className="flex w-full h-full shadow p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    value={descriptionState}
                    onChange={(e) => setDescriptionState(e.target.value)}
                />

                {/* 하단 버튼 영역 */}
                <div className="flex flex-row py-2 justify-center gap-8">
                    {/* 취소 버튼 */}
                    <button
                        type="button"
                        className="flex px-5 py-3 bg-gray-300 w-40 justify-center rounded-4xl 
                            hover:bg-gray-400 active:scale-95 transition-all duration-150"
                        onClick={onCloseAddModal}
                    >
                        취소
                    </button>

                    {/* 제출 버튼 */}
                    <input
                        type="submit"
                        value="추가"
                        className="flex px-5 py-3 bg-primary text-background w-40 justify-center rounded-4xl
                            cursor-pointer transition-all duration-150 hover:bg-primary/80 active:scale-95"
                    />
                </div>
            </form>
        </div>
    );
}