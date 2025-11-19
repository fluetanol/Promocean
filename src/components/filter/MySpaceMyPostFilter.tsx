"use client";

// frontend/src/components/filter/MySpaceMyPostFilter.tsx

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ChevronDown from "@/components/icon/ChevronDown";
import MagnifyingGlass from "@/components/icon/MagnifyingGlass";
import Funnel from "@/components/icon/Funnel";
import { TagAPI, TagItem } from "@/api/tag";

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

  const timeout = useRef<NodeJS.Timeout | null>(null);
  const [tagSuggestions, setTagSuggestions] = useState<TagItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const skipApiCall = useRef(false); // 제안 선택 시 API 호출 스킵

  // console.log("tag auto complete result:", tagSuggestions);

  useEffect(() =>{
    if(selected !== "태그"){
      setShowSuggestions(false);
      setTagSuggestions([]);
      return;
    }

    if (!keyword.trim()) {
      setShowSuggestions(false);
      setTagSuggestions([]);
      return;
    }

    // 제안 선택으로 인한 keyword 변경이면 API 호출 스킵
    if (skipApiCall.current) {
      skipApiCall.current = false;
      return;
    }

    setIsLoadingSuggestions(true);

    timeout.current = setTimeout(async ()=>{
      console.log("keyword:",keyword);

      try {
        const res = await TagAPI.getTagAutoCompleteList({keyword:keyword});
        setTagSuggestions(res.data);
        setShowSuggestions(true);
        setSelectedSuggestionIndex(-1);
      } catch (error) {
        console.error("Failed to fetch tag suggestions:", error);
        setTagSuggestions([]);
      } finally {
        setIsLoadingSuggestions(false);
      }
    }, 1000);

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };

  }, [keyword, selected])



  const handleTextChange = (e : React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);
      console.log("changed" );
  }

  // 태그 제안 선택 핸들러
  const handleSuggestionClick = (tagName: string) => {
    skipApiCall.current = true; // API 호출 방지
    setKeyword(tagName);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
  }

  // 키보드 네비게이션 핸들러
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (selected !== "태그" || !showSuggestions || tagSuggestions.length === 0) {
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedSuggestionIndex((prev) =>
          prev < tagSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        if (selectedSuggestionIndex >= 0) {
          e.preventDefault();
          handleSuggestionClick(tagSuggestions[selectedSuggestionIndex].name);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  }

  // 입력창 밖 클릭 시 제안 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.tag-autocomplete-container')) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 키워드 하이라이트 함수
  const highlightKeyword = (text: string, keyword: string) => {
    // text가 없거나 keyword가 없으면 그대로 반환
    if (!text || !keyword.trim()) return text;

    console.log("highlighting", text, keyword);

    try {
      const regex = new RegExp(`(${keyword})`, 'gi');
      const parts = text.split(regex);

      return parts.map((part, index) =>
        regex.test(part) ? (
          <span key={index} className="font-bold text-primary">
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      );
    } catch (error) {
      console.error("Error highlighting keyword:", error);
      return text;
    }
  } 


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
    <div className="relative tag-autocomplete-container">
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
            placeholder={selected === "태그" ? "태그 입력 (자동완성)" : "검색어 입력"}
            value={keyword}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
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

      {/* 태그 자동완성 드롭다운 */}
      {selected === "태그" && showSuggestions && keyword.trim() && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
          {isLoadingSuggestions ? (
            <div className="flex items-center justify-center py-8 text-gray-500">
              <div className="flex flex-col items-center gap-2">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">검색 중...</span>
              </div>
            </div>
          ) : tagSuggestions.length > 0 ? (
            <ul className="py-2">
              {tagSuggestions.map((tag, index) => (
                <li
                  key={tag.tagId}
                  onClick={() => handleSuggestionClick(tag.name)}
                  className={`px-4 py-3 cursor-pointer transition-colors duration-150 ${
                    index === selectedSuggestionIndex
                      ? 'bg-primary/10 border-l-4 border-primary'
                      : 'hover:bg-gray-50 border-l-4 border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-800 truncate">
                        {highlightKeyword(tag.name, keyword)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                      </svg>
                      <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        {tag.usageCnt.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-medium mb-1">검색 결과가 없습니다</p>
              <p className="text-xs">다른 키워드로 검색해보세요</p>
            </div>
          )}
        </div>
      )}

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
