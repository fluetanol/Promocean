// frontend/src/components/layout/CommunityBoardItem.tsx
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";


export interface SpaceArchiveBoardItemProps{
    articleId: number;
    title: string;
    category: string;
    tags: string[];
    folderName: string;
    image?: string;
}

export default function SpaceArchiveBoardItem( { articleId, title, category, tags, image, folderName }: SpaceArchiveBoardItemProps) {
  
  return (
    <Link
      href={`/my-space/archive/${folderName}/${articleId}`}
      className="flex items-center justify-between w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 p-4"
    >
      {/* LEFT : 이미지 + 텍스트 */}
      <div className="flex items-start gap-4 min-w-0">
        {/* 썸네일 */}
        <div className="relative shrink-0 w-16 h-16 rounded-md overflow-hidden bg-gray-100">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gray-200" />
          )}
        </div>

        {/* 텍스트 영역 */}
        <div className="flex flex-col min-w-0">

          {/* 제목 */}
          <h3 className="font-bold text-text text-base mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* 카테고리 + 해시태그 */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
              {category}
            </span>
            <div className="flex flex-wrap gap-1 text-sm text-gray-500 truncate">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="hover:text-primary cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
