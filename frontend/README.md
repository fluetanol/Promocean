# 🐳 Promocean – 생성형 AI 기반의 프롬프트 공유·관리 플랫폼
Promocean은 생성형 AI 시대에 맞춘 프롬프트 공유·관리·협업 플랫폼입니다.
사용자는 자신의 프롬프트를 공유하고, 관리하고, 팀 단위로 협업하며,
프롬프트 대회를 통해 더 높은 품질의 창작물을 만들어낼 수 있습니다.

또한 Kafka·Redis·ElasticSearch 기반의 실시간 인기글,
SSE 기반의 실시간 알림, LLM 기반의 텍스트/이미지 생성 기능까지 제공하는
풀스택 생성형 AI 서비스입니다.

## 📌 기획 배경

생성형 AI 시대가 열리면서, **프롬프트는 창작물의 품질을 결정하는 핵심 자산**이 되었습니다.  
하지만 다음과 같은 문제들이 존재합니다:

- 개인 프롬프트를 체계적으로 보관하기 어렵고  
- 팀원들과 공유해도 기록이 분산되며  
- 인터넷 커뮤니티는 고품질 프롬프트를 구조적으로 검색하기 어렵고  
- 프로젝트 단위로 프롬프트를 재사용하기 힘들며  
- 협업 가능한 프롬프트 플랫폼은 존재하지 않음  

이에 따라 Promocean은 다음과 같은 경험을 제공하고자 합니다:

### ✅ 프롬프트를 OS처럼 저장하고  
### ✅ 함께 협업하며  
### ✅ 더 많은 사람과 공유하고  
### ✅ 고품질 프롬프트 생태계를 구축하는

**새로운 형태의 생성형 AI 기반 프롬프트 플랫폼**입니다.



# 📌 주요 기능

| 주요 기능 | 상세 설명 |
|----------|-----------|
| **프롬프트 공유 커뮤니티** | 텍스트·이미지 생성 프롬프트 공유, AI 결과물 업로드, 좋아요·댓글·스크랩 제공 |
| **AI 생성 기능 (GPT-4.o / Imagen-3)** | 텍스트·이미지 생성, 예시 답변/질문 자동 생성 |
| **개인 스페이스(My Space)** | 비공개 프롬프트 저장, 개인 스크랩·검색·정렬 기능 제공 |
| **팀 스페이스** | 팀 공간 생성·초대·역할 기반 권한 관리, 공동 작성·수정 |
| **프롬프트 대회 시스템** | 주제별 대회 개최, 제출·투표·랭킹 기능 제공 |
| **고급 검색 시스템** | 제목·본문·태그·카테고리 기반 검색, 오타 허용(fuzzy) 검색 |
| **태그 자동완성** | N-gram 기반 실시간 자동완성 및 관련 태그 추천 |
| **스크랩 관리** | 스크랩한 콘텐츠를 개인 스페이스에 자동 분류·저장 |
| **실시간 알림 (SSE)** | 댓글·초대·대회 공지에 대한 실시간 푸시 제공 |
| **실시간 인기글 (Kafka·Redis)** | 이벤트 기반 점수 계산 및 Redis ZSet 기반 인기글 제공 |
| **반응형 UI** | PC·모바일 환경 모두 최적화된 화면 지원 |

---

# ⚙️ 핵심 기술 구조

## 🛠 기술 요약

| 기술 영역 | 사용한 기술 |
|----------|-------------|
| **Frontend** | Next.js(React), TypeScript, TailwindCSS, Storybook |
| **Backend** | Java 17, Spring Boot 3.5.6, Spring Security, JWT, JPA, QueryDSL |
| **Database / Storage** | PostgreSQL (AWS RDS), Redis(ElasticCache), AWS S3 |
| **Event/Queue** | Apache Kafka |
| **Search Engine** | ElasticSearch + Nori 분석기 + N-gram |
| **Real-time** | SSE 기반 실시간 알림 |
| **Infra** | AWS EC2, Docker, Jenkins, Nginx, CloudWatch |
| **External AI API** | GPT-4.o, Gemini Imagen-3.0 |


# 🧱 시스템 아키텍처

![alt text](<promocean아키텍처.png>)



# 🗂 ERD(Entity Relationship Diagram)

![alt text](<Promocean_25.10.27_.png>)


## 👥 팀 구성

| 👑 전가배 | 이준희 | 이동윤 |
| --- | --- | --- |
| Backend |Backend  | Backend |

| 신예찬 | 이재환  | 정태승 |
| --- | --- | --- |
| Backend | Frontend | Frontend |
