'use client';

import PaginationFooter from "./PaginationFooter";

/**
 * ContestFooter component
 * @description 컨테스트 페이지네이션을 포함하는 컴포넌트입니다.
 * @returns {React.ReactNode}
 */
export default function ContestFooter({ itemCnt, totalCnt, totalPages, currentPage }: { itemCnt: number, totalCnt: number, totalPages: number, currentPage: number }) {
  return (
    <PaginationFooter
      itemCnt={itemCnt}
      totalCnt={totalCnt}
      totalPages={totalPages}
      currentPage={currentPage}
      route="/contest"
      preserveParams={["sorter", "title", "status", "tag"]}
    />
  );
}
