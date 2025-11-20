// frontend/src/app/page.tsx

import HeroSection from "@/components/section/HeroSection";
import PostCardSection from "@/components/section/PostCardSection";
import { PostAPI } from "@/api/community";
import { ContestAPI } from "@/api/contest/contest";
import OngoingContestSection from "@/components/section/OngoingContestSection";

// ISR: 60초마다 재생성
export const revalidate = 60;

/**
 * Home component
 * @description Home component is a home component that displays the home page content
 * @returns {React.ReactNode}
 */
export default async function Home() {

  // TODO : 카테고리 렌더링 할거면 요청해야함
  const { popularPosts } = await PostAPI.getPopular();
  console.log("popularPosts ",popularPosts);
  const {contestCardList } = await ContestAPI.getList();
  console.log("context ",contestCardList);
  return (
    <>
      <HeroSection />
      <div className = "flex flex-col gap-2 pt-8">
      <PostCardSection
        postSectionTitle="인기 프롬프트"
        postCardList={popularPosts}
      />
      
      <OngoingContestSection contests={contestCardList} />
      </div>
      <footer className="mt-20 mb-10 text-center text-sm text-gray-400">
        &copy; 2024 Your Company. All rights reserved.
      </footer>  
    </>
  );
}