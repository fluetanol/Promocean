// frontend/src/components/item/PostCardItem.tsx

import Image from 'next/image'
import Link from 'next/link'
import { CommunityFloatingItemProps } from '@/types/itemType'
import Heart from '../icon/Heart'
import ChatBubbleBottomCenterText from '../icon/ChatBubbleBottomCenterText'
import IconCount from '../etc/IconCount'
import { getPostImageUrl } from '@/utils/imageUtils'

/**
 * PostCardItem component
 * @description 인기 프롬프트 카드 – 가로 롤링 리스트용 경량 카드
 * @returns {React.ReactNode}
 */
export default function PostCardItem({ postId, title, tags, category, likeCnt, replyCnt, fileUrl }: CommunityFloatingItemProps & { category: string }) {
  const imgUrl = getPostImageUrl(fileUrl, postId)
  const displayedTags = tags.slice(0, 3)
  const hiddenTagCount = tags.length - displayedTags.length

  return (
    <Link href={`/community/${postId}`} className="group block w-[220px] sm:w-[240px] focus-visible:outline-none">
      <article className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-100/80 bg-white/90 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg">
        {/* Image Section */}
        <div className="relative h-40 w-full overflow-hidden">
          <Image
            src={imgUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/60 opacity-0 transition-opacity duration-500 group-hover:opacity-60" />

          {/* Category Badge */}
          <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-semibold text-primary shadow-sm backdrop-blur">
            {category}
          </span>

          {/* Floating Stats */}
          <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 rounded-full bg-gray-900/70 px-2.5 py-1 text-white shadow-lg backdrop-blur">
            <IconCount
              icon={<Heart className="size-3.5 fill-none stroke-white" />}
              count={likeCnt}
              textClassName="text-[10px] font-semibold text-white"
            />
            <span className="h-3 w-px bg-white/30" />
            <IconCount
              icon={<ChatBubbleBottomCenterText className="size-3.5 fill-none stroke-white" />}
              count={replyCnt}
              textClassName="text-[10px] font-semibold text-white"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col gap-3 p-4">
          <h3 className="line-clamp-2 text-base font-semibold text-text transition-colors group-hover:text-primary">
            {title}
          </h3>

          {/* Hashtags */}
          <div className="flex min-h-6 flex-wrap gap-1.5">
            {displayedTags.map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-gray-50 px-2.5 py-0.5 text-[11px] font-medium text-gray-600 transition-colors group-hover:bg-primary/10 group-hover:text-primary"
              >
                #{tag}
              </span>
            ))}
            {hiddenTagCount > 0 && (
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-400">
                +{hiddenTagCount}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3 text-xs font-semibold text-gray-500">
            <span>지금 보기</span>
            <span className="flex items-center gap-1 text-primary">
              <span className="tracking-[0.2em]">GO</span>
              <svg className="size-3.5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
