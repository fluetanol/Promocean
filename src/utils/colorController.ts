/**
 * 색상 코드를 프론트에서 백엔드로 받아들일 수 있는 형태로 변환합니다.
 * 
 * @example #abcdef -> abcdef
 * 
 * @param color 변환할 색상값
 * @returns  변환된 색상값 
 */
export function colorCodeFrontToBack(color: string) :string{
    return   color.replace('#', '');
}


/**
 * 색상 코드를 백엔드에서 프론트엔드로 사용 가능한 형태로 변환합니다.
 * 
 * @example abcdef -> #abcdef
 * 
 * @param color 변환할 색상값
 * @returns 변환된 색상값
 */
export function colorCodeBackToFront(color: string) :string{
    return `#${color}`;
}

