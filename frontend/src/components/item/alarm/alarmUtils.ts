// 시간을 사용자 친화적으로 표시하는 함수
export function getRelativeTime(dateString: string): string {
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now.getTime() - past.getTime();

    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    // 1분 미만
    if (minutes < 1) return '방금 전';

    // n분 전 (60분 미만)
    if (minutes < 60) return `${minutes}분 전`;

    // n시간 전 (24시간 미만)
    if (hours < 24) return `${hours}시간 전`;

    // 날짜가 바뀌었지만 한 달 미만 - month/day 형식
    if (days < 30) {
        const month = past.getMonth() + 1;
        const day = past.getDate();
        return `${month}/${day}`;
    }

    // n달 전 (12개월 미만)
    if (months < 12) return `${months}달 전`;

    // n년 전
    return `${years}년 전`;
}

// 메시지 파싱 유틸리티
export function parseMessage(message: string) {
    const messageHeading = message.split('[')[0];
    const messageParts = message.match(/\[(.*?)\]/g)?.map(part => part.replace(/[\[\]]/g, '')) || [];

    return { messageHeading, messageParts };
}
