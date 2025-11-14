'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

/**
 * ContestFooter component
 * @description 컨테스트 페이지네이션을 포함하는 컴포넌트입니다.
 * @returns {React.ReactNode}
 */
export default function ContestFooter({ itemCnt, totalCnt, totalPages, currentPage }: { itemCnt: number, totalCnt: number, totalPages: number, currentPage: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (currentPage < 1) {
      router.replace(`/contest?page=1`);
    } else if (currentPage > totalPages && totalPages > 0) {
      router.replace(`/contest?page=${totalPages}`);
    }
  }, [currentPage, totalPages, router]);

  const PAGE_GROUP_SIZE = 5;
  const currentPageGroup = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE);
  const startPage = currentPageGroup * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

  const params = {
    page: currentPage,
    ...Object.fromEntries(
      ["sorter", "title", "status", "tag"]
        .map((key) => [key, searchParams.get(key)])
        .filter(([, value]) => value)
    ),
  };

  const handlePageChange = (page: number) => {
    const safePage = Math.max(1, Math.min(page, totalPages));
    const newParams = { ...params, page: safePage };
    router.push(`/contest?${new URLSearchParams(newParams).toString()}`);
  };

  const handleNextPage = () => {
    if (endPage < totalPages) handlePageChange(endPage + 1);
  };

  const handlePreviousPage = () => {
    if (startPage > 1) handlePageChange(startPage - PAGE_GROUP_SIZE);
  };

  return (
    <div className="relative flex items-center py-4 px-8 border-gray-200">
      {/* 왼쪽: 전체 페이지 수 / 게시글 수 */}
      <div className="flex flex-col text-gray-600 text-sm">
        <span>전체 페이지 수: {totalPages}</span>
        <span>전체 게시글 수: {totalCnt}</span>
      </div>
  
      {/* 중앙: 페이지네이션 */}
      <div className="absolute left-1/2 -translate-x-1/2 flex justify-center">
        <div className="flex overflow-hidden rounded-lg border border-gray-300">
          {/* 이전 */}
          <button
            className={`px-4 py-2 bg-white text-gray-700 hover:bg-gray-100 border-r border-gray-300 transition-colors ${
              startPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handlePreviousPage}
            disabled={startPage === 1}
          >
            «
          </button>
  
          {/* 페이지 번호 */}
          {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(
            (pageNum) => (
              <button
                key={pageNum}
                type="button"
                aria-label={pageNum.toString()}
                className={`w-10 h-10 flex items-center justify-center border-r border-gray-300 last:border-r-0 transition-colors ${
                  pageNum === currentPage
                    ? "bg-primary text-white font-medium"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </button>
            )
          )}
  
          {/* 다음 */}
          <button
            className={`px-4 py-2 bg-white text-gray-700 hover:bg-gray-100 border-l border-gray-300 transition-colors ${
              endPage >= totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleNextPage}
            disabled={endPage >= totalPages}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}
