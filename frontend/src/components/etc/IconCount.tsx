// frontend/src/components/etc/IconCount.tsx

import React from "react";

interface IconCountProps {
  icon: React.ReactNode;
  count: number;
  limit?: number;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

/**
 * 아이콘과 카운트를 표시하는 재사용 가능한 컴포넌트
 * count가 limit보다 크면 +limit 형식으로 표시
 */
export default function IconCount({
  icon,
  count,
  limit = 99,
  className = "flex items-center gap-0.75 transition-colors",
  iconClassName = "",
  textClassName = "text-xs",
}: IconCountProps) {
  const displayCount = count > limit ? `+${limit}` : count;

  return (
    <div className={className}>
      <div className={iconClassName}>{icon}</div>
      <span className={textClassName}>{displayCount}</span>
    </div>
  );
}

