// frontend/src/components/list/PostCardList.tsx
"use client";

import PostCardItem from '@/components/item/PostCardItem'
import { CommunityFloatingItemProps } from '@/types/itemType'
import { useEffect, useRef } from 'react'

interface PostCardListProps {
  posts: (CommunityFloatingItemProps & { category: string })[]
}

/**
 * PostCardList component
 * @description 인기 프롬프트용 무한 롤링 리스트 (끊김 없는 무한 루프)
 * @returns {React.ReactNode}
 */
export default function PostCardList({ posts }: PostCardListProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // 3배 복제로 끊김 없는 무한 루프 구현
  const triplicatedPosts = [...posts, ...posts, ...posts]

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (!scrollElement || !posts.length) return

    let animationFrameId: number
    let isPaused = false

    // 부드러운 스크롤 애니메이션
    const animate = () => {
      if (!isPaused && scrollElement) {
        const currentTransform = scrollElement.style.transform
        const currentX = currentTransform
          ? parseFloat(currentTransform.replace('translateX(', '').replace('px)', ''))
          : 0

        // 카드 너비 (240px) + gap (16px) = 256px
        // posts.length개만큼 이동하면 리셋
        const cardWidth = 256
        const resetPoint = -(posts.length * cardWidth)

        const newX = currentX - 0.5 // 스크롤 속도 조절

        if (newX <= resetPoint) {
          scrollElement.style.transform = `translateX(0px)`
        } else {
          scrollElement.style.transform = `translateX(${newX}px)`
        }
      }
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    // 호버 이벤트
    const handleMouseEnter = () => { isPaused = true }
    const handleMouseLeave = () => { isPaused = false }

    const container = scrollElement.parentElement?.parentElement
    container?.addEventListener('mouseenter', handleMouseEnter)
    container?.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationFrameId)
      container?.removeEventListener('mouseenter', handleMouseEnter)
      container?.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [posts.length])

  if (!posts.length) return null

  return (
    <div className="group/postcard relative overflow-hidden border border-gray-100/80 bg-white/50 p-6">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-white to-transparent" />

      <div className="overflow-hidden">
        <div ref={scrollRef} className="flex w-max gap-4 transition-transform duration-0">
          {triplicatedPosts.map((post, index) => (
            <PostCardItem key={`${post.postId}-${index}`} {...post} />
          ))}
        </div>
      </div>
    </div>
  )
}
