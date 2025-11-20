// frontend/src/components/layout/SidebarFooter.tsx

'use client';

import React from 'react'
import SidebarItem from '../item/SidebarItem'
import UserCircle from '../icon/UserCircle'
import ArrowRightStartOnRectangle from '@/components/icon/ArrowRightStartOnRectangle'
import ArrowRightEndOnRectangle from '@/components/icon/ArrowRightEndOnRectangle'
import { useAuthStore } from '@/store/authStore'
import UserSimpleProfile from '@/components/etc/UserSimpleProfile'
import { authAPI } from '@/api/auth'
import { SidebarItemProps } from '@/types/itemType'
import { AlarmItemProps } from '../item/AlarmItem'
import { getAlarmList } from '@/api/alarm'
import { usePathname } from 'next/navigation'

interface SidebarFooterProps {
  alarmItems: SidebarItemProps[]
  isAlarm: boolean
  setIsAlarm: (isAlarm: boolean) => void
  setAlarmList: (list: AlarmItemProps[]) => void
  hasNewAlarm: boolean
  setHasNewAlarm: (hasNew: boolean) => void
  alarmButtonRef?: React.RefObject<HTMLButtonElement | null>
}

/**
 * SidebarFooter component
 * @description 회원 관련 정보가 들어간 사이드바 푸터입니다.
 * @returns {React.ReactNode}
 */
export default function SidebarFooter({ 
  alarmItems, 
  isAlarm, 
  setIsAlarm, 
  setAlarmList, 
  hasNewAlarm, 
  setHasNewAlarm, 
  alarmButtonRef 
}: SidebarFooterProps) {

  const { isLoggedIn, user } = useAuthStore();
  const pathname = usePathname();
  const nickname = user?.nickname ?? '마이 페이지';
  const avatarIcon = user?.profileUrl
    ? (<UserSimpleProfile profileUrl={user.profileUrl} nickname={nickname} imageSize="w-5 h-5" showName={false} />)
    : (<UserCircle />);

  // 현재 경로가 특정 메뉴와 일치하는지 확인하는 함수
  const isActiveRoute = (href: string) => {
    if (!pathname) return false;
    if (pathname === href) return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  const handleAlarmClick = async () => {
    setIsAlarm(!isAlarm);

    // 알림 모달을 여는 순간 뱃지 제거
    if(!isAlarm){
      const res = await getAlarmList();
      console.log('알람 리스트 조회 결과:', res);
      setAlarmList(res.alarms);
      setHasNewAlarm(false); // 알림 열면 뱃지 제거
    }
  };
  
  return (
    <div className="flex flex-col gap-0.5">
      {isLoggedIn && (
        <SidebarItem 
          icon={avatarIcon}
          title={nickname}
          href="/auth/mypage"
          isActive={isActiveRoute('/auth/mypage')}
        />
      )}

      {/* 알림 - 유저 프로필과 로그인 사이 */}
      {isLoggedIn && alarmItems.length > 0 && (
        <SidebarItem
          icon={alarmItems[0].icon}
          title={alarmItems[0].title}
          onClick={handleAlarmClick}
          showBadge={hasNewAlarm}
          isActive={isAlarm}
          buttonRef={alarmButtonRef}
        />
      )}

      {/* Todo: 설정 필요 없으면 제거하기 */}
      {/* {isLoggedIn && (
      <SidebarItem 
        icon={<Cog9Tooth />}
        title="설정"
        href="/settings"
      />
      )} */}
      {isLoggedIn && (
        <SidebarItem 
          icon={<ArrowRightStartOnRectangle />}
          title="로그아웃"
          onClick={handleLogout}
        />
      )}

      {!isLoggedIn && (
        <SidebarItem 
          icon={<ArrowRightEndOnRectangle />}
          title="로그인"
          href="/auth/login?tab=login"
        />
      )}
    </div>
  )
}