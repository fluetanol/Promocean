'use client';

import PlusCircle from "../icon/PlusCircle";


/**
 * TeamSpaceAddButtonProps 인터페이스
 * @interface TeamSpaceAddButtonProps
 * @property {boolean} isModalRef - 모달 열림 상태
 * @property {(value: boolean) => void} [setIsModalRef] - 모달 열림 상태 변경 함수
 */
export interface TeamSpaceAddButtonProps {
    isModalRef: boolean;
    setIsModalRef?: (value: boolean) => void;
}   


/**
 * 팀 생성 버튼 컴포넌트
 * @param param0 - TeamSpaceAddButtonProps
 * 
 * @property isModalRef: boolean - 모달 열림 상태
 * @property setIsModalRef?: (value: boolean) => void - 모달 열림 상태 변경 함수
 * @return JSX.Element - 팀 생성 버튼 컴포넌트
 * 
 */
export default function TeamSpaceAddButton(
    { isModalRef, setIsModalRef }: TeamSpaceAddButtonProps
) {

    const handleClick = () => {
        if (setIsModalRef) {
            setIsModalRef(!isModalRef);
        }
    };

    return (
        <button className="flex flex-row gap-1 font-medium text-2xl hover:text-primary transition-colors"
            onClick={handleClick}
        >
            <PlusCircle/>
            팀 생성
        </button>
    );
}
