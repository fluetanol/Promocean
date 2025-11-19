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
import AlarmBell from '../icon/AlarmBell';
import { AlarmItemProps } from '../item/AlarmItem';
import SidebarAlarmModal from '../modal/SidebarAlarmModal';
import { usePathname } from 'next/navigation';

/** 
 * Sidebar component
 * @description Sidebar component is a sidebar component that displays the sidebar content
 * @returns {React.ReactNode}
 */
export default function Sidebar() {
  const { isCollapsed, onTransitionEnd } = useSidebar();
  const { isLoggedIn } = useAuthStore();
  const pathname = usePathname();
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  const alarmButtonRef = React.useRef<HTMLButtonElement>(null);
  const [isAlarm, setIsAlarm] = useState(false);
  const [alarmListState, setAlarmListState] = useState<AlarmItemProps[]>([]);
  const [hasNewAlarm, setHasNewAlarm] = useState(false);

  // 현재 경로가 특정 메뉴와 일치하는지 확인하는 함수
  const isActiveRoute = (href: string) => {
    if (!pathname) return false;

    // 정확히 일치하는 경로
    if (pathname === href) return true;

    // 하위 경로도 활성화 (예: /my-space/archive도 /my-space로 간주)
    if (href !== '/' && pathname.startsWith(href)) return true;

    return false;
  };

  // 커뮤니티 섹션
  const communityItems: SidebarItemProps[] = [{
    'icon': <MagnifyingGlass />,
    'title': '커뮤니티',
    'href': '/community',
    'isActive': isActiveRoute('/community'),
  },
  {
    'icon': <Trophy />,
    'title': '프롬프트 대회',
    'href': '/contest',
    'isActive': isActiveRoute('/contest'),
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
    'isActive': isActiveRoute('/my-space'),
  },
  {
    'icon': <UserGroup />,
    'title': '팀 스페이스',
    'href': '/team-space',
    'isActive': isActiveRoute('/team-space'),
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
        isCollapsed ? 'w-16' : 'w-52'
      } h-screen p-4 border-r border-gray-200/50 flex flex-col transition-[width] duration-200 overflow-hidden shrink-0`}
      style={{ borderRightWidth: '0px', backgroundColor: '#fdfdfc', color: '#343434' }}
    >
      <div className="flex-1">
        <SidebarHeader />

        <SidebarSection title="게시판" sidebarList={communityItems} />

        {isLoggedIn && (
          <SidebarSection title="스페이스" sidebarList={spaceItems} />
        )}
      </div>

      <div className="mt-auto">
        <SidebarFooter 
          alarmItems={alarmItems}
          isAlarm={isAlarm}
          setIsAlarm={setIsAlarm}
          setAlarmList={setAlarmListState}
          hasNewAlarm={hasNewAlarm}
          setHasNewAlarm={setHasNewAlarm}
          alarmButtonRef={alarmButtonRef}
        />
      </div>
    </div>


    <SidebarAlarmModal
        isAlarm={isAlarm}
        setIsAlarm={setIsAlarm}
        alarmListState={alarmListState}
        setAlarmListState={setAlarmListState}
        setHasNewAlarm={setHasNewAlarm}
        alarmButtonRef={alarmButtonRef}
    />
        
    </div>
    
  );
}