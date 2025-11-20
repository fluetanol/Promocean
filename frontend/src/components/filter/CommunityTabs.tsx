'use client';

// frontend/src/components/filter/CommunityTabs.tsx

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CommunityTabs() {
  const categories = [
    { name: "전체", category: "all" },
    { name: "업무", category: "work" },
    { name: "개발", category: "dev" },
    { name: "디자인/창작", category: "design" },
    { name: "취업", category: "job" },
    { name: "교육", category: "edu" },
    { name: "일상", category: "life" },
    { name: "기타", category: "etc" },
  ];

  const searchParams = useSearchParams();
  const currentTab = searchParams.get('category') || 'all';

  return (
    <nav className="border-b border-gray-200 bg-background w-full">
      <ul className="flex space-x-6 px-8">
        {categories.map((cat) => {
          const href = `/community?category=${cat.category}`;
          const isActive = currentTab === cat.category;
          return (
            <li key={cat.name}>
              <Link
                href={href}
                className={`inline-block py-3 text-sm font-medium transition-colors ${
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