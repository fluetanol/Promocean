// frontend/src/components/section/CommunityBoardFilterSection.tsx

import CombinedSearchFilter from "@/components/filter/CombinedSearchFilter";

/**
 * CommunityBoardFilterSection component
 * @description 커뮤니티 게시글 검색 필터 컴포넌트
 * @returns {React.ReactNode}
 */
export default function CommunityBoardFilterSection() {
  return (
    <div className="flex flex-row items-center justify-end gap-3 w-full pb-4 bg-gray-50 border-gray-200">
      <CombinedSearchFilter
        searchOptions={["전체", "제목", "작성자", "내용", "태그"]}
        sorterOptions={{ latest: "최신순", oldest: "오래된 순", popular: "인기순" }}
        defaultSorter="latest"
        route="/community"
        searchParamMapping={{
          "제목": "title",
          "작성자": "author",
          "내용": "content",
          "태그": "tag",
        }}
        preserveParams={["category"]}
      />
    </div>
  );
}