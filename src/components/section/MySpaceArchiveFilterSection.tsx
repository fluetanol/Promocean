'use client';

// frontend/src/components/section/CommunityBoardFilterSection.tsx

import ComboBox from "@/components/filter/ComboBox";
import SearchBar from "@/components/filter/SearchBar";
import SortDropdown from "@/components/filter/SortDropdown";
import { useRouter } from "next/navigation";

/**
 * MySpaceArchiveFilterSectionProps 인터페이스
 * @description MySpaceArchiveFilterSection component의 props입니다.
 *
 * @property { "search" | "write" } buttonMode - 필터 섹션의 버튼 모드를 지정합니다.
 * - search : 카테고리 검색 버튼을 나타냅니다.
 * - write : 글 쓰기 버튼을 나타냅니다.
 * @property {number} folderId - 아카이브 폴더 ID (글쓰기 버튼 클릭 시 라우팅에 사용)
 * @property {boolean} isTeamSpace - 팀 스페이스 여부
 * @property {number} spaceId - 스페이스 ID (isTeamSpace가 true일 때 필요)
 */
export interface MySpaceArchiveFilterSectionProps{
  buttonMode : "search" | "write"
  folderId?: number
  isTeamSpace?: boolean
  spaceId?: number
}


/**
 *  MySpaceArchiveFilterSection 컴포넌트
 * @description CommunityBoardFilterSection component is a community board filter section component that displays the community board filter section content
 * @returns {React.ReactNode}
 */
export default function MySpaceArchiveFilterSection({
  buttonMode,
  folderId,
  isTeamSpace = false,
  spaceId
} : MySpaceArchiveFilterSectionProps) {

  const router = useRouter();
  const handleArchiveSearch = () => {
    console.log("카테고리 검색 클릭");
  }

  const handleArchiveBoardWrite = () =>{
    console.log("글 쓰기");

    if (!folderId) {
      console.error("폴더 ID가 지정되지 않았습니다.");
      return;
    }

    // 마이 스페이스 아카이브 글쓰기
    if (!isTeamSpace) {
      router.push(`/post?type=my-space&folderId=${folderId}`);
    }
    // 팀 스페이스 아카이브 글쓰기
    else {
      if (!spaceId) {
        console.error("스페이스 ID가 지정되지 않았습니다.");
        return;
      }
      router.push(`/post?type=team-space&spaceId=${spaceId}&folderId=${folderId}`);
    }
  }

  const handleSortChange = (sortOption: string) => {
    console.log("정렬 변경:", sortOption);
  }

  return (
    <div className="flex flex-row items-center justify-between gap-3 w-full px-4 py-4 bg-gray-50 border-gray-200">
      {/* 왼쪽: 정렬 드롭다운 */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 font-medium">정렬</span>
        <SortDropdown onChange={handleSortChange} />
      </div>

      {/* 오른쪽: 검색 필터 및 버튼 */}
      <div className="flex items-center gap-3">
        <ComboBox />
        <SearchBar />

        {/* Todo: 게시글 작성 컴포넌트 분리 */}
        <button
          type="button"
          className="px-4 py-2 rounded-md bg-primary text-white font-medium hover:brightness-110 active:brightness-95 transition-colors"
          onClick={buttonMode=="search" ? handleArchiveSearch : handleArchiveBoardWrite}
        >
          {buttonMode == "search" ? "카테고리 검색" : "글 쓰기"}
        </button>
      </div>
    </div>
  );
}