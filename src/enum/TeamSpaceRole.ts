export enum TeamSpaceRole {
    READER = 10,
    EDITOR = 20,
    OWNER = 30
}

export type SpaceRole = keyof typeof TeamSpaceRole

export const ChangeSpaceRoleToValue = (role: SpaceRole | string): number => {
    return TeamSpaceRole[role as SpaceRole];
}

/**
 * TeamSpaceRole을 한글로 변환하는 함수
 * API에서는 문자열("READER", "EDITOR", "OWNER")로 반환되므로 문자열을 우선 처리합니다.
 */
export const TeamSpaceRoleToKorean = (role: "READER" | "EDITOR" | "OWNER" | TeamSpaceRole | SpaceRole | number | string): string => {
    // 문자열로 전달된 경우 (API 응답)
    if (typeof role === 'string') {
        switch (role) {
            case 'READER':
                return '읽기 전용';
            case 'EDITOR':
                return '편집자';
            case 'OWNER':
                return '소유자';
            default:
                return '알 수 없음';
        }
    }

    // enum 값(숫자)으로 전달된 경우
    if (typeof role === 'number') {
        switch (role) {
            case TeamSpaceRole.READER:
                return '읽기 전용';
            case TeamSpaceRole.EDITOR:
                return '편집자';
            case TeamSpaceRole.OWNER:
                return '소유자';
            default:
                return '알 수 없음';
        }
    }

    return '알 수 없음';
}