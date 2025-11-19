'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PostAPI } from "@/api/community";
import { useAuthStore } from "@/store/authStore";
import { CommunityBoardItemProps } from "@/types/itemType";
import MyPostBoardItem from "@/components/item/MyPostBoardItem";
import MySpaceMyPostFilter from "@/components/filter/MySpaceMyPostFilter";

interface MySpaceMyPostSectionProps {
  page?: number;
  size?: number;
  author?: string;
  sorter?: string;
  title?: string;
  tag?: string;
  category?: string;
}

/**
 * MySpaceMyPostSection component
 * @description 내 글 목록을 보여주는 섹션 컴포넌트
 * @returns {React.ReactNode}
 */
export default function MySpaceMyPostSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuthStore();
  const [posts, setPosts] = useState<CommunityBoardItemProps[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const currentPage = parseInt(searchParams.get("page") || "1");
  const PAGE_GROUP_SIZE = 5;

  // URL 파라미터에서 필터 정보 가져오기
  const sorter = searchParams.get("sorter") || "latest";
  const title = searchParams.get("title") || undefined;
  const tag = searchParams.get("tag") || undefined;
  const category = searchParams.get("category") || undefined;

  useEffect(() => {
    const fetchMyPosts = async () => {
      if (!user?.nickname) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await PostAPI.getList({
          page: currentPage,
          size: 10,
          author: user.nickname,
          sorter: sorter,
          title: title,
          tag: tag,
          category: category,
        });

        setPosts(response.communityBoardList);
        // totalPages가 없으면 최소 1페이지로 설정
        setTotalPages(response.totalPages || 1);

        // 현재 페이지가 총 페이지 수를 초과하면 1페이지로 리다이렉트
        if (response.totalPages && currentPage > response.totalPages) {
          router.push('/my-space/my-posts?page=1');
        }
      } catch (error) {
        console.error("Failed to fetch my posts:", error);
        setPosts([]);
        setTotalPages(1);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyPosts();
  }, [currentPage, user?.nickname, router, sorter, title, tag, category]);

  const currentPageGroup = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE);
  const startPage = currentPageGroup * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  const handlePageChange = (page: number) => {
    // 유효한 페이지 범위 체크
    if (page < 1 || page > totalPages) return;
    router.push(`/my-space/my-posts?page=${page}`);
  };

  const handleNextPage = () => {
    const nextPage = endPage + 1;
    if (nextPage <= totalPages) {
      handlePageChange(nextPage);
    }
  };

  const handlePreviousPage = () => {
    const previousPage = startPage - 1;
    if (previousPage >= 1) {
      handlePageChange(previousPage);
    }
  };

  if (isLoading) {
    return (
      <div className="px-8 py-6">
        <div className="flex items-center justify-center w-full bg-white rounded-xl shadow-sm border border-gray-100 p-12">
          <p className="text-gray-800 text-lg font-medium">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 py-6">
      <div className="flex flex-col gap-6">
        {/* 필터 섹션 */}
        <MySpaceMyPostFilter />

        {/* 게시글 목록 */}
        <div className="flex flex-col divide-y divide-gray-100 space-y-4">
          {posts.length === 0 ? (
            <div className="flex items-center justify-center w-full bg-white rounded-xl shadow-sm border border-gray-100 p-12">
              <p className="text-gray-800 text-lg font-medium">작성한 글이 없습니다</p>
            </div>
          ) : (
            posts.map((post) => <MyPostBoardItem key={post.postId} {...post} />)
          )}
        </div>

        {/* 페이지네이션 */}
        {posts.length > 0 && totalPages > 1 && (
          <div className="relative flex flex-row items-center py-4 px-2 border-gray-200">
            {/* 왼쪽: 전체 페이지 수 / 게시글 수 */}
            <div className="flex flex-col text-gray-600 text-xs">
              <span>전체 페이지 수: {totalPages}</span>
              <span>전체 게시글 수: {posts.length}</span>
            </div>

            {/* 중앙: 페이지네이션 */}
            <div className="absolute left-1/2 -translate-x-1/2 flex justify-center">
              <div className="flex overflow-hidden rounded-lg border border-gray-300">
                {/* 이전 */}
                <button
                  className={`px-2 py-1 text-sm bg-white text-gray-700 hover:bg-gray-100 border-r border-gray-300 transition-colors ${
                    startPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handlePreviousPage}
                  disabled={startPage === 1}
                >
                  «
                </button>

                {/* 페이지 번호 */}
                {pageNumbers.map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    aria-label={pageNum.toString()}
                    className={`w-7 h-7 text-sm flex items-center justify-center border-r border-gray-300 last:border-r-0 transition-colors ${
                      pageNum === currentPage
                        ? "bg-primary text-white font-medium"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                ))}

                {/* 다음 */}
                <button
                  className={`px-2 py-1 text-sm bg-white text-gray-700 hover:bg-gray-100 border-l border-gray-300 transition-colors ${
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
        )}
      </div>
    </div>
  );
}