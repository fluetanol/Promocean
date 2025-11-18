import { useSidebar } from "@/contexts/SidebarContext";
import AlarmItem, { AlarmItemProps } from "../item/AlarmItem";
import { DeleteIcon } from "lucide-react";
import TrashDeleteIcon from "../icon/TrashDeleteIcon";
import { useState, useRef, useCallback, useEffect } from "react";
import AlarmList from "../list/AlarmList";
import AlarmModalHeader from "../layout/AlarmModalHeader";
import XCircle from "../icon/XCircle";
import AlarmModalSmallHeader from "../layout/AlarmModalSmallHeader";
import { connectAlarmSSE, disconnectAlarmSSE, AlarmEvent, deleteAlarm, deleteAllAlarms } from "@/api/alarm";


export interface SidebarAlarmModalProps {
    alarmListState: AlarmItemProps[];
    setAlarmListState: React.Dispatch<React.SetStateAction<AlarmItemProps[]>>;
    isAlarm: boolean;
    setIsAlarm: (isAlarm:boolean) => void;
    setHasNewAlarm: (hasNew: boolean) => void;
    alarmButtonRef?: React.RefObject<HTMLButtonElement | null>;
}


export default function SidebarAlarmModal({
    alarmListState = [],
    setAlarmListState,
    isAlarm,
    setIsAlarm,
    setHasNewAlarm,
    alarmButtonRef

}: SidebarAlarmModalProps) {

    const { isCollapsed } = useSidebar();


    // 리사이즈 관련 상태
    const [width, setWidth] = useState(384); // 기본값 24rem = 384px
    const [isResizingState, setIsResizingState] = useState(false);
    const [isRemoveModeState, setIsRemoveModeState] = useState(false);

    // 개별 알람 선택 상태 관리 (alarmId를 key로 사용)
    const [selectedAlarms, setSelectedAlarms] = useState<Set<number>>(new Set());

    const resizeRef = useRef<HTMLDivElement>(null);
    const isResizingRef = useRef(false);

    const MIN_WIDTH = 240; // 15rem
    const MAX_WIDTH = 448; // 28rem

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        isResizingRef.current = true;
        setIsResizingState(true);
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isResizingRef.current || !resizeRef.current) return;

        const containerLeft = resizeRef.current.getBoundingClientRect().left;
        const newWidth = e.clientX - containerLeft;

        // 최소/최대 폭 제한
        if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
            setWidth(newWidth);
        }
    }, []);

    const handleMouseUp = useCallback(() => {
        isResizingRef.current = false;
        setIsResizingState(false);
    }, []);

    // 마우스 이벤트 리스너 등록
    useEffect(() => {
        if (isResizingState) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isResizingState, handleMouseMove, handleMouseUp]);

    const handleRemoveClick = () => {
        // 알림 삭제 로직 구현
        console.log("알림 삭제 클릭됨");
        setIsRemoveModeState(!isRemoveModeState);
        // 삭제 모드 해제 시 선택 상태 초기화
        if (isRemoveModeState) {
            setSelectedAlarms(new Set());
        }
    };

    const handleRemoveAllClick = () => {
        // 전체 선택/해제 토글
        if (selectedAlarms.size === alarmListState.length) {
            // 모두 선택된 상태 -> 전체 해제
            setSelectedAlarms(new Set());
        } else {
            // 일부만 선택되거나 아무것도 선택 안 됨 -> 전체 선택
            setSelectedAlarms(new Set(alarmListState.map(alarm => alarm.alarmId)));
        }
    };

    const handleAlarmToggle = (alarmId: number) => {
        setSelectedAlarms(prev => {
            const newSet = new Set(prev);
            if (newSet.has(alarmId)) {
                newSet.delete(alarmId);
            } else {
                newSet.add(alarmId);
            }
            return newSet;
        });
    };

    // 알람 삭제 핸들러
    const handleDeleteSelectedAlarms = async () => {
        if (selectedAlarms.size === 0) {
            console.log('삭제할 알람이 선택되지 않았습니다.');
            return;
        }

        try {
            // 전체 선택된 경우 전체 삭제 API 호출
            if (selectedAlarms.size === alarmListState.length) {
                console.log('🗑️ 전체 알람 삭제 중...');
                await deleteAllAlarms();
                console.log('✅ 전체 알람 삭제 완료');

                // 상태 업데이트
                setAlarmListState([]);
                setSelectedAlarms(new Set());
            } else {
                // 개별 삭제 - Promise.all로 병렬 처리
                console.log(`🗑️ ${selectedAlarms.size}개의 알람 삭제 중...`);
                const deletePromises = Array.from(selectedAlarms).map(alarmId =>
                    deleteAlarm(alarmId)
                );

                await Promise.all(deletePromises);
                console.log('✅ 선택된 알람 삭제 완료');

                // 상태 업데이트: 삭제된 알람을 제외한 목록으로 업데이트
                setAlarmListState(prev =>
                    prev.filter(alarm => !selectedAlarms.has(alarm.alarmId))
                );
                setSelectedAlarms(new Set());
            }

            // 삭제 모드 해제
            setIsRemoveModeState(false);
        } catch (error) {
            console.error('❌ 알람 삭제 실패:', error);
            alert('알람 삭제 중 오류가 발생했습니다.');
        }
    };

    // SSE 연결 설정
    useEffect(() => {
        let eventSource: EventSource | null = null;

        const handleAlarmMessage = (event: AlarmEvent) => {
            console.log('🔔 알람 핸들러 호출됨:', event);

            try {
                // SSE 연결 확인 메시지는 무시
                if (event.data === 'EventStream Created') {
                    console.log('✅ SSE 연결 확인 메시지 수신');
                    return;
                }

                // 서버에서 보낸 데이터 파싱 (JSON 형식으로 가정)
                console.log('📦 파싱 전 데이터:', event.data);
                console.log('📦 파싱 전 데이터 타입:', typeof event.data);

                // JSON 파싱 시도
                let parsedData;
                try {
                    parsedData = JSON.parse(event.data);
                    console.log('✅ 1차 파싱된 데이터:', parsedData);

                    // 이중 인코딩 체크: 파싱 결과가 문자열이면 한번 더 파싱
                    if (typeof parsedData === 'string') {
                        console.log('🔄 이중 인코딩 감지, 2차 파싱 시도');
                        parsedData = JSON.parse(parsedData);
                        console.log('✅ 2차 파싱된 데이터:', parsedData);
                    }
                } catch (parseError) {
                    console.error('❌ JSON 파싱 실패:', parseError);
                    return;
                }

                // 중첩된 데이터 구조 처리: 실제 알람 데이터는 data 필드 안에 있음
                const alarmData = parsedData.data || parsedData;
                console.log('✅ 최종 파싱된 데이터:', alarmData);
                console.log('✅ category:', alarmData.category);

                // 유효성 검증: 빈 객체 체크
                if (!alarmData || typeof alarmData !== 'object' || Object.keys(alarmData).length === 0) {
                    console.warn('⚠️ 빈 객체 또는 유효하지 않은 데이터 무시:', alarmData);
                    return;
                }

                // 유효성 검증: 필수 필드 확인
                if (!alarmData.category || alarmData.alarmId === undefined) {
                    console.error('❌ 필수 필드가 누락된 알람:', alarmData);
                    return;
                }

                // 카테고리별 필수 필드 확인
                const isValidAlarm =
                    (alarmData.category === 'POST_REPLY' && alarmData.postId !== undefined && alarmData.replyId !== undefined) ||
                    (alarmData.category === 'CONTEST_NOTICE' && alarmData.contestId !== undefined && alarmData.noticeId !== undefined) ||
                    (alarmData.category === 'TEAM_INVITATION' && alarmData.spaceId !== undefined);

                if (!isValidAlarm) {
                    console.error('❌ 카테고리별 필수 필드가 누락된 알람:', alarmData);
                    return;
                }

                // 새 알람을 목록에 추가
                const newAlarm: AlarmItemProps = {
                    alarmId: alarmData.alarmId,
                    message: alarmData.message,
                    category: alarmData.category,
                    createdAt: alarmData.createdAt || new Date().toISOString(),
                    spaceId: alarmData.spaceId,
                    contestId: alarmData.contestId,
                    noticeId: alarmData.noticeId,
                    postId: alarmData.postId,
                    replyId: alarmData.replyId,
                };

                console.log(newAlarm)

                console.log('➕ 알람 추가:', newAlarm);

                // 알림함이 열려있다면 즉시 목록에 추가
                setAlarmListState((prev : AlarmItemProps[]) => {
                    const updated = [newAlarm, ...prev];
                    console.log('📋 업데이트된 알람 목록:', updated);
                    return updated;
                });

                // 알림함이 닫혀있다면 뱃지 표시
                if (!isAlarm) {
                    setHasNewAlarm(true);
                }
            } catch (error) {
                console.error('❌ 알람 데이터 파싱 실패:', error);
                console.error('원본 데이터:', event.data);
            }
        };

        const handleAlarmError = () => {
            console.log('ℹ️ SSE 연결 상태 변경 (핸들러)');
        };

        try {
            // SSE 연결 시작
            eventSource = connectAlarmSSE(handleAlarmMessage, handleAlarmError);
            console.log('🚀 알람 SSE 연결 시작');
            console.log('📡 연결 상태:', eventSource.readyState);
            console.log('🌐 연결 URL:', eventSource.url);
        } catch (error) {
            console.error('❌ SSE 연결 실패:', error);
        }

        // 컴포넌트 언마운트 시 연결 해제
        return () => {
            if (eventSource) {
                console.log('🔌 알람 SSE 연결 해제');
                disconnectAlarmSSE(eventSource);
            }
        };
    }, [setAlarmListState, setHasNewAlarm, isAlarm]); // isAlarm 상태를 의존성에 추가



    // 바깥 클릭 감지
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isAlarm) return;

        const handleClickOutside = (e: MouseEvent) => {
            // 알림 버튼 클릭은 무시
            if (alarmButtonRef?.current && alarmButtonRef.current.contains(e.target as Node)) {
                return;
            }

            // 모달 외부를 클릭했는지 확인
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                setIsAlarm(false);
            }
        };

        // 약간의 지연을 두고 이벤트 리스너 등록 (모달이 열리는 클릭과 충돌 방지)
        const timeoutId = setTimeout(() => {
            document.addEventListener('mousedown', handleClickOutside);
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isAlarm, setIsAlarm, alarmButtonRef]);

    return(
    <div
        ref={(node) => {
            if (modalRef) modalRef.current = node;
            if (resizeRef) resizeRef.current = node;
        }}
        className ={`
       fixed ${ isCollapsed ? 'left-16' : 'left-58'}
       ${ isAlarm ? 'p-2' : 'p-0'}
       h-screen
       flex flex-col z-50
       overflow-hidden shrink-0
        bg-[#fdfdfc]
        border-r border-gray-200
       ` }
       style={{
        width: isAlarm ? `${width}px` : '0px',
        transition: isResizingState ? 'none' : 'width 200ms, padding 200ms'
       }}
       >
 
             <AlarmModalHeader handleRemoveClick={handleRemoveClick}/>

             <AlarmModalSmallHeader
                isRemoveModeState={isRemoveModeState}
                selectedAlarms={selectedAlarms}
                alarmListState={alarmListState}
                handleRemoveAllClick={handleRemoveAllClick}
                handleDeleteClick={handleDeleteSelectedAlarms}
             />

            <AlarmList
                alarmListState={alarmListState}
                isRemove={isRemoveModeState}
                selectedAlarms={selectedAlarms}
                onAlarmToggle={handleAlarmToggle}
            />

            {/* 리사이즈 핸들 */}
            {isAlarm && (
                <div
                    onMouseDown={handleMouseDown}
                    className={`
                        absolute top-0 right-0 w-2 h-full z-100
                        cursor-ew-resize hover:bg-primary
                        transition-colors duration-150
                        ${isResizingState ? 'bg-primary' : 'bg-transparent'}
                    `}
                />
            )}

       </div>
    );

}