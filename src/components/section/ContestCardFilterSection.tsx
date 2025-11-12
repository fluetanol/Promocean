// frontend/src/components/section/ContestCardFilterSection.tsx

import ContestSearchFilter from "@/components/filter/ContestSearchFilter";

// TODO : 불필요한 뎁스로 props 전달 필요 없음, 커뮤니티 서치필터 컴포넌트와 재사용 가능
/**
 * ContestCardFilterSection component
 * @description 컨테스트 카드 검색 필터 컴포넌트
 * @returns {React.ReactNode}
 */
export default function ContestCardFilterSection() {
  return (
    <div className="flex flex-row items-center justify-end gap-3 w-full max-w-full py-4 bg-gray-50 border-gray-200">
      <ContestSearchFilter />
    </div>
  );
}

