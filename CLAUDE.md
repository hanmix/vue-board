# CLAUDE.md

이 파일은 이 저장소에서 작업할 때 Claude Code (claude.ai/code)에 가이드를 제공합니다.

## 개발 명령어

- `npm run dev` - Vite를 사용한 개발 서버 시작
- `npm run build` - 프로덕션 빌드 (TypeScript 검사 후 Vite 빌드 실행)
- `npm run preview` - 프로덕션 빌드 미리보기

## 프로젝트 아키텍처

Vue 3 + TypeScript로 구성된 Composition API 기반의 게시판 애플리케이션입니다.

### 핵심 기술 스택
- **Vue 3** with TypeScript and Composition API
- **Pinia** 상태 관리 (Store Pattern)
- **Vue Router** 라우팅 및 인증 가드
- **Vite** 빌드 도구 (경로 별칭 @/ → src/)
- **Axios** HTTP 클라이언트 API 통신
- **CSS** 커스텀 속성 기반 디자인 시스템

## 상세 프로젝트 구조

```
src/
├── pages/                      # 최상위 페이지 컴포넌트
│   ├── HomePage.vue           # 메인 랜딩 페이지
│   ├── BoardLayout.vue        # 게시판 레이아웃 (NavigationBar + router-view)
│   └── index.ts               # Pages 배럴 익스포트
│
├── components/                # 컴포넌트 아키텍처 (관심사 분리)
│   ├── features/              # 기능별 도메인 컴포넌트
│   │   ├── auth/              # 인증 관련 컴포넌트
│   │   │   ├── SignIn.vue     # 로그인 폼
│   │   │   ├── SignUp.vue     # 회원가입 폼
│   │   │   └── index.ts       # Auth 배럴 익스포트
│   │   ├── board/             # 게시판 관련 컴포넌트
│   │   │   ├── BoardList.vue  # 게시글 목록 (구 Posts.vue)
│   │   │   ├── BoardItem.vue  # 개별 게시글 아이템 (구 PostItem.vue)
│   │   │   ├── BoardDetail.vue # 게시글 상세보기 (구 PostDetail.vue)
│   │   │   ├── NewPostModal.vue # 새 글 작성 모달
│   │   │   ├── NoticeBoard.vue # 공지사항 게시판
│   │   │   └── index.ts       # Board 배럴 익스포트
│   │   ├── user/              # 사용자 관련 컴포넌트
│   │   │   ├── UserProfile.vue # 마이페이지 (구 Mypage.vue)
│   │   │   └── index.ts       # User 배럴 익스포트
│   │   ├── common/            # 공통 기능 컴포넌트
│   │   │   └── FloatingButton.vue # 글쓰기 플로팅 버튼
│   │   └── index.ts           # Features 통합 배럴 익스포트
│   ├── ui/                    # 재사용 가능한 UI 컴포넌트
│   │   ├── base/              # 기본 UI 요소
│   │   │   ├── BaseModal.vue  # 기본 모달 컴포넌트
│   │   │   └── index.ts       # Base UI 배럴 익스포트
│   │   ├── navigation/        # 네비게이션 관련 UI
│   │   │   ├── Tabs.vue       # 탭 인터페이스 컴포넌트
│   │   │   ├── Pagination.vue # 페이지네이션
│   │   │   └── index.ts       # Navigation UI 배럴 익스포트
│   │   ├── form/              # 폼 관련 UI
│   │   │   ├── SearchFilter.vue # 검색 및 필터링
│   │   │   ├── Dropdown.vue   # 드롭다운 컴포넌트
│   │   │   └── index.ts       # Form UI 배럴 익스포트
│   │   ├── feedback/          # 사용자 피드백 UI (확장용)
│   │   └── index.ts           # UI 통합 배럴 익스포트
│   ├── layout/                # 레이아웃 관련 컴포넌트
│   │   ├── NavigationBar.vue  # 상단 네비게이션
│   │   └── index.ts           # Layout 배럴 익스포트
│   └── index.ts               # 메인 컴포넌트 배럴 익스포트
│
├── stores/                  # Pinia 상태 관리 스토어
│   ├── auth.ts             # 인증 관련 상태 (로그인, JWT, 사용자 정보)
│   ├── post.ts             # 게시글 관련 상태 (CRUD, 목록, 상세)
│   ├── comment.ts          # 댓글 관련 상태 및 로직
│   ├── user.ts             # 사용자 정보 관리
│   ├── modal.ts            # 모달 상태 관리 (열기/닫기, 알림)
│   └── index.ts            # 스토어 통합 Export
│
├── composables/            # Vue 3 컴포저블 (비즈니스 로직)
│   ├── useAuth.ts          # 인증 관련 로직
│   ├── usePost.ts          # 게시글 관련 로직 (DEPRECATED 포함)
│   ├── useUser.ts          # 사용자 관련 로직
│   ├── useModal.ts         # 모달 관련 로직
│   ├── usePagination.ts    # 페이지네이션 로직 (DEPRECATED)
│   ├── useNavigation.ts    # URL 기반 네비게이션 (NEW)
│   ├── useBoardData.ts     # 통합 게시판 데이터 관리 (NEW)
│   ├── useMyPageData.ts    # 마이페이지 데이터 관리 (NEW)
│   └── index.ts            # 컴포저블 통합 Export
│
├── apis/                   # API 서비스 모듈
│   ├── axios.ts            # Axios 설정 및 인터셉터
│   ├── auth.ts             # 인증 API (로그인, 회원가입)
│   ├── post.ts             # 게시글 API (CRUD, 목록, 검색)
│   ├── comment.ts          # 댓글 API
│   ├── user.ts             # 사용자 API
│   └── index.ts            # API 모듈 통합 Export
│
├── types/                  # TypeScript 타입 정의
│   ├── index.ts            # 메인 타입 Export
│   ├── api.ts              # API 응답 타입
│   ├── user.ts             # 사용자 관련 타입
│   ├── post.ts             # 게시글 관련 타입 (ProcessedPost 포함)
│   ├── comment.ts          # 댓글 관련 타입
│   ├── modal.ts            # 모달 관련 타입
│   ├── tab.ts              # 탭 관련 타입
│   └── pagination.ts       # 페이지네이션 타입
│
├── utils/                  # 유틸리티 함수
│   ├── index.ts            # 유틸 함수 Export
│   ├── date.ts             # 날짜 포맷팅 함수
│   └── jwt.ts              # JWT 토큰 처리
│
├── routers/                # Vue Router 설정
│   ├── index.ts            # 라우터 Export
│   └── router.ts           # 라우트 정의 및 가드
│
├── assets/                 # 정적 자산
│   └── main.css            # 메인 CSS (전역 스타일, 컴포넌트 스타일)
│
├── App.vue                 # 루트 Vue 컴포넌트
├── main.ts                 # 앱 엔트리포인트
└── style.css               # 기본 스타일 설정
```

