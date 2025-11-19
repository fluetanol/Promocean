// frontend/src/app/page.tsx

import HeroSection from "@/components/section/HeroSection";
import PostCardSection from "@/components/section/PostCardSection";
import { PostAPI } from "@/api/community";

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

  return (
    <>
      <HeroSection />
      <PostCardSection
        postSectionTitle="인기 프롬프트"
        postCardList={popularPosts}
      />
    </>
  );
}