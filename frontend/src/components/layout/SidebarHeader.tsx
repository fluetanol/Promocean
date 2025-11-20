'use client';

// frontend/src/components/layout/SidebarHeader.tsx

import React from 'react'
import Link from 'next/link'
import Promocean from '../icon/Promocean'
import ChevronLeft from '../icon/ChevronLeft'
import { useSidebar } from '@/contexts/SidebarContext'

/**
 * SidebarHeader component
 * @description SidebarHeader component is a sidebar header component that displays the sidebar header content
 * @returns {React.ReactNode}
 */
export default function SidebarHeader() {
  const { isCollapsed, toggleSidebar } = useSidebar();

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isCollapsed) {
      e.preventDefault();
      toggleSidebar();
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <Link 
          href={isCollapsed ? "#" : "/"} 
          className="block"
          onClick={handleLogoClick}
        >
          <div className="flex items-center gap-3">
            
            {/* 메인 로고 */}
            <Promocean />
            {!isCollapsed && <h1 className="text-md font-bold">Promocean</h1>}
          </div>
        </Link>
        
        {/* 토글 버튼 - 토글 상태일 때만 숨김 */}
        {!isCollapsed && (
          <button 
            onClick={toggleSidebar}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            aria-label="사이드바 토글"
          >
            <ChevronLeft className="size-4"/>
          </button>
        )}
      </div>
      
    </div>
  )
}
