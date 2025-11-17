'use client';
import { useAuthStore } from "@/store/authStore";
import SpaceArchiveBoardItem, { SpaceArchiveBoardItemProps } from "../item/SpaceArchiveBoardItem"
import { useEffect, useState } from "react";
import SpaceAPI, { searchParamsType } from "@/api/space";
import { useArchiveFolderStore } from "@/store/archiveFolderStore";
import { useSpaceStore } from "@/store/spaceStore";
import { CommunityAPI } from "@/api/community";
import { ArticleData, GetArchiveArticlesResponse } from "@/types/apiTypes/space";
import { useRouter, useSearchParams } from "next/navigation";
import SpaceArchiveFilter from "../filter/SpaceArchiveFilter";


export default function SpaceArchiveBoardList(

){
        const router = useRouter();
        const searchParams = useSearchParams();
        const [mySpaceBoardList, setMySpaceBoardList] =  useState<SpaceArchiveBoardItemProps[] | null>([]);
        const [totalPages, setTotalPages] = useState(1);
        const [isLoading, setIsLoading] = useState(true);
        const authStore = useAuthStore();
        const spaceStore = useSpaceStore();
        const user = authStore.user;
        const currentSpace = spaceStore.currentSpace;
        const spaceId = currentSpace?.spaceId;
        const name = user?.nickname || "나의 스페이스";
        const folderStore = useArchiveFolderStore();
        const folderId = folderStore.currentFolder?.folderId;
        const folderName = folderStore.currentFolder?.name;

        // URL 파라미터에서 필터 정보 가져오기
        const currentPage = parseInt(searchParams.get("page") || "1");
        const sort = searchParams.get("sort") || "latest";
        const title = searchParams.get("title") || undefined;
        const tag = searchParams.get("tag") || undefined;
        const type = searchParams.get("type") || undefined;

        const PAGE_GROUP_SIZE = 5;

        console.log("SpaceArchiveBoardList 폴더 아이디 ", folderId);
        //개인 스페이스의 경우 직접 authStore에서 가져와야 합니다.

        useEffect(()=>{
            if(!currentSpace) return;

            console.log("개인 스페이스 아이디 in useEffect ", spaceId);
            // spaceId를 사용하여 필요한 작업 수행
            const fetcher = async () =>
                {
                    try {
                        setIsLoading(true);
                        console.log("api ",spaceId, folderId);

                        // API 호출 파라미터 구성
                        const apiParams : searchParamsType = {
                            folderId: folderId || -1,
                            page: currentPage,
                            size: 10,
                            sort: sort as "latest" | "oldest",
                        };

                        // 검색 조건 추가 (값이 있을 때만)
                        if (title) apiParams.title = title;
                        if (tag) apiParams.tag = tag;
                        if (type) apiParams.type = parseInt(type);

                        const res = await SpaceAPI.getArchiveArticles(spaceId||-1, apiParams);

                        const articles : ArticleData[] = res?.articles|| [];
                        console.log("가져온 아카이브 글들 ", res?.articles);

                        const boardList : SpaceArchiveBoardItemProps[]=[];
                        for(const article of articles){
                            boardList.push({
                                articleId: article.articleId,
                                category:article.type,
                                title:article.title,
                                tags: article.tags,
                                folderName: folderName || "default",
                                image:article.fileUrl
                            });
                        }

                        setMySpaceBoardList(boardList);
                        setTotalPages(res?.totalPages || 1);

                        // 현재 페이지가 총 페이지 수를 초과하면 1페이지로 리다이렉트
                        if (res?.totalPages && currentPage > res.totalPages) {
                            const params = new URLSearchParams(searchParams.toString());
                            params.set("page", "1");
                            router.push(`${window.location.pathname}?${params.toString()}`);
                        }

                        console.log("가져온 아카이브 글들2 ", boardList);
                    } catch (error) {
                        console.error("Failed to fetch archive articles:", error);
                        setMySpaceBoardList([]);
                        setTotalPages(1);
                    } finally {
                        setIsLoading(false);
                    }
                }

            fetcher();
        },[currentSpace, currentPage, sort, title, tag, type, folderId])

        // 페이지네이션 계산
        const currentPageGroup = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE);
        const startPage = currentPageGroup * PAGE_GROUP_SIZE + 1;
        const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);
        const pageNumbers = Array.from(
            { length: endPage - startPage + 1 },
            (_, index) => startPage + index
        );

        const handlePageChange = (page: number) => {
            if (page < 1 || page > totalPages) return;
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", page.toString());
            router.push(`${window.location.pathname}?${params.toString()}`);
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
                <div className="flex flex-col px-4 gap-6">
                    <SpaceArchiveFilter />
                    <div className="flex items-center justify-center w-full bg-white rounded-xl shadow-sm border border-gray-100 p-12">
                        <p className="text-gray-800 text-lg font-medium">로딩 중...</p>
                    </div>
                </div>
            );
        }

        return(
        <div className="flex flex-col px-4 gap-6">
            {/* 필터 섹션 */}
            <SpaceArchiveFilter />

            {/* 게시글 목록 */}
            <div className="flex flex-col gap-2">
            {
                mySpaceBoardList && mySpaceBoardList.length > 0 ? (
                    mySpaceBoardList.map((item, index) => (
                        <SpaceArchiveBoardItem
                            key={index}
                            articleId={item.articleId}
                            category={item.category}
                            title={item.title}
                            tags={item.tags}
                            folderName={folderName || "default"}
                            image={item.image}
                        />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 px-4">
                        <div className="text-center space-y-4">
                            <svg
                                className="mx-auto h-16 w-16 text-gray-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            <div className="space-y-2">
                                <h3 className="text-lg font-medium text-gray-700">아카이브된 글이 없습니다</h3>
                                <p className="text-sm text-gray-500">
                                    이 폴더에 저장된 글이 아직 없습니다.<br />
                                    새로운 글을 작성하여 아카이브에 추가해보세요.
                                </p>
                            </div>
                        </div>
                    </div>
                )
            }
            </div>

            {/* 페이지네이션 */}
            {mySpaceBoardList && mySpaceBoardList.length > 0 && totalPages > 1 && (
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
        )
}
