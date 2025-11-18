// frontend/src/components/section/ContestCardFilterSection.tsx

import CombinedSearchFilter from "@/components/filter/CombinedSearchFilter";

/**
 * ContestCardFilterSection component
 * @description 컨테스트 카드 검색 필터 컴포넌트
 * @returns {React.ReactNode}
 */
export default function ContestCardFilterSection() {
  return (
    <div className="flex flex-row items-center justify-end gap-3 w-full max-w-full py-4 bg-gray-50 border-gray-200">
      <CombinedSearchFilter
        searchOptions={["전체", "제목", "상태", "태그"]}
        sorterOptions={{ createdDesc: "생성일순", endDesc: "마감일순" }}
        defaultSorter="createdDesc"
        route="/contest"
        searchParamMapping={{
          "제목": "title",
          "상태": "status",
          "태그": "tag",
        }}
      />
    </div>
  );
}

