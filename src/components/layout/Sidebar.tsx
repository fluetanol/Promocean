'use client';

// frontend/src/components/layout/Sidebar.tsx

import React, { useState } from 'react'
import SidebarHeader from '@/components/layout/SidebarHeader'
import SidebarSection from '@/components/section/SidebarSection'
import SidebarFooter from '@/components/layout/SidebarFooter'
import MagnifyingGlass from '@/components/icon/MagnifyingGlass'
import Trophy from '@/components/icon/Trophy'
// import Megaphone from '@/components/icon/Megaphone'
import User from '@/components/icon/User'
import UserGroup from '@/components/icon/UserGroup'
import { SidebarItemProps } from '@/types/itemType'
import { useSidebar } from '@/contexts/SidebarContext'
import { useAuthStore } from '@/store/authStore'
import SidebarSimpleSection from '../section/SidebarSimpleSection';
import AlarmBell from '../icon/AlarmBell';
import AlarmItem, { AlarmItemProps } from '../item/AlarmItem';
import SidebarAlarmModal from '../modal/SidebarAlarmModal';

/** 
 * Sidebar component
 * @description Sidebar component is a sidebar component that displays the sidebar content
 * @returns {React.ReactNode}
 */
export default function Sidebar() {
  const { isCollapsed, onTransitionEnd } = useSidebar();
  const { isLoggedIn } = useAuthStore();
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  const [isAlarm, setIsAlarm] = useState(false);
  const [alarmListState, setAlarmListState] = useState<AlarmItemProps[]>([]);
  const [hasNewAlarm, setHasNewAlarm] = useState(false);
  
  // 커뮤니티 섹션
  const communityItems: SidebarItemProps[] = [{
    'icon': <MagnifyingGlass />,
    'title': '커뮤니티',
    'href': '/community',
  },
  {
    'icon': <Trophy />,
    'title': '프롬프트 대회',
    'href': '/contest',
  },
  // {
  //   'icon': <Megaphone />,
  //   'title': '공지사항',
  //   'href': '/community',
  // },
]

  // 스페이스 섹션
  const spaceItems: SidebarItemProps[] = [{
    'icon': <User />,
    'title': '마이 스페이스',
    'href': '/my-space',
  },
  {
    'icon': <UserGroup />,
    'title': '팀 스페이스',
    'href': '/team-space',
  },
]

const alarmItems : SidebarItemProps[] = [{
    'icon': <AlarmBell/>,
    'title': '알림',
    'href': '/notifications',
}];

  React.useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    const handleTransitionEnd = (e: TransitionEvent) => {
      // width transition만 처리
      if (e.propertyName === 'width') {
        onTransitionEnd();
      }
    };

    sidebar.addEventListener('transitionend', handleTransitionEnd);
    return () => {
      sidebar.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [onTransitionEnd]);

  return (
    <div>
    <div
      ref={sidebarRef}
      className={`fixed left-0 top-0 ${
        isCollapsed ? 'w-16' : 'w-64'
      } h-screen p-4 border-r border-gray-200 flex flex-col transition-[width] duration-200 overflow-hidden shrink-0`}
      style={{ backgroundColor: '#fdfdfc', color: '#343434' }}
    >
      <div className="flex-1">
        <SidebarHeader />
        
       <SidebarSimpleSection
        title="알림"
        sidebarList={alarmItems}
        isAlarm={isAlarm}
        setIsAlarm={setIsAlarm}
        setAlarmList={setAlarmListState}
        hasNewAlarm={hasNewAlarm}
        setHasNewAlarm={setHasNewAlarm}
       />

        <SidebarSection title="게시판" sidebarList={communityItems} />

        {isLoggedIn && (
          <SidebarSection title="스페이스" sidebarList={spaceItems} />
        )}
      </div>

      <div className="mt-auto">
        <SidebarFooter />
      </div>
    </div>


    <SidebarAlarmModal
        isAlarm={isAlarm}
        setIsAlarm={setIsAlarm}
        alarmListState={alarmListState}
        setAlarmListState={setAlarmListState}
        setHasNewAlarm={setHasNewAlarm}
    />
        
    </div>
    
  );
}