// Community mock helpers
import { CommunityBoardItemProps, CommunityFloatingItemProps, CommunityPostItemResponse } from "@/types/itemType";
import { usePathname } from "next/navigation";
import { promises as fs } from 'fs';

export function makeMockPostPopular(count = 10): CommunityFloatingItemProps[] {
  return Array.from({ length: count }, (_, i) => ({
    postId: i + 1,
    title: `테스트 게시글 ${i + 1}`,
    tags: ["테스트", "mock"],
    fileUrl: null,
    likeCnt: Math.floor(Math.random() * 50),
    replyCnt: Math.floor(Math.random() * 10),
  }));
}

export function makeMockPostList(count = 10): CommunityBoardItemProps[] {
  const categories = ["AI", "디자인", "개발", "기타"];
  const types = ["free", "question", "share"];

  return Array.from({ length: count }, (_, i) => ({
    postId: i + 1,
    author: `작성자 ${i + 1}`,
    profileUrl: "",
    title: `테스트 게시글 ${i + 1}`,
    type: types[i % types.length],
    description: "정적 사이트 배포용 목 데이터입니다.",
    category: categories[i % categories.length],
    tags: ["테스트", "mock"],
    likeCnt: Math.floor(Math.random() * 50),
    replyCnt: Math.floor(Math.random() * 10),
    fileUrl: "",
  }));
}


export async function makeMockPostDetail(
  postId: number
): Promise<CommunityPostItemResponse | null> {
  console.log("makeMockPostDetail called with postId:", postId);

  const isServer = typeof window === "undefined";
  let isVercel:boolean = process.env.VERCEL !== undefined;

  console.log("isVercel:",  isVercel);

  
  //버셀은 자체적으로 VERCEL_URL이라는 환경변수를 제공하는데,
  //이걸 사용하면 배포 환경에서는 정확한 호스트네임을 가져올 수 있다.
  //아무래도 버셀에 Production과 Preview 환경이 있어서 서버 주소가 다 다르다보니 이걸 활용하는게 
  const baseUrl = isServer
    ?  ( isVercel ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
    : "";

  const url = isServer
    ? new URL("/mock/CommunityPostDetailResponse.json", baseUrl).toString()
    : "/mock/CommunityPostDetailResponse.json";

  console.log("Fetching mock data from URL:", url);

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    console.error("Failed to fetch mock data:", res.status);
    return null;
  }
;
  const list = (await res.json()) as CommunityPostItemResponse[];

  if (!Array.isArray(list) || list.length === 0) {
    return null;
  }

  const safePostId = Number.isFinite(postId) ? postId : 0;
  const index = ((safePostId % list.length) + list.length) % list.length;

  return list[index] ?? null;
}


export const popularPostMocks: CommunityFloatingItemProps[] = makeMockPostPopular(10);
export const communityBoardMocks: CommunityBoardItemProps[] = makeMockPostList(10);
