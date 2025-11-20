'use client';

// frontend/src/contexts/SidebarContext.tsx

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface SidebarContextType {
  isCollapsed: boolean;
  showText: boolean;
  isCollapsing: boolean;
  toggleSidebar: () => void;
  onTransitionEnd: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

/**
 * SidebarProvider component
 * @description 사이드바 상태 관리 컨텍스트입니다.
 * @param {ReactNode} children - The children of the SidebarProvider component
 * @returns {ReactNode}
 */
export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showText, setShowText] = useState(true); // 초기 상태: 펼쳐져 있으면 텍스트도 보임
  const [isExpanding, setIsExpanding] = useState(false); // 펼쳐지는 중인지 추적
  const [isCollapsing, setIsCollapsing] = useState(false); // 접는 중인지 추적

  // state 0 : 닫힌 상태, 1 : 펼쳐지는 중, 2 : 펼쳐진 상태
  const toggleSidebar = () => {

    if (isCollapsed) {
      // 0 -> 1 -> 2: 펼치기
      setShowText(false); // 먼저 텍스트 숨김
      setIsExpanding(true); // 펼쳐지는 중 플래그 설정
      setIsCollapsing(false); // 접는 중 플래그 초기화
      setIsCollapsed(false); // 사이드바 펼치기 시작

    } else {
      // 2 -> 0: 접기
      setIsExpanding(false); // 펼쳐지는 중 플래그 초기화
      setIsCollapsing(true); // 접는 중 플래그 설정
      setShowText(false); // 먼저 텍스트 숨김
      setIsCollapsed(true); // 사이드바 접기 시작
    }
  };

  const onTransitionEnd = useCallback(() => {
    // transition이 완전히 끝난 후에만 텍스트 표시 또는 접기 완료 처리
    if (isExpanding && !isCollapsed) {
      setShowText(true);
      setIsExpanding(false);
    }
    if (isCollapsing && isCollapsed) {
      setIsCollapsing(false);
    }
  }, [isExpanding, isCollapsing, isCollapsed]);

  React.useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', isCollapsed ? '4rem' : '13rem');
  }, [isCollapsed]);

  return (
    <SidebarContext.Provider value={{ isCollapsed, showText, isCollapsing, toggleSidebar, onTransitionEnd }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
