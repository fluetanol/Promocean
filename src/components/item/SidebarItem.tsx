'use client';

// frontend/src/components/item/SidebarItem.tsx

import React from 'react'
import Link from 'next/link'
import { SidebarItemProps } from '@/types/itemType'
import { useSidebar } from '@/contexts/SidebarContext'

/**
 * SidebarItem component
 * @description SidebarItem component is a sidebar item component that displays the sidebar item content
 * @param {SidebarItemProps} props - The props for the SidebarItem component
 * @returns {React.ReactNode}
 */
export default function SidebarItem({ icon, title, href, onClick, showBadge, isActive, buttonRef }: SidebarItemProps) {
  const { isCollapsed, showText, isCollapsing } = useSidebar();

  const baseClass =
    'flex w-full items-center py-2 text-sm font-medium rounded-md transition-colors';

  // 활성화 상태에 따른 스타일 적용
  const activeClass = isActive
    ? 'bg-primary text-white'
    : 'text-[#343434] hover:bg-primary hover:text-white';

  // transition 완료 후 접는 중이 아닐 때만 justify-center 적용
  const layoutClass = (isCollapsed && !isCollapsing) ? 'px-2 justify-center' : 'pl-1 pr-8';
  const className = `${baseClass} ${activeClass} ${layoutClass}`;

  if (onClick) {
    return (
      <button
        ref={buttonRef}
        type="button"
        onClick={onClick}
        className={`${className} relative`}
        title={isCollapsed ? title : undefined}
      >
        <span className="flex-shrink-0 relative">
          {icon}
          {showBadge && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          )}
        </span>
        {showText && (
          <span className="ml-4 whitespace-nowrap">{title}</span>
        )}
      </button>
    );
  }

  return (
    <Link
      href={href ?? ''}
      className={`${className} relative`}
      title={isCollapsed ? title : undefined}
    >
      <span className="flex-shrink-0 relative">
        {icon}
        {showBadge && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        )}
      </span>
      {showText && (
        <span className="ml-4 whitespace-nowrap">{title}</span>
      )}
    </Link>
  );
}
