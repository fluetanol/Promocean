'use client';

// frontend/src/components/filter/CommunityTabs.tsx

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const mySpaceCategories = [
  { name: "아카이브", href: ["/my-space/archive", "/my-space"] },
  { name: "스크랩", href: ["/my-space/scrap"] },
  { name: "내가 쓴 글", href: ["/my-space/my-posts"] },
];

export default function MySpaceTabs() {
  const pathName = usePathname();

  return (
    <nav className="border-b border-gray-200 bg-white py-2">
      <ul className="flex space-x-6 px-8">
        {mySpaceCategories.map((cat) => {
          // const href = `/my-space/${cat.href}`;
          const isActive = cat.href.includes(pathName);
          return (
            <li key={cat.name}>
              <Link
                href={cat.href[0]}
                className={`inline-block py-1 text-[16px] font-medium transition-colors ${
                  isActive
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                {cat.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}