// Contest getList용 목 데이터를 생성하는 헬퍼
import { ContestCardItemProps } from "@/types/itemType";

export function makeMockContestList(count = 10): ContestCardItemProps[] {
  const statuses = ["진행중", "종료", "예정"];

  return Array.from({ length: count }, (_, i) => {
    const today = new Date();
    const startAt = new Date(today.getTime() + i * 86400000);
    const endAt = new Date(startAt.getTime() + 7 * 86400000);
    const voteEndAt = new Date(endAt.getTime() + 3 * 86400000);
    const createdAt = new Date(startAt.getTime() - 3 * 86400000);
    const updatedAt = new Date(startAt.getTime() - 1 * 86400000);

    return {
      contestId: i + 1,
      author: `작성자 ${i + 1}`,
      profileUrl: "",
      title: `테스트 콘테스트 ${i + 1}`,
      startAt: startAt.toISOString(),
      endAt: endAt.toISOString(),
      voteEndAt: voteEndAt.toISOString(),
      status: statuses[i % statuses.length],
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    };
  });
}

export const contestCardMocks: ContestCardItemProps[] = makeMockContestList(10);
