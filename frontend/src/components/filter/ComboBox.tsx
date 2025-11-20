"use client";

// frontend/src/components/filter/ComboBox.tsx

import { useState } from "react";
import ChevronDown from "@/components/icon/ChevronDown";

const options = ["제목", "작성자", "내용"];

export default function ComboBox() {
  const [selected, setSelected] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* 선택 버튼 */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between w-28 px-3 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50"
      >
        <span>{selected}</span>
        <ChevronDown />
      </button>

      {/* 드롭다운 */}
      {isOpen && (
        <ul className="absolute left-0 mt-1 w-28 border border-gray-200 bg-white rounded-md shadow-md z-10">
          {options.map((opt) => (
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
