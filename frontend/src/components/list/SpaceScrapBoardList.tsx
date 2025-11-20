"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SpaceScrapItem from "../item/SpaceScrapItem";
import { SpaceScrapBoardItemProps } from "../item/SpaceScrapBoardItem";
import { ScrapAPI } from "@/api/community";
import MySpaceMyPostFilter from "../filter/MySpaceMyPostFilter";
import UndoToast from "../toast/UndoToast";

interface PendingDelete {
    postId: number;
    item: SpaceScrapBoardItemProps;
    timerId: NodeJS.Timeout;
}

export default function SpaceScrapBoardList(){
    const router = useRouter();
    const searchParams = useSearchParams();
    const [scrapList, setScrapList] = useState<SpaceScrapBoardItemProps[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(null);
    const pendingDeleteRef = useRef<PendingDelete | null>(null);

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


    const handleScrapToggle = (id: number) => {
        // 기존에 대기 중인 삭제가 있으면 즉시 실행
        if (pendingDeleteRef.current) {
            clearTimeout(pendingDeleteRef.current.timerId);
            executeDelete(pendingDeleteRef.current.postId);
            pendingDeleteRef.current = null;
            setPendingDelete(null);
        }

        // 삭제할 아이템 찾기
        const itemToDelete = scrapList.find(item => item.postId === id);
        if (!itemToDelete) return;

        // UI에서 즉시 제거
        setScrapList(prevList => prevList.filter(item => item.postId !== id));

        // 5초 후 실제 삭제를 위한 타이머 설정
        const timerId = setTimeout(() => {
            executeDelete(id);
            setPendingDelete(null);
            pendingDeleteRef.current = null;
        }, 5000);

        // pending delete 상태 저장
        const newPendingDelete: PendingDelete = {
            postId: id,
            item: itemToDelete,
            timerId
        };
        setPendingDelete(newPendingDelete);
        pendingDeleteRef.current = newPendingDelete;

        console.log(`게시물 ID ${id} 스크랩 취소 예약됨 (5초 후 실행)`);
    };

    const executeDelete = async (postId: number) => {
        try {
            await ScrapAPI.delete(postId);
            console.log(`게시물 ID ${postId} 스크랩 실제 삭제 완료`);
        } catch (error) {
            console.error(`게시물 ID ${postId} 스크랩 삭제 실패:`, error);
        }
    };

    const handleUndo = () => {
        if (!pendingDelete) return;

        // 타이머 취소
        clearTimeout(pendingDelete.timerId);

        // 아이템 복구
        setScrapList(prevList => {
            // 이미 있는지 확인 (중복 방지)
            if (prevList.some(item => item.postId === pendingDelete.postId)) {
                return prevList;
            }
            // 원래 위치를 정확히 복원하기 어려우므로 맨 앞에 추가
            return [pendingDelete.item, ...prevList];
        });

        // pending 상태 제거
        setPendingDelete(null);
        pendingDeleteRef.current = null;

        console.log(`게시물 ID ${pendingDelete.postId} 스크랩 취소 되돌림`);
    };

    const handleToastClose = () => {
        setPendingDelete(null);
        pendingDeleteRef.current = null;
    };

    // 컴포넌트 언마운트 시 타이머 정리
    useEffect(() => {
        return () => {
            if (pendingDeleteRef.current) {
                clearTimeout(pendingDeleteRef.current.timerId);
            }
        };
    }, []);

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
        <>
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {scrapList.map((item) => (
                                <SpaceScrapItem
                                    key={item.postId}
                                    postId={item.postId}
                                    title={item.title}
                                    profileUrl={item.profileUrl}
                                    author={item.author}
                                    category={item.category}
                                    tags={item.tags}
                                    fileUrl={item.fileUrl}
                                    onScrapToggle={handleScrapToggle}
                                />
                            ))}
                        </div>
                    )}

                    {/* 페이지네이션 */}
                    {scrapList.length > 0 && totalPages > 1 && (
                        <div className="relative flex flex-row items-center py-4 px-2 border-gray-200">
                            {/* 왼쪽: 전체 페이지 수 / 게시글 수 */}
                            <div className="flex flex-col text-gray-600 text-xs">
                                <span>전체 페이지 수: {totalPages}</span>
                                <span>전체 게시글 수: {scrapList.length}</span>
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

            {/* 되돌리기 토스트 */}
            {pendingDelete && (
                <UndoToast
                    message="스크랩이 취소되었습니다"
                    onUndo={handleUndo}
                    onClose={handleToastClose}
                    duration={5000}
                />
            )}
        </>
    )
}