'use client';

// frontend/src/components/section/SidebarSection.tsx

import React from 'react'
import SidebarList from '@/components/list/SidebarList'
import { SidebarItemProps } from '@/types/itemType'
import { useSidebar } from '@/contexts/SidebarContext'
import SidebarItem from '../item/SidebarItem';
import { getAlarmList } from '@/api/alarm';
import { AlarmItemProps } from '../item/AlarmItem';

interface SidebarSectionProps {
  title: string
  sidebarList: SidebarItemProps[]
  setAlarmList : (list: AlarmItemProps[]) => void
  isAlarm: boolean
  setIsAlarm: (isAlarm:boolean) => void
  hasNewAlarm: boolean
  setHasNewAlarm: (hasNew: boolean) => void
}

/**
 * SidebarSection component
 * @description SidebarSection component is a sidebar section component that displays the sidebar section content
 * @param {SidebarSectionProps} props - The props for the SidebarSection component
 * @returns {React.ReactNode}
 */
export default function SidebarSection({title, sidebarList, setAlarmList, isAlarm, setIsAlarm, hasNewAlarm, setHasNewAlarm}: SidebarSectionProps) {
  const { isCollapsed } = useSidebar();

  const callback = async ()=>{
    setIsAlarm(!isAlarm);

    // 알림 모달을 여는 순간 뱃지 제거
    if(!isAlarm){
      const res = await getAlarmList();
      console.log('알람 리스트 조회 결과:', res);
      setAlarmList(res.alarms);
      setHasNewAlarm(false); // 알림 열면 뱃지 제거
    }
  }

  return (
    <div className="mb-6">


        <SidebarItem
          icon={sidebarList[0].icon}
          title={sidebarList[0].title}
          onClick ={callback}
          showBadge={hasNewAlarm}
          isActive={isAlarm}
        />

    </div>
  );
}