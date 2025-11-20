'use client';

// frontend/src/components/filter/ContestPostTabs.tsx

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";

/**
 * ContestPostTabs component
 * @description ContestPostTabs component is a contest post tabs component that displays the contest post tabs content
 * @returns {React.ReactNode}
 */
export default function ContestPostTabs() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentTab = searchParams.get('tab') || 'detail';

  const tabs = [
    { name: "대회상세", tab: "detail" },
    { name: "공지사항", tab: "notice" },
    { name: "산출물", tab: "submission" },
    // { name: "내 산출물", tab: "my-submission" },
    // { name: "리더보드", tab: "leaderboard" },
  ];

  return (
    <nav className="border-b border-gray-200 bg-background">
      <ul className="flex space-x-6">
        {tabs.map((tabItem) => {
          const href = `${pathname}?tab=${tabItem.tab}`;
          const isActive = currentTab === tabItem.tab;
          return (
            <li key={tabItem.tab}>
              <Link
                href={href}
                className={`inline-block py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                {tabItem.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

