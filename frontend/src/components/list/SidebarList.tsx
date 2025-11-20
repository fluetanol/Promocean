// frontend/src/components/list/SidebarList.tsx

import React from 'react'
import SidebarItem from '../item/SidebarItem'
import { SidebarItemProps } from '@/types/itemType'

interface SidebarListProps {
  sidebarList: SidebarItemProps[]
}

/**
 * SidebarList component
 * @description SidebarList component is a sidebar list component that displays the sidebar list content
 * @param {SidebarListProps} props - The props for the SidebarList component
 * @returns {React.ReactNode}
 */
export default function SidebarList({ sidebarList }: SidebarListProps) {
  return (
    <ul className="flex flex-col gap-0.5">
      {sidebarList.map((sidebarItem, index) => (
        <SidebarItem
          key={index}
          icon={sidebarItem.icon}
          title={sidebarItem.title}
          href={sidebarItem.href}
          onClick={sidebarItem.onClick}
          showBadge={sidebarItem.showBadge}
          isActive={sidebarItem.isActive}
        />
      ))}
    </ul>
  )
}