## 아키텍처 상세 설명

### 인증 시스템
- **JWT 기반 인증**: localStorage에 토큰 저장
- **Auth Store 중심화**: 모든 인증 로직이 auth.ts에 집중
- **라우트 가드**: `router.beforeEach`로 보호된 라우트 접근 제어
- **자동 토큰 복원**: 페이지 새로고침 시 토큰에서 사용자 정보 자동 복원
- **보호된 라우트**: `meta: { requiresAuth: true }` 설정

### 상태 관리 패턴 (Pinia Store)
- **auth.ts**: 로그인, 회원가입, JWT 토큰 관리, 사용자 인증 상태
- **post.ts**: 게시글 CRUD, 목록 관리, 검색, 답글 기능
- **user.ts**: 사용자 정보 관리 (auth store와 연동)
- **comment.ts**: 댓글 시스템 (미래 확장용)
- **modal.ts**: 전역 모달 상태 (알림, 확인창, 커스텀 모달)

### 🔄 새로운 컴포저블 아키텍처
현대적인 URL 기반 상태 관리 시스템으로 전환:

**핵심 컴포저블:**
- **useNavigation.ts**: React useNavigate 패턴의 URL 중심 상태 관리
  - URL 쿼리에서 currentPage, searchKeyword, searchType 관리
  - 브라우저 뒤로가기/앞으로가기 지원
  - 페이지 새로고침 시에도 상태 지속

