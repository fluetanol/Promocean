// frontend/src/components/section/ContestCardSection.tsx

import ContestCardFilterSection from "@/components/section/ContestCardFilterSection";
import ContestCardList from '@/components/list/ContestCardList'
import { ContestCardItemProps } from '@/types/itemType'
import ContestFooter from '@/components/layout/ContestFooter'

interface ContestCardSectionProps {
  contestCardList: ContestCardItemProps[]
  itemCnt: number
  totalCnt: number
  totalPages: number  
  currentPage: number
}

/**
 * ContestCardSection component
 * @description ContestCardSection component is a contest card section component that displays the contest card section content
 * @returns {React.ReactNode}
 */
export default function ContestCardSection({ contestCardList, itemCnt, totalCnt, totalPages, currentPage }: ContestCardSectionProps) {
  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* 게시글 목록 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex-shrink-0">
            <h2 className="text-2xl font-bold text-text mb-2">프롬프트 대회</h2>
            <p className="text-gray-800">다양한 주제의 프롬프트 대회에 참여해보세요</p>
          </div>

          {/* 필터/검색*/}
          <div className="flex-shrink-0 min-w-[380px]">
            <ContestCardFilterSection />
          </div>
        </div>
        
        <div className="flex flex-col gap-8">
          {/* 대회 게시글 목록 */}
          <ContestCardList contestCards={contestCardList || []} />

          {/* 페이지네이션 */}
          <ContestFooter itemCnt={itemCnt} totalCnt={totalCnt} totalPages={totalPages} currentPage={currentPage} />
        </div>
      </div>
    </div>
  )
}

