

/**
 * SpaceCardHeader Props Interface
 * @interface SpaceCardHeaderProps
 * title : 카드의 제목입니다.
 * @type {string}
 */
export interface SpaceCardHeaderProps {
    title: string;
}


/**
 * SpaceCardHeader 컴포넌트
 * @param param0 SpaceCardHeaderProps 의 분해 할당
 * @returns     {React.ReactNode}
 * 마이 스페이스 및 팀 스페이스에서 아카이브 섹션의 카드 리스트 헤더 컴포넌트입니다.
 * 
 * @example
 * <SpaceCardHeader title="Pinned"/>
 */
export default function SpaceCardHeader({ title }: SpaceCardHeaderProps){
    return(
          <div className="
            text-3xl
            text-(-text-color)
            font-medium 
            leading-[58px]
            border-b-2
            border-gray-600
            w-full
            px-[13px]
          ">
            {title}
          </div>
    )

}