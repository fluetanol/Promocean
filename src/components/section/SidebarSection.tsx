'use client';

// frontend/src/components/section/SidebarSection.tsx

import React from 'react'
import SidebarList from '@/components/list/SidebarList'
import { SidebarItemProps } from '@/types/itemType'
import { useSidebar } from '@/contexts/SidebarContext'

interface SidebarSectionProps {
  title: string
  sidebarList: SidebarItemProps[]
}

/**
 * SidebarSection component
 * @description SidebarSection component is a sidebar section component that displays the sidebar section content
 * @param {SidebarSectionProps} props - The props for the SidebarSection component
 * @returns {React.ReactNode}
 */
export default function SidebarSection({title, sidebarList}: SidebarSectionProps) {
  const { isCollapsed } = useSidebar();

  return (
    <div className="mb-4">
      <h2 className="text-sm font-semibold uppercase tracking-wider mb-1 whitespace-nowrap">
        <span className={isCollapsed ? 'invisible' : ''}>{title}</span>
      </h2>
      <SidebarList sidebarList={sidebarList} />
    </div>
  );
}