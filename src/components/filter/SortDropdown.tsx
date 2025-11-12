"use client";

import { useState } from "react";
import ChevronDown from "@/components/icon/ChevronDown";

const sortOptions = ["최신순", "오래된 순", "인기순"];

export type SortOption = "최신순" | "오래된 순" | "인기순";

export interface SortDropdownProps {
  defaultValue?: SortOption;
  onChange?: (value: SortOption) => void;
}

/**
 * SortDropdown component
 * @description 정렬 옵션을 선택할 수 있는 드롭다운 컴포넌트
 * @param defaultValue - 기본 선택값 (기본: "최신순")
 * @param onChange - 선택값 변경 시 호출되는 콜백 함수
 * @returns {React.ReactNode}
 */
export default function SortDropdown({ defaultValue = "최신순", onChange }: SortDropdownProps) {
  const [selected, setSelected] = useState<SortOption>(defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: SortOption) => {
    setSelected(option);
    setIsOpen(false);
    onChange?.(option);
  };

  return (
    <div className="relative">
      {/* 선택 버튼 */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between w-32 px-3 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors"
      >
        <span>{selected}</span>
        <ChevronDown  />
      </button>

      {/* 드롭다운 */}
      {isOpen && (
        <>
          {/* 오버레이 - 바깥쪽 클릭 감지 */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* 드롭다운 메뉴 */}
          <ul className="absolute left-0 mt-1 w-32 border border-gray-200 bg-white rounded-md shadow-lg z-20">
            {sortOptions.map((opt) => (
              <li
                key={opt}
                onClick={() => handleSelect(opt as SortOption)}
                className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 transition-colors first:rounded-t-md last:rounded-b-md ${
                  opt === selected ? "text-primary font-medium bg-primary/5" : "text-gray-700"
                }`}
              >
                {opt}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
