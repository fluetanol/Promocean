// frontend/src/components/item/ContestCardItem.tsx

import Image from 'next/image'
import Link from 'next/link'
import { ContestCardItemProps } from '@/types/itemType'
import UserSimpleProfile from '@/components/etc/UserSimpleProfile'
import { Calendar } from 'lucide-react'

/**
 * ContestCardItem component
 * @description ContestCardItem component is a contest card item component that displays the contest card item content
 * @returns {React.ReactNode}
 */
export default function ContestCardItem({ contestId, author, profileUrl, title, startAt, endAt, status, createdAt, updatedAt }: ContestCardItemProps) {
  
  // status 한글을 영문 ENUM으로 변환 (UserSimpleProfile용)
  const statusMap: Record<string, 'SCHEDULED' | 'ONGOING' | 'VOTING' | 'FINISHED'> = {
    '개최전': 'SCHEDULED',
    '진행중': 'ONGOING',
    '투표중': 'VOTING',
    '종료': 'FINISHED',
  };

  // D-day 계산
  const endDate = new Date(endAt);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);
  const diffTime = endDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const deadline = diffDays.toString(); // 항상 표시 (음수도 포함)

  // endAt 포맷팅 (YYYY.MM.DD)
  const endDateObj = new Date(endAt);
  const formattedEndDate = `${endDateObj.getFullYear()}.${String(endDateObj.getMonth() + 1).padStart(2, '0')}.${String(endDateObj.getDate()).padStart(2, '0')}`;
  const imgUrl = `/assets/img_random${contestId % 21}.png`;
  return (
    <Link href={`/contest/${contestId}?tab=detail`} className="block group">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-primary/20">

        {/* Image Section */}
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={imgUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Status Pill - 왼쪽 상단 */}
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              status === '진행중' ? 'bg-primary/90 text-white' :
              status === '투표중' ? 'bg-primary/90 text-white' :
              status === '개최전' ? 'bg-gray-500/90 text-white' :
              'bg-gray-400/90 text-white'
            }`}>
              {status}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-bold text-text text-lg mb-2 line-clamp-2 transition-colors group-hover:text-primary">
            {title}
          </h3>


          {/* 종료날짜 + D-day */}
          <div className="flex flex-row items-center justify-between mb-4">
            {/* 왼쪽: 아이콘 + 날짜 */}
            <div className="flex flex-row items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600">
                {formattedEndDate}
              </span>
            </div>
            
            {/* 오른쪽: D-day */}
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
              D-{deadline}
            </span>
          </div>
            
          {/* Author */}
          {/* <div className="mb-4">
            <UserSimpleProfile
              profileUrl={profileUrl}
              nickname={author}
              imageSize="sm"
              textSize="xs"
              showName={true}
            />
          </div> */}
        </div>
      </div>
    </Link>
  )
}

