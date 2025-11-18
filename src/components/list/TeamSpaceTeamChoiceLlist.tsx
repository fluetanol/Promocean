import TeamSpaceTeamChoiceItem, { TeamSpaceChoiceItemProps } from "../item/TeamSpaceTeamChoiceItem"


export interface TeamSpaceTeamChoiceListProps {
    teamSpaceTeamChoiceList : TeamSpaceChoiceItemProps[]
}


export default function TeamSpaceTeamChoiceList({teamSpaceTeamChoiceList} : TeamSpaceTeamChoiceListProps){
    // console.log("팀 스페이스 리스트 in list ", teamSpaceTeamChoiceList);

    // OWNER와 나머지로 분류
    const ownedSpaces = teamSpaceTeamChoiceList.filter(item => item.userRole === "OWNER");
    const invitedSpaces = teamSpaceTeamChoiceList.filter(item => item.userRole !== "OWNER");

    return(
          <div className="px-5 flex flex-col gap-8">
            {/* 내 스페이스 섹션 */}
            {ownedSpaces.length > 0 && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-gray-800">내 스페이스</h2>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                    {ownedSpaces.length}
                  </span>
                </div>
                <div className="grid grid-cols-4 auto-rows-max gap-x-7 gap-y-10">
                  {ownedSpaces.map((item, index) => (
                    <TeamSpaceTeamChoiceItem
                      key={`owned-${index}`}
                      spaceCoverUrl={item.spaceCoverUrl}
                      name={item.name}
                      participantCnt={item.participantCnt}
                      spaceId={item.spaceId}
                      userRole={item.userRole}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 초대된 스페이스 섹션 */}
            {invitedSpaces.length > 0 && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-gray-800">초대된 스페이스</h2>
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 text-sm font-semibold rounded-full">
                    {invitedSpaces.length}
                  </span>
                </div>
                <div className="grid grid-cols-4 auto-rows-max gap-x-7 gap-y-10">
                  {invitedSpaces.map((item, index) => (
                    <TeamSpaceTeamChoiceItem
                      key={`invited-${index}`}
                      spaceCoverUrl={item.spaceCoverUrl}
                      name={item.name}
                      participantCnt={item.participantCnt}
                      spaceId={item.spaceId}
                      userRole={item.userRole}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

    )
}