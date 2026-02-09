// frontend/src/app/community/[postId]/page.tsx

import CommunityPostDetailSection from "@/components/section/CommunityPostDetailSection";
import CommunityLikeShareSection from "@/components/section/CommunityLikeShareSection";
import CommunityCommentSection from "@/components/section/CommunityCommentSection";
import { CommunityPostItemProps, HashtagItemProps, CommunityCommentItemProps, CommunityPostItemResponse } from "@/types/itemType";
import { PostAPI } from "@/api/community";
import { getServerAuthToken } from "@/lib/serverAuthToken";
import { MockPostAPI } from "@/api/mock_community/post";

interface CommunityPostPageProps {
  params: Promise<{ postId: string }>;
}

/**
 * CommunityPostPage component
 * @description 커뮤니티 상세 게시글 화면입니다.
 * @returns {React.ReactNode}
 */
export default async function CommunityPostPage({ params }: CommunityPostPageProps) {
  const { postId: postIdStr } = await params;
  const postId = parseInt(postIdStr, 10);

  // post detail response data
  let Postdetaildata : { communityPostDetailData: CommunityPostItemResponse | null } | null = null;
  let communityPostDetailData: CommunityPostItemResponse | null = null;

  let hashtagList: HashtagItemProps[] = [];
  let communityPostData: CommunityPostItemProps | null = null;
  let communityCommentList: CommunityCommentItemProps[] = [];

  let isMockData = false;

  // 서버 환경에서 쿠키에서 토큰 가져오기
  const token = await getServerAuthToken();
  
  //서버가 정상적으로 작동하는 경우
  try {
        Postdetaildata  = await PostAPI.getDetail(postId, token);
        communityPostDetailData = Postdetaildata.communityPostDetailData;

        //없는 경우
        if(!communityPostDetailData){
          const { notFound } = await import('next/navigation');
          notFound();
        }
        else{
          hashtagList = communityPostDetailData.tags.map((tag: string) => ({ tag }));
          communityPostData = { ...communityPostDetailData };
          communityCommentList   =
          communityPostDetailData!.replies.map((item: CommunityCommentItemProps) => ({
            ...item,
          }));
      }
  } 
  //아닌 경우
  catch (error) {
    console.log("에러 발생, mock 데이터로 처리 시도:", error);
    // 404 에러 처리
    if (error instanceof Error && error.message.includes('404')) {
      const { notFound } = await import('next/navigation');
      notFound();
    }
    else{
        Postdetaildata = await MockPostAPI.getMockDetail(postId, token);
        communityPostDetailData = Postdetaildata.communityPostDetailData;

          if(!communityPostDetailData){
            const { notFound } = await import('next/navigation');
            notFound();
          } 
          else{
          isMockData = true;
          hashtagList = communityPostDetailData.tags.map((tag: string) => ({ tag }));
          communityPostData = { ...communityPostDetailData };
          communityCommentList=
          communityPostDetailData!.replies.map((item: CommunityCommentItemProps) => ({
            ...item,
          }));
        }
    }

  
  
      return (
          <div className="flex-1 flex flex-col gap-6 bg-white rounded-lg shadow-md">
            {isMockData && <div className = "font-bold text-red-500">* 이 글은 mock 데이터 글입니다.</div>}   
            
            {/* 글 섹션 */}
            <CommunityPostDetailSection communityPostData={communityPostData!} hashtagList={hashtagList} />

            {/* 좋아요 및 스크랩 섹션 */}
            <CommunityLikeShareSection 
              likeCnt={communityPostDetailData!.likeCnt} 
              isLiked={communityPostDetailData!.isLiked} 
              isScraped={communityPostDetailData!.isScraped}
              postId={postId} 
            />

            {/* 구분선 */}
            <hr className="border-gray-200" />

            {/* 댓글 섹션 */}
            <CommunityCommentSection communityCommentList={communityCommentList} postId={postId} />
          </div>
        );

  
  }
}
