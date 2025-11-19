'use client';

// frontend/src/components/item/ContestSubmissionItem.tsx

import Image from "next/image";
import { ContestSubmissionItemProps } from "@/types/itemType";
import { useRouter, useParams } from "next/navigation";
import Heart from "@/components/icon/Heart";
import UserSimpleProfile from "@/components/etc/UserSimpleProfile";

/**
 * ContestSubmissionItem component
 * @description 컨테스트 제출 아이템 컴포넌트
 * @returns {React.ReactNode}
 */
export default function ContestSubmissionItem({ submissionId, author, profileUrl, description, type, submissionUrl, voteCnt }: ContestSubmissionItemProps) {

  const router = useRouter();
  const contestId = useParams().contestId;
  const handleClick = (submissionId: number) => {
    router.push(`/contest/${contestId}/submission/${submissionId}`);
  }

  return (
    <div className="flex items-start w-full bg-white border-b border-gray-200 py-4 gap-4 cursor-pointer" onClick={() => handleClick(submissionId)}>

      {/* 왼쪽 : 제출 이미지 */}
      <div className="relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden bg-gray-100">
          <Image
          // 이미지 속성 없어서 랜덤으로
            src={submissionUrl || `/assets/img_random${submissionId % 21}.png`}
            alt={description}
            fill
            sizes="80px"
            className="object-cover"
          />
      </div>
      
      {/* 중앙 : 타이틀, 타입 */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 타이틀 */}
        <h3 className="font-bold text-text text-lg mb-4 group-hover:text-primary transition-colors">
          {description}
        </h3>

        {/* 타입 */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
            {type}
          </span>
        </div>
      </div>

      {/* 오른쪽 : 작성자 정보 및 추천수 */}
      <div className="flex flex-row items-center gap-4 flex-shrink-0 text-gray-600 self-end">
        {/* 작성자 정보 */}
        <UserSimpleProfile 
          profileUrl={profileUrl}
          nickname={author}
          imageSize="md"
          textSize="sm"
          showName={true}
        />

        {/* 추천수 */}
        <div className="flex items-center gap-1 transition-colors">
          <Heart />
          <span className="text-sm font-medium">{voteCnt}</span>
        </div>
      </div>
    </div>
  )
}