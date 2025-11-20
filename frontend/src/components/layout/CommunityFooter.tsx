// frontend/src/components/layout/CommunityFooter.tsx

'use client';

import { useRouter } from "next/navigation";
import PaginationFooter from "./PaginationFooter";

/**
 * CommunityFooter component
 * @description 페이지 네이션을 및 글 작성 버튼을 포함하는 컴포넌트입니다.
 * @returns {React.ReactNode}
 */
export default function CommunityFooter({ itemCnt, totalCnt, totalPages, currentPage } : { itemCnt: number, totalCnt: number, totalPages: number, currentPage: number }) {
  const router = useRouter();

  const handleWritePost = () => {
    router.push("/post?type=community");
  };

  return (
    <PaginationFooter
      itemCnt={itemCnt}
      totalCnt={totalCnt}
      totalPages={totalPages}
      currentPage={currentPage}
      route="/community"
      preserveParams={["category", "sorter", "author", "title", "tag"]}
      onWritePost={handleWritePost}
      writeButtonText="게시글 작성"
    />
  );
}