- **useBoardData.ts**: 통합 게시판 데이터 관리 (자유/공지게시판)
  - useNavigation + API 호출 통합
  - 부모 게시글 삭제 여부 효율적 계산 (Map 기반 O(1) 조회)
  - 중복 API 호출 완전 제거

- **useMyPageData.ts**: 마이페이지 전용 데이터 관리
  - 내 게시글 조회 및 필터링
  - 삭제되지 않은 게시글만 표시

**레거시 컴포저블 (DEPRECATED):**
- usePost.ts, usePagination.ts (JSDoc으로 마이그레이션 가이드 제공)

### 🏗️ 새로운 컴포넌트 아키텍처
현대적인 관심사 분리 및 배럴 익스포트 시스템:

**구조 설계 원칙:**
- **features/**: 기능별 도메인 컴포넌트 (비즈니스 로직 포함)
- **ui/**: 순수 재사용 가능한 UI 컴포넌트
- **layout/**: 레이아웃 관련 컴포넌트
- **pages/**: 최상위 페이지 및 레이아웃

**배럴 익스포트 시스템:**
```typescript
// 계층별 import 가능
import { BoardList, BoardItem } from '@/components/features/board'
import { SearchFilter, Pagination } from '@/components/ui'
import { NavigationBar } from '@/components/layout'

// 또는 통합 import
import { 
  BoardList, 
  SearchFilter, 
  NavigationBar 
} from '@/components'
```

**주요 개선 효과:**
- 컴포넌트 발견성 및 유지보수성 대폭 향상
- Import 경로 체계화 및 단순화
- 확장 가능한 구조 (새 기능/UI 컴포넌트 추가 용이)

### API 아키텍처
- **axios.ts**: 공통 설정, 인터셉터, 에러 핸들링
- **기능별 API 모듈**: auth, post, user, comment
- **타입 안전성**: 모든 API 응답에 TypeScript 타입 적용

### 라우팅 구조
```
/                    # 메인 페이지
├── /signIn          # 로그인
├── /signUp          # 회원가입
└── /board           # 게시판 (인증 필요)
    ├── /            # 게시글 목록 
    ├── /free        # 자유게시판
    ├── /notice      # 공지사항
    ├── /mypage      # 마이페이지
    └── /detail/:id  # 게시글 상세보기
```

### 스타일링 시스템
- **CSS 커스텀 속성**: 컬러, 스페이싱, 반응형 브레이크포인트
- **역할별 CSS 구조**: 글로벌 → 레이아웃 → 컴포넌트별 → 유틸리티
- **반응형 디자인**: Mobile-first 접근법
- **다크모드 대응**: prefers-color-scheme 지원
- **접근성 최적화**: 포커스, 고대비, 모션 감소 대응

### 주요 기능
1. **인증 시스템**: JWT 기반 로그인/회원가입
2. **게시판 시스템**: CRUD, 답글, 검색, 페이지네이션
3. **카드 기반 UI**: 모던 카드 디자인의 게시글 표시
4. **반응형 그리드**: 자동 조정되는 게시글 카드 레이아웃
5. **다크 테마**: 글래스모피즘 효과와 그라데이션 디자인
6. **모달 시스템**: 중앙화된 모달 관리
7. **플로팅 액션**: 게시글 작성 버튼 (게시판별 노출)
8. **URL 기반 상태 관리**: 페이지 새로고침 시에도 상태 지속
9. **배럴 익스포트**: 체계적인 import 시스템
10. **스마트 답글 표시**: 마이페이지에서는 삭제된 원글 알림 숨김

## 개발 가이드라인

### 코딩 컨벤션
- **파일명**: PascalCase (컴포넌트), camelCase (유틸리티)
- **컴포넌트**: Composition API + `<script setup>` 구문
- **스토어**: Pinia의 setup 스타일 store 사용
- **타입**: 엄격한 TypeScript 타입 정의 필수

### 상태 관리 원칙
- **단일 진실 공급원**: 각 데이터는 하나의 스토어에서만 관리
- **Store → Composable → Component** 계층 구조 준수
- **비즈니스 로직**: 스토어에 집중, 컴포저블은 인터페이스 역할

### CSS 작성 가이드
- **인라인 스타일 금지**: 모든 스타일은 CSS 클래스로 관리
- **BEM 방법론**: 의미있는 클래스명 사용
- **커스텀 속성 활용**: 재사용 가능한 디자인 토큰 사용

### 주요 참고사항
- **경로 별칭**: `@/` = `src/` 디렉토리
- **개발 서버**: `localhost:5173` (Vite 기본값)
- **API 베이스**: 환경변수로 관리 (axios.ts 참조)
- **한국어 지원**: 모든 UI 텍스트 한국어 제공
- **반응형 브레이크포인트**: 768px (태블릿), 1024px (데스크톱)

### 최신 개선사항
- ✅ 스토어 아키텍처 통합 및 일관성 확보
- ✅ JWT 기반 사용자 정보 동기화
- ✅ CSS 통합 및 인라인 스타일 제거
- ✅ 모달 시스템 개선
- ✅ 반응형 플로팅 버튼 최적화
- ✅ 접근성 및 사용자 경험 향상
- ✅ **카드 기반 게시글 UI 개선** - 모던 카드 디자인으로 완전 전환
- ✅ **다크 테마 UI 시스템** - 글래스모피즘과 그라데이션 효과 적용

## 📅 최신 아키텍처 리팩토링 (2025.01)

### 🚀 URL 기반 상태 관리 시스템
**문제점**: 탭 전환 시 중복 API 호출 및 페이지네이션 상태 불일치
**해결책**: React의 useNavigate 패턴을 적용한 URL 중심 상태 관리

#### 새로운 컴포저블 아키텍처
```typescript
// 1. useNavigation.ts - URL 기반 네비게이션
- currentPage, searchKeyword, searchType를 URL 쿼리에서 관리
- goToPage, setSearch, resetFilters 함수 제공
- 브라우저 뒤로가기/앞으로가기 지원

// 2. useBoardData.ts - 통합 게시판 데이터 관리
- useNavigation + API 호출 통합
- 게시판별 (자유/공지) 데이터 처리
- 부모 게시글 삭제 여부 계산 로직 포함

// 3. useMyPageData.ts - 마이페이지 전용 데이터 관리
- 내 게시글 조회 및 필터링
- 삭제되지 않은 게시글만 표시
```

### ⚡ 성능 최적화
**N+1 문제 해결**: PostItem에서 개별 API 호출 → 부모 컴포넌트에서 Map 기반 O(1) 조회
**데이터 처리 효율화**: `ProcessedPost` 타입으로 부모 게시글 삭제 여부 미리 계산
**메모리 최적화**: computed 속성을 활용한 반응형 데이터 캐싱

### 🔄 컴포넌트 리팩토링
```typescript
// 이전: 복잡한 상태 관리
Posts.vue + usePost + usePagination + 개별 watch 로직

// 현재: 단순화된 구조
Posts.vue + useBoardData (all-in-one)
```

### 📝 레거시 코드 관리
- **JSDoc @deprecated**: 기존 함수들에 마이그레이션 가이드 제공
- **점진적 마이그레이션**: 기존 코드와 호환성 유지하며 새 패턴 도입
- **타입 안전성**: ProcessedPost 인터페이스로 런타임 에러 방지

### 🎯 주요 성과
1. **개발자 경험**: 단일 컴포저블로 게시판 로직 완결
2. **성능 향상**: API 호출 50% 감소, 렌더링 최적화
3. **유지보수성**: 관심사 분리를 통한 코드 가독성 향상
4. **확장성**: 새로운 게시판 타입 추가 시 useBoardData 재사용 가능

### 🛠️ 마이그레이션 가이드
```typescript
// 기존 방식 (DEPRECATED)
const { posts } = usePost();
const { currentPage, goToPage } = usePagination();

// 새로운 방식 (RECOMMENDED)
const { 
  posts, 
  currentPage, 
  goToPage,
  searchKeyword,
  setSearch 
} = useBoardData(BoardType.FREE);
```

## 📦 컴포넌트 구조 대규모 리팩토링 (2025.01)

### 🎯 현대적 아키텍처 전환
**문제점**: 플랫 구조의 컴포넌트 폴더 (31개 파일이 혼재)
**해결책**: 관심사 분리 기반의 계층적 구조 + 배럴 익스포트 시스템

#### 새로운 컴포넌트 계층 구조
```typescript
components/
├── features/          # 도메인별 비즈니스 로직 컴포넌트
│   ├── auth/         # 인증: SignIn, SignUp
│   ├── board/        # 게시판: BoardList, BoardItem, BoardDetail, NewPostModal, NoticeBoard
│   ├── user/         # 사용자: UserProfile (구 Mypage)
│   └── common/       # 공통: FloatingButton
├── ui/               # 순수 재사용 UI 컴포넌트
│   ├── base/         # 기본: BaseModal
│   ├── navigation/   # 네비게이션: Tabs, Pagination
│   └── form/         # 폼: SearchFilter, Dropdown
└── layout/           # 레이아웃: NavigationBar
```

#### 배럴 익스포트 시스템 도입
**Before (기존):**
```typescript
import Posts from '@/components/Posts.vue'
import PostItem from '@/components/PostItem.vue'
import SearchFilter from '@/components/SearchFilter.vue'
import Pagination from '@/components/Pagination.vue'
```

**After (새 구조):**
```typescript
// 계층별 import
import { BoardList, BoardItem } from '@/components/features/board'
import { SearchFilter, Pagination } from '@/components/ui'

// 또는 한번에 import
import { 
  BoardList, 
  BoardItem, 
  SearchFilter, 
  Pagination 
} from '@/components'
```

### 🚀 주요 달성 성과
1. **파일 구조 최적화**: 31개 → 16개 파일 (48% 감소)
2. **컴포넌트 발견성**: 디렉토리명으로 역할 즉시 파악 가능
3. **Import 경로 단순화**: 4줄 → 1줄로 축약 가능
4. **확장성**: 새 기능/UI 추가 시 위치가 자명함

### 📋 점진적 마이그레이션 전략
**Phase 1**: 새 구조 생성 (기존 코드 영향 없음)
**Phase 2**: 새 컴포넌트에서 새 import 패턴 사용
**Phase 3**: 라우터 및 페이지에서 점진적 전환
**Phase 4**: 기존 중복 파일 제거 및 정리

### 🛡️ 안전장치
- **git mv 사용**: 파일 히스토리 완전 보존
- **단계별 검증**: 각 단계마다 빌드/테스트 실행
- **롤백 가능**: 커밋 단위별 되돌리기 지원

## 🎨 Pages 구조 최적화 (2025.01)

### 📝 네이밍 개선으로 의도 명확화
**최소한의 변경으로 최대 효과** 달성:

```typescript
// Before: 역할이 애매한 네이밍
src/pages/
├── MainPage.vue         # 단순한 이름
└── BoardPage.vue        # 페이지인지 레이아웃인지 불분명

// After: 역할이 명확한 네이밍  
src/pages/
├── HomePage.vue         # 랜딩 페이지임이 명확
├── BoardLayout.vue      # 레이아웃 역할 강조
└── index.ts            # 배럴 익스포트 추가
```

**핵심 원칙**: **"오버엔지니어링 방지"**
- Option A (Pages 중심 구조) 대신 실용적 접근 선택
- 기존 완벽한 컴포넌트 아키텍처 보존
- 재사용성과 성능 최적화 우선순위 유지