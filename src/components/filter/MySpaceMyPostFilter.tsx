"use client";

// frontend/src/components/filter/MySpaceMyPostFilter.tsx

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ChevronDown from "@/components/icon/ChevronDown";
import MagnifyingGlass from "@/components/icon/MagnifyingGlass";
import Funnel from "@/components/icon/Funnel";

interface MySpaceMyPostFilterProps {
  basePath?: string; // 필터 적용 시 라우팅할 기본 경로
}

/**
 * MySpaceMyPostFilter component
 * @description 마이 스페이스 게시글/스크랩 목록을 위한 필터 컴포넌트 (CombinedSearchFilter 기반)
 * @param {string} basePath - 필터 적용 시 라우팅할 경로 (기본값: /my-space/my-posts)
 * @returns {React.ReactNode}
*/
export default function MySpaceMyPostFilter({ basePath = "/my-space/my-posts" }: MySpaceMyPostFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // search Parmas, sorter Parmas
  const searchOptions = ["전체", "제목", "태그"];
  const sorterOptions = {"latest": "최신순", "oldest": "오래된 순", "popular": "인기순"};

  const [selectedSorter, setSelectedSorter] = useState(searchParams.get("sorter") || "latest");
  const [isSorterOpen, setIsSorterOpen] = useState(false);
  const [selected, setSelected] = useState("전체");
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

  // 정렬 변경 핸들러 - 즉시 API 호출
  const handleSorterChange = (sorterKey: string) => {
    setSelectedSorter(sorterKey);
    setIsSorterOpen(false);

    // 기존 쿼리 파라미터 가져오기
    const params = new URLSearchParams();

    // 기존 검색 파라미터 유지
    const title = searchParams.get("title");
    const tag = searchParams.get("tag");
    const category = searchParams.get("category");

    if (title) params.set("title", title);
    if (tag) params.set("tag", tag);
    if (category) params.set("category", category);

    // 정렬 파라미터 추가
    params.set("sorter", sorterKey);

    // 페이지는 1로 리셋
    params.set("page", "1");

    router.push(`${basePath}?${params.toString()}`);
  };

  // 쿼리 파라미터로 라우팅
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // 기존 쿼리 파라미터 가져오기
    const category = searchParams.get("category");

    // 새로운 쿼리 파라미터 구성
    const params = new URLSearchParams();

    // category 유지
    if (category) {
      params.set("category", category);
    }

    // sorter 추가
    if (selectedSorter) {
      params.set("sorter", selectedSorter);
    }

    // 검색 파라미터 추가 (전체가 아닐 때만)
    if (selected !== "전체" && keyword.trim()) {
      switch (selected) {
        case "제목":
          params.set("title", keyword.trim());
          break;
        case "태그":
          params.set("tag", keyword.trim());
          break;
      }
    }

    // page는 1로 리셋 (검색 시 첫 페이지로)
    params.set("page", "1");

    router.push(`${basePath}?${params.toString()}`);
  };

  return (
    <div className="relative">
      <div className="flex items-center border border-gray-300 rounded-md bg-white overflow-hidden">
        {/* 왼쪽: 정렬 필터 */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsSorterOpen((prev) => !prev)}
            className="flex items-center justify-between w-28 px-3 py-2 text-sm hover:bg-gray-50 border-r border-gray-300"
          >
            <span>{selectedSorter ? sorterOptions[selectedSorter as keyof typeof sorterOptions] : "최신순"}</span>
            <Funnel />
          </button>
        </div>
        {/* 중앙: 드롭다운 */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center justify-between w-28 px-3 py-2 text-sm hover:bg-gray-50 border-r border-gray-300"
          >
            <span>{selected}</span>
            <ChevronDown />
          </button>
        </div>

        {/* 오른쪽: 검색바 */}
        <form
          onSubmit={handleSearch}
          className="flex items-center flex-grow px-3 py-2"
        >
          <input
            type="text"
            placeholder="검색어 입력"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="flex-grow text-sm bg-transparent focus:outline-none ml-2"
          />
          <button
            type="submit"
            className="cursor-pointer"
            aria-label="검색"
          >
            <MagnifyingGlass />
          </button>
        </form>
      </div>

      {/* 정렬 필터 드롭다운 메뉴 */}
      {isSorterOpen && (
        <ul className="absolute left-0 top-full mt-1 w-28 border border-gray-200 bg-white rounded-md shadow-md z-10">
          {Object.entries(sorterOptions).map(([key, value]) => (
            <li
              key={key}
              onClick={() => handleSorterChange(key)}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                key === selectedSorter ? "text-primary" : "text-gray-700"
              }`}
            >
              {value}
            </li>
          ))}
        </ul>
      )}

      {/* 검색 옵션 드롭다운 메뉴 */}
      {isOpen && (
        <ul className="absolute left-28 top-full mt-1 w-28 border border-gray-200 bg-white rounded-md shadow-md z-10">
          {searchOptions.map((opt) => (
            <li
              key={opt}
              onClick={() => {
                setSelected(opt);
                setIsOpen(false);
              }}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                opt === selected ? "text-primary" : "text-gray-700"
              }`}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
