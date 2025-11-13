'use client';

// frontend/src/components/filter/CommunityTabs.tsx

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CommunityTabs() {
  const categories = [
    { name: "전체", category: "all" },
    { name: "업무", category: "work" },
    { name: "개발", category: "dev" },
    { name: "디자인", category: "design" },
    { name: "교육", category: "edu" },
    { name: "마케팅", category: "marketing" },
    { name: "창작", category: "creation" },
    { name: "데이터", category: "data" },
    { name: "생활", category: "life" },
    { name: "AI", category: "ai" },
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