import TrashDeleteIcon from "../icon/TrashDeleteIcon";

export interface AlarmModalHeaderProps {
    handleRemoveClick: () => void;
}


export default function AlarmModalHeader(
{
    handleRemoveClick,
}: AlarmModalHeaderProps

) {

    return(
        <div className ="flex justify-between items-center">
                    <h2 className ="text-xl py-3"> 알림함 </h2>
                     <button className = "hover:bg-gray-200 w-8 h-8 rounded-sm flex justify-center items-center"
                     onClick={handleRemoveClick}>
                        <TrashDeleteIcon className="size-5"/>
                    </button> 
        </div>
    )
}