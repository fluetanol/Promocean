// frontend/src/utils/formatDate.ts

/**
 * 문자열을 안전하게 Date 객체로 변환
 */
export function parseDate(dateStr?: string): Date | null {
  if (!dateStr) return null;

  // T가 없는 경우 (ex. 2025-10-28)
  if (!dateStr.includes("T")) {
    dateStr = `${dateStr}T00:00:00`;
  }

  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? null : date;
}

/**
 * YYYY년 MM월 DD일 형식 (날짜만)
 * ex) 2025년 10월 28일
 */
export function formatKoreanDate(dateStr?: string): string {
  const date = parseDate(dateStr);
  if (!date) return "-";

  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * YYYY년 MM월 DD일 오전 HH:MM 형식 (날짜 + 시간)
 * ex) 2025년 10월 28일 오전 11:41
 */
export function formatKoreanDateTime(dateStr?: string): string {
  const date = parseDate(dateStr);
  if (!date) return "-";

  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * YYYY.MM.DD 형식으로 날짜 포맷팅
 * ex) 2025.10.28
 */
export function formatDotDate(dateStr?: string): string {
  const date = parseDate(dateStr);
  if (!date) return "-";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
}

/**
 * 현재 날짜를 기준으로 대회 상태를 계산하는 함수
 * @param currentDate - 현재 날짜
 * @param startAt - 대회 시작일
 * @param endAt - 대회 종료일
 * @param voteEndAt - 투표 종료일
 * @returns "개최전" | "진행중" | "투표중" | "종료"
 */
export function calculateContestStatus(
  currentDate: Date,
  startAt: string,
  endAt: string,
  voteEndAt: string
): "개최전" | "진행중" | "투표중" | "종료" {
  const start = new Date(startAt);
  const end = new Date(endAt);
  const voteEnd = new Date(voteEndAt);

  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  voteEnd.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);

  if (currentDate < start) {
    return "개최전";
  } else if (currentDate >= start && currentDate <= end) {
    return "진행중";
  } else if (currentDate > end && currentDate <= voteEnd) {
    return "투표중";
  } else {
    return "종료";
  }
}

/**
 * D-day 계산 함수
 * @param targetDate - 목표 날짜
 * @param currentDate - 현재 날짜 (기본값: 오늘)
 * @returns D-day 숫자 (null이면 계산 불가)
 */
export function calculateDday(targetDate: Date | null, currentDate: Date = new Date()): number | null {
  if (!targetDate) return null;

  const today = new Date(currentDate);
  today.setHours(0, 0, 0, 0);

  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);

  const diff = target.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/**
 * D-day 텍스트 생성 함수
 * @param displayStatus - 대회 상태
 * @param dday - D-day 숫자
 * @returns D-day 텍스트
 */
export function formatDdayText(
  displayStatus: "개최전" | "진행중" | "투표중" | "종료",
  dday: number | null
): string {
  if (displayStatus === "종료") {
    return ""; // 종료는 표시 안 함
  } else if (displayStatus === "개최전") {
    if (dday === 0) {
      return "시작까지 D-day";
    } else if (dday && dday > 0) {
      return `시작까지 D-${dday}`;
    }
  } else if (displayStatus === "진행중") {
    if (dday === 0) {
      return "오늘 마감";
    } else if (dday && dday > 0) {
      return `종료까지 D-${dday}`;
    }
  } else if (displayStatus === "투표중") {
    if (dday === 0) {
      return "투표종료까지 D-day";
    } else if (dday && dday > 0) {
      return `투표종료까지 D-${dday}`;
    }
  }
  return "";
}

/**
 * D-day 색상 클래스 반환 함수
 * @param displayStatus - 대회 상태
 * @param dday - D-day 숫자
 * @returns Tailwind CSS 클래스 문자열
 */
export function getDdayColor(
  displayStatus: "개최전" | "진행중" | "투표중" | "종료",
  dday: number | null
): string {
  let ddayColor = "";

  if (displayStatus === "개최전") {
    ddayColor = "bg-gray-200 text-gray-600";
  } else if (displayStatus === "진행중" || displayStatus === "투표중") {
    ddayColor = "bg-primary/10 text-primary";
  }

  // 임박 강조
  if (dday !== null && displayStatus !== "종료") {
    if (dday === 0) {
      ddayColor = "bg-red-100 text-red-600"; // D-day
    } else if (dday > 0 && dday <= 3) {
      ddayColor = "bg-orange-100 text-orange-600"; // D-3 이하
    }
  }

  return ddayColor;
}