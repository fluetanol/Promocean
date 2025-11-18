import XCircle from "../icon/XCircle";
import { AlarmItemProps } from "../item/AlarmItem";


export interface AlarmModalSmallHeaderProps {

    isRemoveModeState: boolean;
    selectedAlarms: Set<number>;
    alarmListState: AlarmItemProps[];
    handleRemoveAllClick: () => void;
    handleDeleteClick: () => void;
}


export default function AlarmModalSmallHeader({
    isRemoveModeState,
    selectedAlarms,
    alarmListState,
    handleRemoveAllClick,
    handleDeleteClick
}: AlarmModalSmallHeaderProps) {
    return(
        <div  className = "flex justify-between items-center pb-2">
                        <h3 className='text-sm pb-4'> 알림 내용 </h3>
                        {  isRemoveModeState &&
                        <div className = "flex gap-4 justify-center items-center">
                        <button onClick={handleRemoveAllClick} className="text-sm text-red-500 hover:text-red-700
                        active:text-red-900 flex items-center">
                            {selectedAlarms.size === alarmListState.length ? '전체 해제' : '전체 선택'}
                        </button>

                        <button
                            onClick={handleDeleteClick}
                            className="w-8 h-8 flex justify-center items-center"
                            disabled={selectedAlarms.size === 0}
                        >
                            <XCircle className={`size-6 ${
                                selectedAlarms.size === 0
                                    ? 'stroke-gray-300 cursor-not-allowed'
                                    : 'stroke-red-500 hover:stroke-red-700 active:stroke-red-900 cursor-pointer'
                            }`} />
                        </button>
        
                        </div>
                        }
        </div>
    )
}