import { useState } from "react";
import { HexColorPicker } from "react-colorful"


export interface ColorPickerModalProps{
    parentSelectedColorState : string,
    parentSetSelectedColorState : (selectState:string) => void
    onCloseColorPicker : ()=>void

}



export default function ColorPickerModal({
    parentSelectedColorState,
    parentSetSelectedColorState,
    onCloseColorPicker
}:ColorPickerModalProps){

    const [selectedColorState, setSelectedColorState] = useState("#000000");

    return(
         <div 
            className="fixed inset-0 z-20 flex justify-center items-center bg-black/20"
            onClick={onCloseColorPicker}
        >
            <div 
                className="bg-white p-5 rounded-xl shadow-2xl transition-all duration-200 ease-out"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">색상 선택</h3>
                    
                
                    {/* react-colorful 컬러 피커 */}
                    
                    <HexColorPicker 
                        color={selectedColorState} 
                        onChange={setSelectedColorState}
                    />

                    {/* 선택된 색상 표시 */}
                    <div className="flex flex-row items-center gap-2">
                        <div 
                            className="w-12 h-12 rounded-lg border-2 border-gray-300"
                            style={{ backgroundColor: selectedColorState }}
                        ></div>
                        <input
                            type="text"
                            value={selectedColorState}
                            onChange={(e) => setSelectedColorState(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg 
                                        focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    {/* 확인 버튼 */}
                    <button
                        className="w-full px-4 py-2 bg-primary text-white rounded-lg
                                    hover:bg-primary/80 active:scale-95 transition-all"
                        onClick={()=>{
                               parentSetSelectedColorState(selectedColorState)
                               onCloseColorPicker();
                        }
                    
                        }
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    )
}