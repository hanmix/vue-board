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
├── pages/                    # 라우트별 페이지 컴포넌트
│   ├── MainPage.vue         # 메인 홈페이지
│   └── BoardPage.vue        # 게시판 메인 페이지
│
├── components/              # 재사용 가능한 컴포넌트
│   ├── common/              # 공통 컴포넌트
│   │   ├── BaseModal.vue    # 기본 모달 컴포넌트
│   │   └── Tabs.vue         # 탭 인터페이스 컴포넌트
│   ├── FloatingButton.vue   # 글쓰기 플로팅 버튼
│   ├── NavigationBar.vue    # 상단 네비게이션
│   ├── Mypage.vue          # 마이페이지 (사용자 정보, 로그아웃)
│   ├── SignIn.vue          # 로그인 폼
│   ├── SignUp.vue          # 회원가입 폼
│   ├── NewPostModal.vue    # 새 글 작성 모달
│   ├── Posts.vue           # 게시글 목록 컨테이너
│   ├── PostItem.vue        # 개별 게시글 아이템
│   ├── PostDetail.vue      # 게시글 상세보기
│   ├── NoticeBoard.vue     # 공지사항 게시판
│   ├── Pagination.vue      # 페이지네이션
│   └── SearchFilter.vue    # 검색 및 필터링
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
│   ├── usePost.ts          # 게시글 관련 로직
│   ├── useUser.ts          # 사용자 관련 로직
│   ├── useModal.ts         # 모달 관련 로직
│   ├── usePagination.ts    # 페이지네이션 로직
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
│   ├── post.ts             # 게시글 관련 타입
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

### 컴포저블 레이어
컴포저블은 스토어와 컴포넌트 간의 인터페이스 역할:
- 스토어 액션과 상태를 반응형으로 노출
- 비즈니스 로직 재사용성 향상
- 컴포넌트에서 직접 스토어 의존성 제거

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