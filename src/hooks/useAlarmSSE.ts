// frontend/src/hooks/useAlarmSSE.ts

import { useEffect, useRef } from 'react';
import { AlarmItemProps } from '@/components/item/AlarmItem';
import { connectAlarmSSE, disconnectAlarmSSE, AlarmEvent } from '@/api/alarm';
import { parseAlarmMessage } from '@/utils/alarmMessageParser';

/**
 * SSE 알람 연결 관리 훅
 * @param setAlarmListState - 알람 목록 업데이트 함수
 * @param setHasNewAlarm - 새 알람 뱃지 표시 함수
 * @param isAlarmModalOpen - 알람 모달 열림 상태
 */
export function useAlarmSSE(
  setAlarmListState: React.Dispatch<React.SetStateAction<AlarmItemProps[]>>,
  setHasNewAlarm: (hasNew: boolean) => void,
  isAlarmModalOpen: boolean
) {
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    /**
     * 알람 메시지 수신 핸들러
     */
    const handleAlarmMessage = (event: AlarmEvent) => {
      const result = parseAlarmMessage(event);

      // 연결 확인 메시지는 무시
      if (result.isConnectionMessage) {
        return;
      }

      // 파싱 실패 시 무시
      if (!result.success || !result.data) {
        return;
      }

      const newAlarm = result.data;
      console.log('➕ 알람 추가:', newAlarm);

      // 알림함이 열려있다면 즉시 목록에 추가
      setAlarmListState((prev: AlarmItemProps[]) => {
        const updated = [newAlarm, ...prev];
        console.log('📋 업데이트된 알람 목록:', updated);
        return updated;
      });

      // 알림함이 닫혀있다면 뱃지 표시
      if (!isAlarmModalOpen) {
        setHasNewAlarm(true);
      }
    };

    /**
     * SSE 에러 핸들러
     */
    const handleAlarmError = () => {
      console.log('ℹ️ SSE 연결 상태 변경 (핸들러)');
    };

    try {
      // SSE 연결 시작
      eventSourceRef.current = connectAlarmSSE(handleAlarmMessage, handleAlarmError);
      console.log('🚀 알람 SSE 연결 시작');
     // console.log('📡 연결 상태:', eventSourceRef.current.readyState);
      //console.log('🌐 연결 URL:', eventSourceRef.current.url);
    } catch (error) {
      console.error('❌ SSE 연결 실패:', error);
    }

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      if (eventSourceRef.current) {
        console.log('🔌 알람 SSE 연결 해제');
        disconnectAlarmSSE(eventSourceRef.current);
        eventSourceRef.current = null;
      }
    };
  }, [setAlarmListState, setHasNewAlarm, isAlarmModalOpen]);

  return {
    isConnected: eventSourceRef.current !== null,
  };
}
