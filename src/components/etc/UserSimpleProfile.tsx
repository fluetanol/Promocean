// frontend/src/components/etc/UserSimpleProfile.tsx

import Image from "next/image";

interface UserSimpleProfileProps {
  profileUrl?: string;
  nickname: string;
  imageSize?: 'sm' | 'md' | 'lg' | string; // 'sm' = w-6 h-6, 'md' = w-8 h-8, 'lg' = w-10 h-10, 또는 직접 Tailwind 클래스
  textSize?: 'xs' | 'sm' | 'base' | 'lg'; // Tailwind text size
  showName?: boolean; // 닉네임 표시 여부
}

/**
 * UserSimpleProfile component
 * @description [프로필 이미지 | 닉네임] 형태로 사용되는 사용자 간단 프로필 컴포넌트입니다.
 * @returns {React.ReactNode}
 */
export default function UserSimpleProfile({ 
  profileUrl, 
  nickname, 
  imageSize = 'md',
  textSize = 'sm',
  showName = false 
}: UserSimpleProfileProps) {
  
  // 이미지 크기 클래스 매핑
  const getImageSizeClass = () => {
    if (imageSize === 'sm') return 'w-6 h-6';
    if (imageSize === 'md') return 'w-8 h-8';
    if (imageSize === 'lg') return 'w-10 h-10';
    // 직접 Tailwind 클래스가 전달된 경우
    return imageSize;
  };

  // 텍스트 크기 클래스
  const textSizeClass = `text-${textSize}`;

  const imageSizeClass = getImageSizeClass();
  const isValidProfileUrl = profileUrl && 
    profileUrl !== "..." && 
    profileUrl.trim() !== "" && 
    (profileUrl.startsWith("http") || profileUrl.startsWith("/") || profileUrl.startsWith("data:"));

  return (
    <div className="flex flex-row items-center gap-2">
      {isValidProfileUrl ? (
        <div className={`relative ${imageSizeClass} rounded-full overflow-hidden flex-shrink-0`}>
          <Image src={profileUrl} alt={nickname} fill className="object-cover" />
        </div>
      ) : (
        <div className={`${imageSizeClass} rounded-full bg-gray-200 flex items-center justify-center text-xs flex-shrink-0`}>
          🐥
        </div>
      )}
      {showName && (
        <span className={`${textSizeClass} font-medium text-gray-700 truncate`}>{nickname}</span>
      )}
    </div>
  )
}