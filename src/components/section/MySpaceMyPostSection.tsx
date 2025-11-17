'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CommunityAPI } from "@/api/community";
import { useAuthStore } from "@/store/authStore";
import { CommunityBoardItemProps } from "@/types/itemType";
import MyPostBoardItem from "@/components/item/MyPostBoardItem";
import MySpaceMyPostFilter from "@/components/filter/MySpaceMyPostFilter";

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

        // API 호출 파라미터 구성
        const apiParams: any = {
          page: currentPage,
          size: 10,
          author: user.nickname,
          sorter: sorter,
        };

        // 검색 조건 추가 (값이 있을 때만)
        if (title) apiParams.title = title;
        if (tag) apiParams.tag = tag;
        if (category) apiParams.category = category;

        const response = await CommunityAPI.getCommunityBoardList(apiParams);
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
      <div className="flex items-center justify-center w-full bg-white rounded-xl shadow-sm border border-gray-100 p-12">
        <p className="text-gray-800 text-lg font-medium">로딩 중...</p>
      </div>
    );
  }

  return (
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
        <div className="flex justify-center py-8">
          <div className="join overflow-hidden rounded-lg border border-gray-300">
            {/* 이전 */}
            <button
              className="join-item btn bg-background text-text hover:bg-gray-100 rounded-none border-none disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handlePreviousPage}
              disabled={startPage === 1}
            >
              «
            </button>

            {/* 페이지 번호 */}
            {pageNumbers.map((pageNum) => (
              <input
                key={pageNum}
                type="radio"
                name="page"
                aria-label={pageNum.toString()}
                className={`join-item btn btn-square bg-background text-text hover:bg-gray-100 border-none ${
                  pageNum === currentPage
                    ? "btn-active bg-primary text-white rounded-md"
                    : "rounded-none"
                }`}
                onClick={() => handlePageChange(pageNum)}
                readOnly
                checked={pageNum === currentPage}
              />
            ))}

            {/* 다음 */}
            <button
              className="join-item btn bg-background text-text hover:bg-gray-100 rounded-none border-none disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleNextPage}
              disabled={endPage >= totalPages}
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
}