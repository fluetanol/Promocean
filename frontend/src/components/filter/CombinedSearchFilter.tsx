"use client";

// frontend/src/components/filter/CombinedSearchFilter.tsx

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ChevronDown from "@/components/icon/ChevronDown";
import MagnifyingGlass from "@/components/icon/MagnifyingGlass";
import Funnel from "@/components/icon/Funnel";
import { TagAPI, TagItem } from "@/api/tag";

interface CombinedSearchFilterProps {
  searchOptions: string[];
  sorterOptions: Record<string, string>;
  defaultSorter: string;
  route: string;
  searchParamMapping: Record<string, string>; // 검색 옵션 -> 쿼리 파라미터 매핑 (예: {"제목": "title", "작성자": "author"})
  preserveParams?: string[]; // 유지할 쿼리 파라미터 목록 (예: ["category"])
}

/**
 * CombinedSearchFilter component
 * @description 드롭다운과 검색바가 통합된 재사용 가능한 컴포넌트입니다.
 * @param {CombinedSearchFilterProps} props - The props for the CombinedSearchFilter component
 * @returns {React.ReactNode}
*/
export default function CombinedSearchFilter({
  searchOptions,
  sorterOptions,
  defaultSorter,
  route,
  searchParamMapping,
  preserveParams = [],
}: CombinedSearchFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedSorter, setSelectedSorter] = useState(searchParams.get("sorter") || defaultSorter);
  const [isSorterOpen, setIsSorterOpen] = useState(false);
  // "전체" 제거, 기본값을 "제목"으로 설정
  const [selected, setSelected] = useState("제목");
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

  const timeout = useRef<NodeJS.Timeout | null>(null);
  const [tagSuggestions, setTagSuggestions] = useState<TagItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const skipApiCall = useRef(false); // 제안 선택 시 API 호출 스킵

  // 태그 자동완성 API 호출
  useEffect(() => {
    if (selected !== "태그") {
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

    timeout.current = setTimeout(async () => {
      try {
        const res = await TagAPI.getTagAutoCompleteList({ keyword: keyword });
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
  }, [keyword, selected]);

  // 태그 제안 선택 핸들러
  const handleSuggestionClick = (tagName: string) => {
    skipApiCall.current = true; // API 호출 방지
    setKeyword(tagName);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
  };

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
  };

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
    if (!text || !keyword.trim()) return text;

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
  };

  // 쿼리 파라미터로 라우팅
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // 새로운 쿼리 파라미터 구성
    const params = new URLSearchParams();
    
    // 유지할 파라미터 추가
    preserveParams.forEach((key) => {
      const value = searchParams.get(key);
      if (value) {
        params.set(key, value);
      }
    });
    
    // sorter 추가
    if (selectedSorter) {
      params.set("sorter", selectedSorter);
    }
    
    // 검색 파라미터 추가
    if (keyword.trim()) {
      const paramKey = searchParamMapping[selected];
      if (paramKey) {
        params.set(paramKey, keyword.trim());
      }
    }

    // page는 1로 리셋 (검색 시 첫 페이지로)
    params.set("page", "1");

    router.push(`${route}?${params.toString()}`);
  };

  return (
    <div className="relative max-w-lg tag-autocomplete-container">
      <div className="flex items-center border border-gray-300 rounded-md bg-white overflow-hidden h-8">
        {/* 왼쪽: 정렬 필터 */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsSorterOpen((prev) => !prev)}
            className="flex items-center justify-between w-24 px-3 py-1 text-xs hover:bg-gray-50 border-r border-gray-300 h-full"
          >
            <span>{selectedSorter ? sorterOptions[selectedSorter as keyof typeof sorterOptions] : "최신순"}</span>
            <Funnel className="size-4" />
          </button>
        </div>
        {/* 중앙: 드롭다운 */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center justify-between w-24 px-3 py-1 text-xs hover:bg-gray-50 border-r border-gray-300 h-full"
          >
            <span>{selected}</span>
            <ChevronDown className="size-4"/>
          </button>
        </div>

        {/* 오른쪽: 검색바 */}
        <form
          onSubmit={handleSearch}
          className="flex items-center grow px-3 py-1 h-full"
        >
          <input
            type="text"
            placeholder={selected === "태그" ? "태그 입력 (자동완성)" : "검색어 입력"}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            className="grow text-xs bg-transparent focus:outline-none"
          />
          <button
            type="submit"
            className="cursor-pointer"
            aria-label="검색"
          >
            <MagnifyingGlass className="size-4" />
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
        <ul className="absolute left-0 top-full mt-1 w-24 border border-gray-200 bg-white rounded-md shadow-md z-10">
          {Object.entries(sorterOptions).map(([key, value]) => (
            <li
              key={key}
              onClick={() => {
                setSelectedSorter(key);
                setIsSorterOpen(false);
                // 정렬 변경 시 즉시 라우팅
                const params = new URLSearchParams();
                // 유지할 파라미터 추가
                preserveParams.forEach((paramKey) => {
                  const value = searchParams.get(paramKey);
                  if (value) {
                    params.set(paramKey, value);
                  }
                });
                params.set("sorter", key);
                params.set("page", "1");
                router.push(`${route}?${params.toString()}`);
              }}
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
        <ul className="absolute left-24 top-full mt-1 w-24 border border-gray-200 bg-white rounded-md shadow-md z-10">
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

