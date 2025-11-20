# 알람 SSE 연결 디버깅 가이드

## 현재 상태
- ✅ SSE 연결 시도 성공
- ⏳ 연결 상태: 0 (CONNECTING) - 서버 응답 대기 중
- ❌ "✅ SSE 연결 성공 (OPEN)" 메시지 없음 → 서버가 응답하지 않음

## Network 탭에서 확인할 것

### 1. Chrome/Edge 개발자 도구 열기
- F12 또는 우클릭 → 검사

### 2. Network 탭 이동
- 상단 탭에서 "Network" 클릭

### 3. 필터 설정
- "EventStream" 또는 "All" 선택

### 4. alarms/connect 요청 찾기
- URL에 `/api/v1/alarms/connect` 포함된 요청 찾기

### 5. 요청 클릭 후 확인

#### A. Status Code 확인
**정상:**
- `200 OK`

**문제 있는 경우:**
- `401 Unauthorized` → 토큰 문제
- `403 Forbidden` → 권한 문제
- `404 Not Found` → 엔드포인트 없음
- `500 Internal Server Error` → 서버 에러
- `(pending)` → 서버가 응답 안함 (현재 상황)

#### B. Response Headers 확인
**반드시 있어야 할 헤더:**
```
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive
```

**없으면:** 서버가 SSE를 지원하지 않거나 잘못 설정됨

#### C. Response 탭 확인
**정상적인 SSE 응답 예시:**
```
data: {"alarmId":123,"message":"새로운 댓글","category":"스페이스","createdAt":"2025-01-17"}

data: {"alarmId":124,"message":"좋아요 알림","category":"커뮤니티","createdAt":"2025-01-17"}
```

**또는:**
```
: heartbeat

: heartbeat
```
(하트비트만 오는 경우 - 연결은 정상이나 알람 이벤트가 없음)

#### D. EventStream 탭 확인 (Chrome)
- 실시간으로 수신되는 이벤트 확인
- 댓글 작성 시 이벤트가 추가되는지 확인

## 가능한 문제와 해결책

### 문제 1: Status가 (pending)인 경우
**원인:** 서버가 SSE 엔드포인트를 응답하지 않음
**해결책:**
1. 백엔드 개발자에게 `/api/v1/alarms/connect` 엔드포인트 구현 확인 요청
2. 서버 로그 확인 (요청이 도달하는지)
3. CORS 설정 확인

### 문제 2: 401 Unauthorized
**원인:** 토큰이 유효하지 않거나 만료됨
**해결책:**
1. 로그아웃 후 다시 로그인
2. 콘솔에서 토큰 확인: `localStorage.getItem('auth_token')`

### 문제 3: Content-Type이 text/event-stream이 아닌 경우
**원인:** 백엔드에서 일반 HTTP 응답으로 처리
**해결책:**
- 백엔드에서 SSE 응답 헤더 설정 필요
```java
// Spring Boot 예시
@GetMapping(value = "/alarms/connect", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
public SseEmitter connect(@RequestParam String token) {
    // SSE 구현
}
```

### 문제 4: 연결은 되지만 이벤트가 안 오는 경우
**원인:** 백엔드에서 이벤트를 전송하지 않음
**해결책:**
1. 백엔드에서 댓글 작성 시 SSE 이벤트 전송 로직 확인
2. 서버 로그에서 이벤트 전송 로그 확인

## 백엔드 개발자에게 전달할 정보

### SSE 엔드포인트 요구사항
```
Endpoint: GET /api/v1/alarms/connect
Query Parameter: token (인증 토큰)
Response Headers:
  - Content-Type: text/event-stream
  - Cache-Control: no-cache
  - Connection: keep-alive

Response Format:
data: {"alarmId":123,"message":"새로운 댓글이 달렸습니다.","category":"스페이스","createdAt":"2025-01-17 12:34"}

data: {"alarmId":124,"message":"좋아요를 받았습니다.","category":"커뮤니티","createdAt":"2025-01-17 12:35"}
```

### 이벤트 전송 시점
- 사용자의 게시글/댓글에 새 댓글이 달렸을 때
- 좋아요를 받았을 때
- 스크랩되었을 때
- 기타 알림이 필요한 이벤트 발생 시

## 임시 테스트 방법

### 1. Postman/Insomnia로 SSE 테스트
```
GET https://promocean.co.kr/api/v1/alarms/connect?token=YOUR_TOKEN
Headers:
  Accept: text/event-stream
```

### 2. curl로 테스트
```bash
curl -N -H "Accept: text/event-stream" \
  "https://promocean.co.kr/api/v1/alarms/connect?token=YOUR_TOKEN"
```

연결이 성공하면 이벤트가 실시간으로 출력됨

## 다음 단계

1. **Network 탭 확인 결과 공유**
2. **백엔드 팀과 SSE 구현 상태 확인**
3. **필요시 백엔드 구현 완료 후 재테스트**
