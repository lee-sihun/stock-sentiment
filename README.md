# 👀 DeepEye!

[🔗 서비스 바로가기](https://deepeye.pro)  
주식의 뉴스 기사를 LLM으로 감정 분석하여 제공하는 실시간 주식 모니터링 서비스입니다.

## 📌 프로젝트 소개

DeepEye는 주요 기업들의 실시간 주가 정보와 함께, LLM을 활용한 뉴스 기사 감정 분석 결과를 제공합니다. 투자자들이 보다 객관적이고 정확한 시장 동향을 파악할 수 있도록 돕습니다.

### 주요 기능

- **실시간 주가 모니터링**: Yahoo Finance API를 통한 실시간 주가 데이터 제공
- **LLM 기반 뉴스 분석**: DeepSeek/chat 모델을 활용한 뉴스 기사 감정 분석
- **포트폴리오 관리**:
  - 비로그인: LocalStorage를 활용한 관심 종목 관리
  - 로그인: Supabase DB를 활용한 관심 종목 관리
- **소셜 로그인**: Next-Auth를 활용한 Google OAuth 인증
- **낙관적 업데이트**: React Query를 활용한 즉각적인 UI 피드백
- **종목 검색**: 자동완성이 지원되는 검색 기능
- **상세 정보 제공**: 개별 종목의 상세 정보와 분석 결과 제공

## 🛠 기술 스택

### Frontend

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **State Management**:
  - Zustand (클라이언트 상태)
  - React Query (서버 상태)
- **Authentication**: Next-Auth
- **Styling**: Tailwind CSS
- **Charts**: Recharts

### Backend

- **Architecture**: Serverless Architecture (Vercel)
- **API**: Next.js 15 Route Handlers
- **Database**: Supabase (PostgreSQL)
- **AI/ML**:
  - OpenRouter(OpenAI 호환) API
  - deepseek/deepseek-chat 모델 사용
- **CI/CD & Deploy**: Vercel
- **Scheduling**: GitHub Actions (Cron Jobs)

## 🌟 주요 특징

### 최적화된 사용자 경험

- **반응형 디자인**: 모바일, PC에서 최적화된 UI/UX 제공
- **성능 최적화**:
  - 무한 스크롤 (React Query Infinite Query)
  - 스켈레톤 로딩 UI
  - 데이터 캐싱 전략
- **낙관적 업데이트**:
  - React Query의 useMutation 활용
  - 즉각적인 UI 피드백 제공
  - 실패 시 자동 롤백

### 데이터 관리

- **포트폴리오(즐겨찾기) 관리**:
  - 비로그인:
    - LocalStorage를 활용한 관심 종목 관리
    - Zustand persist 미들웨어로 상태 유지
  - 로그인:
    - Supabase DB를 활용한 서버 동기화
    - React Query로 서버 상태 관리
  - 상태에 따른 자동 전환
- **인증**:
  - Next-Auth를 활용한 Google OAuth 인증
  - 서버사이드 세션 검증
- **데이터 동기화**:
  - React Query를 활용한 서버 상태 관리
  - 실시간 데이터 갱신

### 데이터 처리

- Yahoo Finance API를 통한 실시간 주가 데이터 업데이트
- GitHub Actions를 활용한 정기적인 뉴스 수집 및 감정 분석 (매일 22:00(KST)마다 수행)
- 서버리스 아키텍처를 통한 확장성 있는 데이터 처리

### AI/ML 통합

- LLM을 활용한 뉴스 기사 헤드라인 감정 분석
- 분석 결과 시각화

## 🔄 향후 개선 계획

- 유사한 내용의 기사 필터링, 추론 LLM 모델 도입으로 분석 정확도 개선
- Cron Jobs 주기를 단축해 최신 데이터를 제공할 수 있도록 개선
- 종목별 댓글 기능 구현
- 라이트 모드 지원

## 👥 Contributors

### Developer

- [이시훈](https://github.com/lee-sihun) - 풀스택 개발, 기획 

### Designer

- [연우](https://github.com/yeonu-me) - UI/UX 디자인, 기획
