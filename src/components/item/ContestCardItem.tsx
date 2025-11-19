// frontend/src/components/item/ContestCardItem.tsx

import Image from "next/image";
import Link from "next/link";
import { ContestCardItemProps } from "@/types/itemType";
import { Calendar } from "lucide-react";
import {
  formatDotDate,
  calculateContestStatus,
  calculateDday,
  formatDdayText,
  getDdayColor,
} from "@/utils/formatDate";
import { getContestImageUrl } from "@/utils/imageUtils";

export default function ContestCardItem({
  contestId,
  author,
  profileUrl,
  title,
  startAt,
  endAt,
  voteEndAt,
  status,
  createdAt,
  updatedAt,
  fileUrl,
}: ContestCardItemProps & { fileUrl?: string | null }) {
  // 현재 날짜를 기준으로 상태 계산
  const currentDate = new Date();
  const displayStatus = calculateContestStatus(currentDate, startAt, endAt, voteEndAt);

  // 날짜 포맷팅
  const formattedStartDate = formatDotDate(startAt);
  const formattedEndDate = formatDotDate(endAt);

  // D-day 계산
  let targetDate: Date | null = null;
  if (displayStatus === "개최전") {
    targetDate = new Date(startAt); // 시작일까지 D-
  } else if (displayStatus === "진행중") {
    targetDate = new Date(endAt); // 종료일까지 D-
  } else if (displayStatus === "투표중") {
    targetDate = new Date(voteEndAt); // 투표종료일까지 D-
  }

  const dday = calculateDday(targetDate, currentDate);
  const ddayColor = getDdayColor(displayStatus, dday);
  const ddayText = formatDdayText(displayStatus, dday);

  const isEnded = displayStatus === "종료";
  
  const imgUrl = getContestImageUrl(fileUrl, contestId);

  return (
    <Link
      href={`/contest/${contestId}?tab=detail`}
      className="block group"
    >
      <div className="w-full bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-primary/20">
        
        {/* Image Section */}
        <div className="relative w-full h-32 overflow-hidden">
          <Image
            src={imgUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
              isEnded ? "opacity-80 grayscale" : ""
            }`}
          />

          {/* Status Pill */}
          <div className="absolute top-2 left-3">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                displayStatus === "진행중" || displayStatus === "투표중"
                  ? "bg-primary/90 text-white"
                  : "bg-gray-500/90 text-white"
              }`}
            >
              {displayStatus}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-2">
          {/* Title */}
          <h3 className="font-bold text-text text-sm pl-0.5 pb-1 line-clamp-1 transition-colors group-hover:text-primary overflow-hidden text-ellipsis">
            {title}
          </h3>

          {/* 종료날짜 + D-day */}
          <div className="flex flex-row items-center justify-between pl-0.5">

            {/* 날짜 */}
            <div className="flex flex-row items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-600" />
              <span className="text-[10px] text-gray-600 line-clamp-1 overflow-hidden text-ellipsis">
                {formattedStartDate} ~ {formattedEndDate}
              </span>
            </div>

            {/* D-day (종료면 표시 안함) */}
            {!isEnded && (
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${ddayColor} line-clamp-1 overflow-hidden text-ellipsis`}
              >
                {ddayText}
              </span>
            )}
          </div>
        </div>

      </div>
    </Link>
  );
}
