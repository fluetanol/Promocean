"use client";

// frontend/src/components/filter/SearchBar.tsx

import MagnifyingGlass from "@/components/icon/MagnifyingGlass";
import { useState } from "react";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center border border-gray-300 rounded-full px-3 py-2 w-72 bg-white focus-within:ring-2 focus-within:ring-primary"
    >
      <MagnifyingGlass />
      <input
        type="text"
        placeholder="검색어 입력"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="flex-grow text-sm bg-transparent focus:outline-none"
      />
    </form>
  );
}
