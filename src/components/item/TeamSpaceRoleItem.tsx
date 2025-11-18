import { SpaceParticipants } from "@/api/space";
import { ChangeSpaceRoleToValue } from "@/enum/TeamSpaceRole";
import Image from "next/image";
import { TeamSpaceRole } from "@/enum/TeamSpaceRole";

export interface TeamSpaceRoleItemProps {
    member: SpaceParticipants;
    index: number;
}



export default function TeamSpaceRoleItem({ member, index }: TeamSpaceRoleItemProps){

    console.log("Rendering TeamSpaceRoleItem for member:", member.role);
    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // Handle role change logic here
        console.log(`멤버 ${member.nickname}의 역할이 ${event.target.value}로 변경되었습니다.`);
    };

    return(
            <li key={index} className ="flex flex-row justify-between px-2 py-2">

                <div className ="flex flex-row items-center ">
                <Image
                    src={member.profileUrl || "/default-profile.png"}
                    alt="프로필 이미지"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                />

                <div className="flex flex-col">
                    <div>{member.nickname}</div>
                    <div className="text-sm text-gray-500">{member.email}</div>
                </div>
                </div>

                <select name="" id="" 
                value ={ChangeSpaceRoleToValue(member.role)}
                onChange={handleRoleChange}
                className ="hover:bg-gray-200 p-1 border-gray-200
                outline-none
                rounded-md">
                    <option value={TeamSpaceRole.READER}>읽기 허용</option>
                    <option value={TeamSpaceRole.EDITOR}>편집 허용</option>
                    <option value={TeamSpaceRole.OWNER}>소유자</option>
                </select>
            </li>
    )
}