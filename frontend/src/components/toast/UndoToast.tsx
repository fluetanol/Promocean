"use client";

import { useEffect, useState } from "react";

export interface UndoToastProps {
  message: string;
  onUndo: () => void;
  onClose: () => void;
  duration?: number; // 기본 5초
}

/**
 * UndoToast 컴포넌트
 * @description 되돌리기 기능이 있는 토스트 메시지
 * @param message - 표시할 메시지
 * @param onUndo - 되돌리기 버튼 클릭 시 호출되는 함수
 * @param onClose - 토스트가 자동으로 닫힐 때 호출되는 함수
 * @param duration - 토스트가 표시되는 시간 (밀리초, 기본값: 5000)
 */
export default function UndoToast({
  message,
  onUndo,
  onClose,
  duration = 5000
}: UndoToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // 마운트 시 애니메이션을 위해 약간의 지연
    const showTimer = setTimeout(() => setIsVisible(true), 10);

    // 진행 바 애니메이션
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
    }, 50);

    // 자동 닫기 타이머
    const closeTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // fade-out 애니메이션 후 닫기
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(closeTimer);
      clearInterval(progressInterval);
    };
  }, [duration, onClose]);

  const handleUndo = () => {
    setIsVisible(false);
    setTimeout(() => {
      onUndo();
      onClose();
    }, 200);
  };

  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="bg-gray-800 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-4 min-w-[320px]">
        {/* 메시지 */}
        <span className="flex-1 text-sm font-medium">{message}</span>

        {/* 되돌리기 버튼 */}
        <button
          onClick={handleUndo}
          className="px-4 py-1.5 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-md transition-colors"
        >
          되돌리기
        </button>

        {/* 진행 바 */}
        <div className="absolute bottom-0 left-0 h-1 bg-primary/30 w-full rounded-b-lg overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-50 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
