// frontend/src/components/item/CommunityHashtagItem.tsx

'use client';

import { useRouter } from 'next/navigation';

/**
 * CommunityHashtagItem component
 * @description 각 해시태그를 표시하는 컴포넌트입니다. 해시태그 클릭 시 해시태그 검색 결과 페이지로 이동합니다.
 * @returns {React.ReactNode}
 */
export default function CommunityHashtagItem( { tag }: { tag: string } ) {

  const router = useRouter();
  const handleHashtagClick = () => {
    router.push(`/community?${new URLSearchParams({ tag: tag }).toString()}`);
  }
  return (
    <span
      className="inline-flex items-center text-xs text-gray-700 hover:text-primary transition-colors cursor-pointer"
      onClick={handleHashtagClick}
      >
      #{tag}
    </span>
  )
}