# 대쉬보드 MVP 10012- Frontend
주제: 대시보드 페이지 개발

## 개발 인원
### 김민석 - 개인 

##  시작하기

### 사전 요구사항
- **Node.js 20+**
- **npm**

### 설치 및 실행
1. **의존성 설치**
```bash
npm install
```

2. **환경 변수 설정**

`.env` 파일을 생성하고 다음 내용을 입력해주세요

```bash
NEXT_PUBLIC_BACK_URL=https://recruit.paysbypays.com/api/v1
```


3. **개발 서버 실행**

```bash
npm run dev 혹은 npm run start
```

4. **브라우저에서 열기**
```
http://localhost:3000
```

## 💻 개발 가이드

### Path Alias 시스템

TypeScript path alias를 사용하여 깔끔한 import를 지원합니다.

**tsconfig.json 설정**:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
    }
  }
}
```
**사용 예시**:

```typescript
// ❌ 상대 경로 (복잡함)
import { Button } from "../..//src/components/ui/button";

// ✅ Path Alias (깔끔함)
import {CardTitle,
} from "@/components/ui/card";
```

### 스타일
- Tailwind CSS 클래스 사용
- shadcn/ui 컴포넌트 활용
- 본 프로젝트는 Shadcn UI 템플릿을 기반으로 구축되었습니다.
테이블 및 카드 스타일은 템플릿을 활용하였으며 layout에 필요한 부분은 tailwind Css로 변경 하였습니다.


## 🛠 기술 스택
### Core Framework
- **Next.js 16.0.6** - React 프레임워크 (App Router, Server Components)
- **React 19** - UI 라이브러리
- **TypeScript 5** - 타입 안전성

### UI/UX
- **Tailwind CSS 3** - 유틸리티 기반 CSS 프레임워크
- **shadcn/ui** - Radix UI 기반 컴포넌트 라이브러리
- **Lucide React** - 아이콘 라이브러리

### 데이터 시각화
- **Recharts** – 대시보드용 차트/그래프 구현을 위한 React 차트 라이브러리
- 
### 데이터 처리
- **@tanstack/react-query** – 서버 상태 관리 및 비동기 데이터 fetching/캐싱
- **@tanstack/react-query-devtools** – React Query 상태 디버깅 및 개발자 도구
- **Lodash** – 배열/객체/문자열 등 데이터 가공을 위한 유틸리티 함수 라이브러리
  
### 개발 도구
- **ESLint** - 코드 품질 검사
- **Prettier**  - 코드 포매팅

## ✨ 주요 기능
### 대시보드(Dashboard)
- **일주일간 총 거래액**
  - 최근 7일간의 거래 금액 집계
  - 금액 포맷팅 제공 (₩, 천 단위 자동 처리)
- **총 거래 건수**
  - 최근 일주일 거래 건수 카운트
- **승인율(Approval Rate)**
  - 전체 거래 대비 승인된 거래 비율
  - 성공/실패 건수 기반 비율 계산

- **가장 많은 거래 수단**
  - 일주일간 결제 수단별 비율 분석
  - 최다 사용 결제 수단 노출 (온라인, 단말기 등)
### 시각화(Charts)
- **주간 거래액 추이(Line Chart)**
  - 최근 7일 동안의 거래 금액 변화 그래프
  - Recharts 기반 LineChart 구현
  - Y축 금액, X축 날짜
  - 급증/감소 패턴을 빠르게 파악할 수 있도록 구성

- **결제 수단별 비율(Pie Chart)**
  - PieChart 기반 원형 그래프
  - 온라인, 모바일, 단말기, 간편결제 등 수단별 점유율 시각화
  - 색상별 구분 및 퍼센트 표시 제공
- **주간 거래 건수(Bar Chart)**
  - 최근 7일간 거래 건수 비교
  - 날짜별 거래 증가/감소 흐름을 막대 그래프로 표현
### 2. 거래내역(List)
- **전체 거래내역 조회**
  - API를 통해 거래 내역 전체를 불러옴
  - React Query로 데이터 캐싱 및 로딩/에러 상태 처리
  - 테이블 기반 UI로 결제 정보 세부 항목을 직관적으로 제공
- **검색 및 필터링(Search & Filter)**
  - 결제 수단 필터
    - Select Box를 통해 원하는 결제 수단만 조회 가능
    - 온라인, 모바일, 단말기, 가상계좌, 정기결제 등 payType 기준으로 필터링 처리
  - 거래 상태 필터
    - 상태 기준으로 선택 가능
#### 가맹점(Merchant) 페이지
- **가맹점 요약 지표**
  - 전체 가맹점 수
  - 등록된 전체 가맹점 개수 표시
  - 활성 가맹점 수(Active Merchants)
  - 현재 ‘활성’ 상태인 가맹점 수
  - 최대 업종(Major Category)
  - 가장 많이 등록된 업종 표시
- **검색 및 필터링**
  - 검색(Search)
    - 가맹점명을 기준으로 즉시 검색

  - 업종 필터(Category)
    - 업종(카페, 쇼핑몰 등) 선택 필터
    - 모든 업종 보기(전체) 옵션 제공
  - 상태 필터(Status)
    - 활성 / 비활성 가맹점 필터링
    - 상세 조회 시 필요 없는 항목을 제거하고 목록을 간소화할 수 있음
- **가맹점 목록**
  - Table UI를 사용해 한 화면에서 많은 가맹점 데이터를 확인 가능
- **가맹점 상세 정보**
  - 목록에서 특정 가맹점을 클릭하면 오른쪽 패널에 상세 정보 표시
### 3. UI/UX
- **반응형 디자인**
  - 시각화를 통해 사용자 편의성 제공
  - 모바일, 태블릿, 데스크톱 최적화
  - Tailwind Breakpoints 활용
    
