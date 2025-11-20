// frontend/src/components/section/OngoingContestSection.tsx

import Link from "next/link";
import ContestCardItem from "@/components/item/ContestCardItem";
import { ContestCardItemProps } from "@/types/itemType";
import { ArrowRight } from "lucide-react";

interface OngoingContestSectionProps {
  contests: (ContestCardItemProps & { fileUrl?: string | null })[];
}

/**
 * OngoingContestSection component
 * @description 메인 페이지에서 현재 개최중인 대회를 보여주는 섹션
 * @returns {React.ReactNode}
 */
export default function OngoingContestSection({
  contests,
}: OngoingContestSectionProps) {
  // "진행중" 또는 "투표중" 상태의 대회만 필터링
  const ongoingContests = contests.filter(
    (contest) => contest.status === "진행중" || contest.status === "투표중"
  );

  if (!ongoingContests.length) return null;

  // 최대 4개까지만 표시
  const displayedContests = ongoingContests.slice(0, 4);

  return (
    <section className="py-12 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-text mb-2">
              현재 개최중인 대회
            </h2>
            <p className="text-gray-600">
              지금 참여 가능한 프롬프트 대회에 도전해보세요
            </p>
          </div>

          {/* 전체보기 버튼 */}
          <Link
            href="/contest"
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all duration-200 shadow-sm hover:shadow"
          >
            <span className="text-sm font-semibold text-gray-700 group-hover:text-primary transition-colors">
              전체보기
            </span>
            <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        {/* Contest Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedContests.map((contest) => (
            <ContestCardItem key={contest.contestId} {...contest} />
          ))}
        </div>

        {/* Empty State (대회가 없을 때) */}
        {ongoingContests.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-3xl">🏆</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              현재 개최중인 대회가 없습니다
            </h3>
            <p className="text-gray-500 text-sm">
              곧 새로운 대회가 시작될 예정입니다
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
