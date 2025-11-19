// frontend/src/components/section/PostCardSection.tsx

import Link from "next/link";
import PostCardList from '@/components/list/PostCardList'
import { CommunityFloatingItemProps } from '@/types/itemType'
import { ArrowRight } from "lucide-react";

interface PostCardSectionProps {
  postSectionTitle : string
  postCardList : CommunityFloatingItemProps[]
}

/**
 * PostCardSection component
 * @description PostCardSection component is a post card section component that displays the post card section content
 * @returns {React.ReactNode}
 * @param {PostCardSectionProps} props - The props for the PostCardSection component
 */
export default function PostCardSection({postSectionTitle, postCardList }: PostCardSectionProps) {
  const posts = postCardList.map(item => ({
    ...item,
    category: "AI"
  }));

  return (
    <div className="py-6 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-4">
          <div>
            <h2 className="text-3xl font-bold text-text mb-2">
              {postSectionTitle}
            </h2>
            <p className="text-gray-600">
              커뮤니티에서 가장 인기있는 프롬프트를 만나보세요
            </p>
          </div>

          {/* 전체보기 버튼 */}
          <Link
            href="/community"
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all duration-200 shadow-sm hover:shadow"
          >
            <span className="text-sm font-semibold text-gray-700 group-hover:text-primary transition-colors">
              전체보기
            </span>
            <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        {/* Post Cards List */}
        <PostCardList posts={posts} />

      </div>
    </div>
  )
}

