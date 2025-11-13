// frontend/src/components/layout/SidebarFooter.tsx
'use client';

import React from 'react'
import SidebarItem from '../item/SidebarItem'
import UserCircle from '../icon/UserCircle'
import Cog9Tooth from '../icon/Cog9Tooth'
import ArrowRightStartOnRectangle from '@/components/icon/ArrowRightStartOnRectangle'
import ArrowRightEndOnRectangle from '@/components/icon/ArrowRightEndOnRectangle'
import { useAuthStore } from '@/store/authStore'
import UserSimpleProfile from '@/components/etc/UserSimpleProfile'
import { authAPI } from '@/api/auth'

/**
 * SidebarFooter component
 * @description 회원 관련 정보가 들어간 사이드바 푸터입니다.
 * @returns {React.ReactNode}
 */
export default function SidebarFooter() {

  const { isLoggedIn, user } = useAuthStore();
  const nickname = user?.nickname ?? '마이 페이지';
  const avatarIcon = user?.profileUrl
    ? (<UserSimpleProfile profileUrl={user.profileUrl} nickname={nickname} imageSize="w-5 h-5" showName={false} />)
    : (<UserCircle />);

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };
  
  return (
    <div>
      {isLoggedIn && (
        <SidebarItem 
          icon={avatarIcon}
          title={nickname}
          href="/auth/mypage"
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