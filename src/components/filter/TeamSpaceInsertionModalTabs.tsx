
export interface TeamSpaceInsertionModalTabsProps {
    modalTabState: "멤버" | "초대" | "수정" | "삭제";
    setModalTabState: (tab: "멤버" | "초대" | "수정" | "삭제") => void;
    canInvite?: boolean;
    canEdit?: boolean;
    canDelete?: boolean;
}



export default function TeamSpaceInsertionModalTabs({modalTabState, setModalTabState, canInvite = true, canEdit = true, canDelete = true}: TeamSpaceInsertionModalTabsProps){

return(
              <div className = "flex flex-col relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-300 ">
                  <div className = "flex flex-row gap-2 [&>button:hover]:bg-gray-200 [&>button]:rounded-md">
                    <button className = {` ${modalTabState === "멤버" ? "text-primary" : "text-gray-500"} p-2`}
                      onClick={() => setModalTabState("멤버")}
                    > 멤버 </button>
                    {canInvite && (
                      <button className = {` ${modalTabState === "초대" ? "text-primary" : "text-gray-500"} p-2`}
                        onClick={() => setModalTabState("초대")}
                      > 초대 </button>
                    )}
                    {canEdit && (
                      <button className = {` ${modalTabState === "수정" ? "text-primary" : "text-gray-500"} p-2`}
                        onClick={() => setModalTabState("수정")}
                      > 수정 </button>
                    )}
                    {canDelete && (
                      <button className = {` ${modalTabState === "삭제" ? "text-red-500" : "text-gray-500"} p-2`}
                        onClick={() => setModalTabState("삭제")}
                      > 삭제 </button>
                    )}
                  </div>
                  <span className={`absolute w-10 h-1 ${modalTabState === "삭제" ? "bg-red-500" : "bg-primary"} bottom-0
                  ${modalTabState === "멤버" ? "left-0.5" : modalTabState === "초대" ? "left-13.5" : modalTabState === "수정" ? "left-26.5" : "left-39.5"} transition-all duration-300 ease-in-out`}> </span>
                </div>
            )

}