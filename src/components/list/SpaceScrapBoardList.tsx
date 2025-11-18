"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SpaceScrapItem from "../item/SpaceScrapItem";
import { SpaceScrapBoardItemProps } from "../item/SpaceScrapBoardItem";
import { ScrapAPI } from "@/api/community";
import MySpaceMyPostFilter from "../filter/MySpaceMyPostFilter";

export default function SpaceScrapBoardList(){
    const router = useRouter();
    const searchParams = useSearchParams();
    const [scrapList, setScrapList] = useState<SpaceScrapBoardItemProps[]>([]);
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
        const fetchData = async() => {
            try {
                setIsLoading(true);
                const res = await ScrapAPI.list({
                    page: currentPage,
                    size: 10,
                    sorter: sorter,
                    title: title,
                    tag: tag,
                    category: category,
                });

                if (!res) {
                    setScrapList([]);
                    setTotalPages(1);
                    return;
                }

                const newPostList: SpaceScrapBoardItemProps[] = res.posts;
                console.log("Fetched scrap data:", newPostList, res.totalPages);

                setScrapList(newPostList);
                setTotalPages(res.totalPages || 1);

                // 현재 페이지가 총 페이지 수를 초과하면 1페이지로 리다이렉트
                if (res.totalPages && currentPage > res.totalPages) {
                    router.push('/my-space/scrap?page=1');
                }
            } catch (error) {
                console.error("Failed to fetch scrap data:", error);
                setScrapList([]);
                setTotalPages(1);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [currentPage, sorter, title, tag, category, router]);


    const handleScrapToggle = (id: string) => {
        // 해당 id를 가진 아이템을 리스트에서 제거
        setScrapList(prevList => prevList.filter(item => item.postId !== id));
        console.log(`게시물 ID ${id} 스크랩 해제됨`);
    };

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

        // 기존 쿼리 파라미터 유지
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        router.push(`/my-space/scrap?${params.toString()}`);
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
                <div className="flex flex-col gap-6">
                    {/* 필터 섹션 */}
                    <MySpaceMyPostFilter basePath="/my-space/scrap" />

                    {/* 로딩 표시 */}
                    <div className="flex items-center justify-center w-full bg-white rounded-xl shadow-sm border border-gray-100 p-12">
                        <p className="text-gray-800 text-lg font-medium">로딩 중...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="px-8 py-6">
            <div className="flex flex-col gap-6">
                {/* 필터 섹션 */}
                <MySpaceMyPostFilter basePath="/my-space/scrap" />

                {/* 게시글 목록 */}
                {scrapList.length === 0 ? (
                    <div className="flex items-center justify-center w-full bg-white rounded-xl shadow-sm border border-gray-100 p-12">
                        <p className="text-gray-800 text-lg font-medium">스크랩한 글이 없습니다</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {scrapList.map((item) => (
                            <SpaceScrapItem
                                key={item.postId}
                                postId={item.postId}
                                title={item.title}
                                profileUrl={item.profileUrl}
                                author={item.author}
                                category={item.category}
                                tags={item.tags}
                                likeCnt={item.likeCnt}
                                replyCnt={item.replyCnt}
                                image={item.image}
                                onScrapToggle={handleScrapToggle}
                            />
                        ))}
                    </div>
                )}

                {/* 페이지네이션 */}
                {scrapList.length > 0 && totalPages > 1 && (
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
        </div>
    )
}