# CLAUDE.md

이 파일은 Vue 3 + TypeScript 프로젝트에서 Claude Code (claude.ai/code)가 작업할 때 따라야 할 아키텍처 가이드입니다.

## 개발 명령어

- `npm run dev` - Vite를 사용한 개발 서버 시작
- `npm run build` - 프로덕션 빌드 (TypeScript 검사 후 Vite 빌드 실행)
- `npm run preview` - 프로덕션 빌드 미리보기

## 프로젝트 아키텍처 원칙

Vue 3 + TypeScript Composition API 기반의 현대적 프론트엔드 아키텍처입니다.

### 핵심 기술 스택

- **Vue 3** with TypeScript and Composition API
- **Pinia** 상태 관리 (Store Pattern)
- **Vue Router** 라우팅 및 인증 가드
- **Vite** 빌드 도구 (경로 별칭 @/ → src/)
- **Axios** HTTP 클라이언트 API 통신
- **CSS** 커스텀 속성 기반 디자인 시스템

### 설계 원칙

1. **관심사 분리**: 기능, UI, 레이아웃 계층적 구조
2. **단일 진실 공급원**: 각 데이터는 하나의 스토어에서만 관리
3. **URL 기반 상태 관리**: 브라우저 기본 동작과 조화
4. **배럴 익스포트**: 체계적인 import 시스템
5. **타입 안전성**: 엄격한 TypeScript 적용
6. **HTML 구조 최적화**: 불필요한 wrapper div 제거를 통한 DOM 깊이 최소화

## 표준 프로젝트 구조

```
src/
├── pages/                    # 최상위 페이지 및 레이아웃 컴포넌트
│   ├── HomePage.vue         # 메인 홈페이지
│   ├── BoardLayout.vue      # 게시판 레이아웃 (라우터 뷰 포함)
│   └── index.ts             # Pages 배럴 익스포트
│
├── components/              # 컴포넌트 아키텍처 (관심사 분리)
│   ├── features/            # 도메인별 비즈니스 로직 컴포넌트
│   │   ├── auth/            # 인증: SignIn, SignUp (+ CSS)
│   │   ├── board/           # 게시판: BoardList, BoardItem, BoardDetail, NewPostModal, NoticeBoard (+ CSS)
│   │   ├── user/            # 사용자: UserProfile
│   │   ├── common/          # 공통: FloatingButton (+ CSS)
│   │   └── index.ts         # Features 통합 배럴 익스포트
│   ├── ui/                  # 순수 재사용 UI 컴포넌트
│   │   ├── navigation/      # 네비게이션: Tabs, Pagination (+ CSS)
│   │   ├── form/            # 폼: SearchFilter (+ CSS)
│   │   └── index.ts         # UI 통합 배럴 익스포트
│   ├── layout/              # 레이아웃: NavigationBar (+ CSS)
│   └── index.ts             # 메인 컴포넌트 배럴 익스포트
│
├── stores/                  # Pinia 상태 관리
│   ├── auth.ts              # 인증 상태 (JWT, 사용자 정보)
│   ├── post.ts              # 게시글 상태 (CRUD, 목록)
│   ├── user.ts              # 사용자 정보
│   ├── modal.ts             # 모달 상태
│   ├── comment.ts           # 댓글 상태
│   └── index.ts             # 스토어 통합 익스포트
│
├── composables/             # Vue 3 컴포저블 (비즈니스 로직)
│   ├── useAuth.ts           # 인증 로직
│   ├── useNavigation.ts     # URL 기반 네비게이션
│   ├── useBoardData.ts      # 통합 게시판 데이터 관리
│   ├── useMyPageData.ts     # 마이페이지 데이터 관리
│   ├── useModal.ts          # 모달 로직
│   ├── useBreakpoint.ts     # 반응형 브레이크포인트
│   ├── usePagination.ts     # 페이지네이션 로직
│   ├── usePost.ts           # 게시글 로직
│   ├── useUser.ts           # 사용자 로직
│   └── index.ts             # 컴포저블 통합 익스포트
│
├── apis/                    # API 서비스 모듈
│   ├── axios.ts             # Axios 설정 및 인터셉터
│   ├── auth.ts              # 인증 API
│   ├── post.ts              # 게시글 API
│   ├── user.ts              # 사용자 API
│   ├── comment.ts           # 댓글 API
│   └── index.ts             # API 모듈 통합 익스포트
│
├── types/                   # TypeScript 타입 정의
│   ├── api.ts               # API 응답 타입
│   ├── user.ts              # 사용자 타입
│   ├── post.ts              # 게시글 타입 (ProcessedPost 포함)
│   ├── modal.ts             # 모달 타입
│   ├── comment.ts           # 댓글 타입
│   ├── navigate.ts          # 네비게이션 타입 (RouteName, BoardType, 매핑 유틸리티)
│   ├── pagination.ts        # 페이지네이션 타입 (SearchType 포함)
│   ├── tab.ts               # 탭 관련 타입
│   └── index.ts             # 타입 통합 익스포트
│
├── utils/                   # 유틸리티 함수
│   ├── date.ts              # 날짜 포맷팅
│   ├── jwt.ts               # JWT 토큰 처리
│   ├── constants.ts         # 상수 정의
│   └── index.ts             # 유틸 함수 익스포트
│
├── routers/                 # Vue Router 설정
│   ├── index.ts             # 라우터 및 라우트 정의
│   └── router.ts            # 라우터 인스턴스
│
├── design-system/           # 디자인 시스템
│   ├── components/          # 재사용 가능한 UI 컴포넌트 (+ CSS Co-location)
│   │   ├── base/            # 기본: VButton, VCard, VModal, VAlert, VIcon, VDropdown, VToastContainer
│   │   ├── feedback/        # 피드백: VErrorMessage, VLoadingSpinner
│   │   ├── layout/          # 레이아웃: VContainer
│   │   └── index.ts         # 디자인 시스템 컴포넌트 익스포트
│   ├── composables/         # 디자인 시스템 관련 컴포저블
│   │   ├── useTheme.ts      # 테마 전환 로직
│   │   ├── useToast.ts      # 토스트 알림 로직
│   │   └── index.ts         # 컴포저블 익스포트
│   ├── styles/              # 글로벌 스타일
│   │   ├── index.css        # 메인 스타일 진입점
│   │   └── base.css         # 기본 스타일
│   ├── tokens/              # 디자인 토큰 (CSS Custom Properties)
│   │   ├── colors.css       # 색상 토큰
│   │   ├── typography.css   # 타이포그래피 토큰
│   │   ├── spacing.css      # 간격 토큰
│   │   ├── effects.css      # 효과 토큰
│   │   └── index.css        # 통합 토큰 익스포트
│   └── index.ts             # 디자인 시스템 통합 익스포트
│
├── views/                   # 테스트 및 실험용 뷰
│   ├── TestDesignSystem.vue # 디자인 시스템 테스트
│   └── TestNestedTransition.vue # 전환 테스트
│
├── assets/                  # 정적 자산
│   ├── styles/              # (CSS Co-location으로 대부분 이동됨)
│   └── vue.svg              # Vue 로고
│
├── App.vue                  # 루트 컴포넌트
├── main.ts                  # 앱 엔트리포인트
├── style.css                # 기본 스타일
├── shims-vue.d.ts          # Vue 타입 선언
└── vite-env.d.ts           # Vite 환경 타입
```

## 핵심 아키텍처 패턴

### 1. 컴포넌트 아키텍처 (관심사 분리)

**3-Layer 구조 원칙:**

```typescript
components/
├── features/      # 도메인별 비즈니스 로직 컴포넌트
├── ui/           # 순수 재사용 UI 컴포넌트
└── layout/       # 레이아웃 컴포넌트
```

**배럴 익스포트 시스템:**

```typescript
// 계층별 import
import { BoardList, BoardItem } from '@/components/features/board';
import { SearchFilter, Pagination } from '@/components/ui';

// 통합 import
import { BoardList, SearchFilter } from '@/components';
```

**핵심 이점:**

- 컴포넌트 역할과 위치 명확화
- Import 경로 단순화 및 체계화
- 확장성 (새 기능 추가 시 위치 자명)

### 2. 상태 관리 (Pinia Store Pattern)

**Store → Composable → Component 계층:**

```typescript
// Store: 데이터와 비즈니스 로직
export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const login = async credentials => {
    /* ... */
  };
});

// Composable: Store 인터페이스 + 추가 로직
export const useAuth = () => {
  const store = useAuthStore();
  const isAuthenticated = computed(() => !!store.user);
  return { ...store, isAuthenticated };
};

// Component: UI 로직만
const { user, login, isAuthenticated } = useAuth();
```

### 3. URL 기반 상태 관리

**React useNavigate 패턴 적용:**

```typescript
export const useNavigation = () => {
  const route = useRoute();
  const router = useRouter();

  // URL 쿼리에서 상태 추출
  const currentPage = computed(() => Number(route.query.page) || 1);
  const searchKeyword = computed(() => route.query.search || '');

  // 상태 변경 함수
  const goToPage = (page: number) => {
    router.push({ query: { ...route.query, page } });
  };

  return { currentPage, searchKeyword, goToPage };
};
```

**장점:**

- 브라우저 뒤로가기/앞으로가기 지원
- 페이지 새로고침 시 상태 지속
- URL 공유로 정확한 상태 전달

### 4. 통합 데이터 관리 컴포저블

**useBoardData 패턴:**

```typescript
export const useBoardData = (boardType: BoardType) => {
  const navigation = useNavigation();
  const { posts, fetchPosts } = usePostStore();

  // 통합 데이터 처리
  const processedPosts = computed(() => {
    const postMap = new Map(posts.value.map(p => [p.id, p]));
    return posts.value.map(post => ({
      ...post,
      isParentDeleted:
        post.type === 'reply' ? !postMap.has(post.parentId) : false,
    }));
  });

  return {
    ...navigation,
    posts: processedPosts,
    fetchPosts,
  };
};
```

**핵심 이점:**

- 단일 컴포저블로 모든 게시판 로직 완결
- N+1 쿼리 문제 해결 (Map 기반 O(1) 조회)
- 중복 API 호출 제거

### 5. 인증 시스템

**JWT 기반 인증 흐름:**

```typescript
// 1. 토큰 저장 및 복원
const token = localStorage.getItem('token');
if (token) {
  const user = parseJWT(token);
  authStore.setUser(user);
}

// 2. 라우트 가드
router.beforeEach(to => {
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'signIn' };
  }
});

// 3. API 인터셉터
axios.interceptors.request.use(config => {
  const token = authStore.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 개발 가이드라인

### 1. 코딩 컨벤션

**파일 및 네이밍:**

```typescript
// 컴포넌트: PascalCase
BoardList.vue;
UserProfile.vue;

// 컴포저블: camelCase + use 접두사
useAuth.ts;
useBoardData.ts;

// 스토어: camelCase + Store 접미사
auth.ts(useAuthStore);
post.ts(usePostStore);

// 타입: PascalCase + 명확한 의미
interface User {}
type ProcessedPost = Post & { isParentDeleted: boolean };
```

**컴포넌트 구조:**

```vue
<template>
  <!-- 템플릿 -->
</template>

<script setup lang="ts">
// 1. 타입 import
import type { User } from '@/types';

// 2. 컴포저블/스토어
const { user, login } = useAuth();

// 3. Props/Emits
const props = defineProps<{ user: User }>();
const emit = defineEmits<{ update: [user: User] }>();

// 4. 반응형 상태
const isLoading = ref(false);

// 5. 계산된 속성
const displayName = computed(() => props.user.name);

// 6. 메서드
const handleSubmit = async () => {};
</script>
```

### 2. 아키텍처 원칙

**관심사 분리:**

- **components/features**: 도메인 로직 + UI
- **components/ui**: 순수 UI 컴포넌트 (재사용 가능)
- **components/layout**: 레이아웃 컴포넌트
- **composables**: 비즈니스 로직 추상화
- **stores**: 전역 상태 관리

**데이터 흐름:**

```
API → Store → Composable → Component
```

**배럴 익스포트 활용:**

```typescript
// ❌ 개별 import (지양)
import BoardList from '@/components/features/board/BoardList.vue';
import BoardItem from '@/components/features/board/BoardItem.vue';

// ✅ 배럴 익스포트 활용 (권장)
import { BoardList, BoardItem } from '@/components/features/board';
```

**HTML Wrapper Div 최적화 가이드라인:**

1. **한 기능/영역 당 최대 1~2 레벨 wrapper** → 보통 layout > section > component
2. **컴포넌트 단위로 책임 분리** → Vue 컴포넌트 자체가 wrapper 역할을 하므로 불필요한 div 줄이기
3. **토큰 기반 spacing 활용** → gap, padding으로 해결할 수 있다면 wrapper 줄이기
4. **스크롤, position, background, overflow 같은 책임을 가진 컨테이너만 wrapper 유지**

```vue
<!-- ❌ 불필요한 wrapper 남용 -->
<div class="outer-wrapper">
  <div class="inner-wrapper">
    <div class="content-wrapper">
      <div class="item-wrapper">
        <Component />
      </div>
    </div>
  </div>
</div>

<!-- ✅ 최적화된 구조 -->
<main class="layout">
  <Component />
</main>
```

### 3. 상태 관리 가이드

**Pinia Store 패턴:**

```typescript
export const useAuthStore = defineStore('auth', () => {
  // 상태
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);

  // 계산된 속성
  const isAuthenticated = computed(() => !!user.value);

  // 액션
  const login = async (credentials: LoginRequest) => {
    const response = await authAPI.login(credentials);
    user.value = response.user;
    token.value = response.token;
  };

  return { user, token, isAuthenticated, login };
});
```

**컴포저블 인터페이스:**

```typescript
export const useAuth = () => {
  const store = useAuthStore();

  // 추가 로직
  const logout = () => {
    store.$reset();
    router.push({ name: 'signIn' });
  };

  return {
    ...store,
    logout,
  };
};
```

### 4. 성능 최적화

**데이터 처리 최적화:**

```typescript
// ❌ N+1 문제 발생
const isParentDeleted = async (parentId: string) => {
  const parent = await fetchPost(parentId);
  return parent?.isDeleted;
};

// ✅ Map 기반 O(1) 조회
const processedPosts = computed(() => {
  const postMap = new Map(posts.value.map(p => [p.id, p]));
  return posts.value.map(post => ({
    ...post,
    isParentDeleted: post.parentId ? !postMap.has(post.parentId) : false,
  }));
});
```

**Computed vs Watch:**

```typescript
// ✅ 계산된 속성 (선호)
const filteredPosts = computed(() =>
  posts.value.filter(p => p.title.includes(searchKeyword.value))
);

// 🔶 Watch (필요시만)
watch(searchKeyword, newKeyword => {
  // 사이드 이펙트 필요한 경우만
  analyticsAPI.trackSearch(newKeyword);
});
```

### 5. 타입 안전성 및 네비게이션 시스템

**엄격한 타입 정의:**

```typescript
// API 응답 타입
interface APIResponse<T> {
  data: T;
  message: string;
  status: 'success' | 'error';
}

// 컴포넌트 Props
interface BoardItemProps {
  post: ProcessedPost;
  isMypage?: boolean;
}

// 이벤트 타입
type BoardEvents = {
  'post-click': [post: Post];
  'page-change': [page: number];
};
```

**네비게이션 타입 시스템 (`types/navigate.ts`):**

```typescript
// 라우트명 중앙 집중 관리
export enum RouteName {
  HOME = 'home',
  SIGN_IN = 'signIn',
  SIGN_UP = 'signUp',
  BOARD = 'board',
  NOTICE = 'notice',
  FREE = 'free',
  BOARD_DETAIL = 'board-detail',
  MYPAGE = 'mypage',
}

// 게시판 타입과 라우트 연동
export enum BoardType {
  ALL = '',
  NOTICE = 'notice',
  FREE = 'free',
}

// 타입 안전한 네비게이션 유틸리티
export const getBoardRouteName = (boardType: BoardType): RouteName => {
  return BOARD_ROUTE_MAP.get(boardType) || RouteName.FREE;
};

export const getBoardTypeFromRoute = (routeName: RouteName): BoardType => {
  return ROUTE_BOARD_MAP.get(routeName) || BoardType.ALL;
};
```

**네비게이션 시스템의 핵심 원칙:**

1. **타입 안전성**: 경로 문자열 대신 RouteName enum 사용으로 오타 방지
2. **중앙 집중 관리**: 모든 라우트명과 게시판 타입을 한 곳에서 관리
3. **양방향 매핑**: BoardType ↔ RouteName 간 안전한 변환 제공
4. **확장성**: 새 BoardType/RouteName 추가 시 Map만 수정하면 자동 연동
5. **IDE 지원**: 자동완성과 리팩토링 도구 완벽 지원

**사용 예시:**

```typescript
// ❌ 기존 방식 (오타 위험)
router.push({ path: '/board/notice' });

// ✅ 권장 방식 (타입 안전)
router.push({ name: getBoardRouteName(BoardType.NOTICE) });
```

### 6. 주요 참고사항

**개발 환경:**

- 경로 별칭: `@/` = `src/`
- 개발 서버: `localhost:5173`
- TypeScript strict 모드 활성화
- ESLint + Prettier 설정 필수

**라우팅:**

```typescript
// 보호된 라우트
{
  path: '/board',
  meta: { requiresAuth: true },
  component: BoardLayout
}

// 라우트 가드
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: 'signIn' }
  }
})
```

**API 구조:**

```typescript
// axios 인스턴스
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// 인터셉터
api.interceptors.request.use(config => {
  const token = useAuthStore().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

## CSS Co-location 시스템

프로젝트에서는 **CSS Co-location** 패턴을 적용하여 컴포넌트와 스타일을 동일한 위치에 배치합니다.

### CSS Co-location 적용 현황

위의 **표준 프로젝트 구조**에 CSS Co-location이 적용되어 다음과 같은 변화가 있었습니다:

**📁 컴포넌트별 CSS 파일 추가:**

```
components/features/auth/SignIn.vue    → SignIn.css 추가
components/features/board/BoardList.vue → BoardList.css 추가
components/ui/form/SearchFilter.vue    → SearchFilter.css 추가
design-system/components/base/VButton/ → VButton.css 추가
pages/HomePage.vue                     → HomePage.css 추가
```

**📁 디자인 시스템 구조 변경:**

```
기존: assets/styles/components/design-system/
변경: design-system/styles/ + design-system/tokens/
```

### CSS Import 패턴

**컴포넌트에서 CSS Import:**

```vue
<script setup lang="ts">
// ✅ 상대 경로로 CSS import (Co-location)
import './ComponentName.css';
import { computed } from 'vue';
// ... 컴포넌트 로직
</script>
```

**main.ts에서 글로벌 스타일 Import:**

```typescript
import { createApp } from 'vue';
import App from './App.vue';
// ✅ 디자인 시스템 글로벌 스타일 (토큰, 베이스 스타일) import 필수
import '@/design-system/styles/index.css';
```

### CSS Co-location의 장점

1. **유지보수성**: 컴포넌트 수정 시 관련 CSS를 바로 찾을 수 있음
2. **모듈성**: 컴포넌트와 스타일이 하나의 단위로 관리됨
3. **확장성**: 새 컴포넌트 추가 시 CSS 위치가 자명함
4. **번들 최적화**: 사용하지 않는 컴포넌트의 CSS 자동 제외 가능
5. **개발 효율성**: import 경로가 간단함 (`./ComponentName.css`)

### 주의사항 및 함정

**⚠️ 글로벌 스타일 import의 함정:**

- `design-system/index.ts`에서 CSS를 import하지만, 이 파일 자체가 전역적으로 import되지 않음
- 따라서 `main.ts`에서 `@/design-system/styles/index.css`를 **반드시** import해야 함
- 이는 중복이 아니라 **필수** 설정임

**글로벌 스타일 구조:**

- **디자인 토큰**: `design-system/tokens/` - CSS Custom Properties 정의
- **베이스 스타일**: `design-system/styles/` - 글로벌 스타일, 리셋, 유틸리티
- **컴포넌트 스타일**: 각 컴포넌트 디렉토리 - 해당 컴포넌트만의 스타일

**CSS Import 흐름:**

```
main.ts → design-system/styles/index.css → tokens/index.css + base.css
       ↓
각 컴포넌트 → ./ComponentName.css (상대 경로)
```

**금지 패턴:**

```vue
<!-- ❌ 절대 경로 사용 금지 -->
import '/src/assets/styles/components/ComponentName.css';

<!-- ❌ 잘못된 경로 -->
import '@/assets/styles/components/ComponentName.css';

<!-- ✅ 권장 패턴 -->
import './ComponentName.css';
```

## 실전 예제 및 패턴

### 1. 새 기능 추가 시 구조

**게시판 댓글 기능 추가 예시:**

```
1. 타입 정의: types/comment.ts
2. API 모듈: apis/comment.ts
3. 스토어: stores/comment.ts
4. 컴포저블: composables/useComment.ts
5. 컴포넌트: components/features/board/CommentList.vue
6. 통합: components/features/board/index.ts에 export 추가
```

### 2. 통합 데이터 관리 패턴

```typescript
// useBoardData.ts - 게시판 통합 관리
export const useBoardData = (boardType: BoardType) => {
  const navigation = useNavigation(); // URL 상태
  const { posts, fetchPosts } = usePostStore(); // 데이터

  // 효율적 데이터 처리
  const processedPosts = computed(() => {
    const postMap = new Map(posts.value.map(p => [p.id, p]));
    return posts.value.map(post => ({
      ...post,
      isParentDeleted: post.parentId ? !postMap.has(post.parentId) : false,
    }));
  });

  return {
    // 네비게이션
    currentPage: navigation.currentPage,
    goToPage: navigation.goToPage,

    // 데이터
    posts: processedPosts,
    fetchPosts,
  };
};
```

### 3. 컴포넌트 마이그레이션 가이드

```typescript
// ❌ 기존 방식 (DEPRECATED)
const { posts } = usePost();
const { currentPage, goToPage } = usePagination();

// ✅ 새로운 방식 (RECOMMENDED)
const { posts, currentPage, goToPage, searchKeyword, setSearch } = useBoardData(
  BoardType.FREE
);
```

### 4. 라우팅 및 가드 패턴

```typescript
// routes/index.ts
export const routes: RouteRecordRaw[] = [
  {
    path: '/board',
    name: 'board',
    meta: { requiresAuth: true },
    component: BoardLayout,
    children: [
      {
        path: 'free',
        name: 'free',
        component: () => import('@/components/features/board/BoardList.vue'),
      },
    ],
  },
];

// 가드 설정
router.beforeEach(to => {
  const { isAuthenticated } = useAuth();

  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: 'signIn' };
  }
});
```

### 5. HTML Wrapper 최적화 실전 가이드

**적용 전후 비교 - BoardList 컴포넌트:**

```vue
<!-- ❌ 최적화 전 (4레벨 깊이) -->
<div class="board-list">
  <div class="posts-section">
    <div class="state-container">
      <div class="post-item">
        <BoardItem :post="post" />
      </div>
    </div>
  </div>
</div>

<!-- ✅ 최적화 후 (2레벨 깊이) -->
<div class="board-list">
  <VLoadingSpinner v-if="loading" class="centered-state" />
  <div v-else class="posts-list">
    <BoardItem v-for="post in posts" :key="post.id" :post="post" />
  </div>
</div>
```

**적용된 최적화 원칙:**

- `posts-section` 제거 → 단순 컨테이너 역할만 수행
- `state-container` → `centered-state` 클래스로 통합
- `post-item` wrapper 제거 → v-for에서 직접 컴포넌트 렌더링
- CSS는 글로벌 스타일시트에서 관리

### 6. 디자인 시스템 가이드

**토큰 기반 CSS 시스템:**

```css
/* 색상 토큰 */
:root {
  --color-primary: #4f46e5;
  --color-bg: #ffffff;
  --color-text: #111827;
  --color-border: #e5e7eb;
}

/* 다크 테마 */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #1e1e2f;
    --color-text: #f5f5f5;
    --color-border: #374151;
  }
}

/* 간격 토큰 */
:root {
  --space-1: 0.25rem; /* 4px */
  --space-2: 0.5rem; /* 8px */
  --space-3: 0.75rem; /* 12px */
  --space-4: 1rem; /* 16px */
  --space-6: 1.5rem; /* 24px */
  --space-8: 2rem; /* 32px */
}
```

**디자인 시스템 컴포넌트 사용:**

```vue
<template>
  <!-- ✅ 디자인 시스템 컴포넌트 사용 -->
  <VCard variant="elevated" padding="md">
    <VButton variant="primary" @click="handleClick"> 버튼 </VButton>
  </VCard>
</template>

<script setup lang="ts">
import { VCard, VButton } from '@/design-system/components';

// 테마 전환
import { useTheme } from '@/design-system/composables/useTheme';
const { toggleTheme, isDark } = useTheme();
</script>

<style scoped>
/* ✅ 토큰 사용 */
.custom-element {
  padding: var(--space-4);
  background: var(--color-bg);
  color: var(--color-text);
  border-radius: var(--radius-md);
}
</style>
```

#### VDropdown 컴포넌트 사용법

**기본 사용법:**

```vue
<template>
  <VDropdown
    id="my-dropdown"
    placement="bottom-start"
    :vertical-offset="8"
  >
    <template #trigger="{ isOpen, toggle }">
      <VButton @click="toggle" :class="{ active: isOpen }">
        드롭다운 열기
        <VIcon name="chevron-down" :class="{ rotate: isOpen }" />
      </VButton>
    </template>

    <template #menu="{ close }">
      <VDropdownItem @click="handleAction1(close)">
        액션 1
      </VDropdownItem>
      <VDropdownItem @click="handleAction2(close)">
        액션 2
      </VDropdownItem>
      <div class="menu-divider"></div>
      <VDropdownItem destructive @click="handleDelete(close)">
        삭제
      </VDropdownItem>
    </template>
  </VDropdown>
</template>

<script setup lang="ts">
import { VDropdown, VDropdownItem, VButton, VIcon } from '@/design-system';

const handleAction1 = (closeDropdown: () => void) => {
  // 액션 실행
  console.log('액션 1 실행');
  closeDropdown(); // 드롭다운 닫기
};

const handleAction2 = (closeDropdown: () => void) => {
  // 액션 실행
  console.log('액션 2 실행');
  closeDropdown();
};

const handleDelete = (closeDropdown: () => void) => {
  const confirmed = confirm('정말 삭제하시겠습니까?');
  if (confirmed) {
    // 삭제 로직
    console.log('삭제 실행');
  }
  closeDropdown();
};
</script>
```

**VDropdown Props:**

```typescript
interface DropdownProps {
  id?: string;                    // 필수: 드롭다운 식별자 (상호 배타성)
  placement?: 'bottom-start'      // 배치 위치 (기본값: 'bottom-start')
    | 'bottom-end' 
    | 'bottom-center'
    | 'top-start' 
    | 'top-end' 
    | 'top-center';
  verticalOffset?: number;        // 세로 간격 (기본값: 8px)
  horizontalOffset?: number;      // 가로 간격 (기본값: 0px)  
  mobileFullWidth?: boolean;      // 모바일 전체폭 (기본값: true)
  size?: 'sm' | 'md' | 'lg';     // 크기 (기본값: 'md')
  priority?: 'normal' | 'high';   // z-index 우선순위 (기본값: 'normal')
  closeOnScroll?: boolean;        // 스크롤시 닫기 (기본값: true)
  disabled?: boolean;             // 비활성화 (기본값: false)
  ariaLabel?: string;             // 접근성 라벨
}
```

**상호 배타적 드롭다운 관리:**

```vue
<!-- ✅ 권장: 각 드롭다운에 고유 id 부여 -->
<VDropdown id="user-profile-dropdown">
  <!-- 사용자 프로필 드롭다운 -->
</VDropdown>

<VDropdown id="search-filter-dropdown">
  <!-- 검색 필터 드롭다운 -->
</VDropdown>

<!-- ❌ 비권장: id 없으면 상호 배타성 적용 안됨 -->
<VDropdown>
  <!-- 다른 드롭다운과 동시에 열릴 수 있음 -->
</VDropdown>
```

**드롭다운 이벤트 처리:**

```vue
<template>
  <VDropdown
    id="event-dropdown"
    @open="handleDropdownOpen"
    @close="handleDropdownClose"
  >
    <!-- 드롭다운 내용 -->
  </VDropdown>
</template>

<script setup lang="ts">
const handleDropdownOpen = () => {
  console.log('드롭다운이 열렸습니다');
  // 다른 UI 요소와의 상호작용 처리
};

const handleDropdownClose = () => {
  console.log('드롭다운이 닫혔습니다');
  // 정리 작업
};
</script>
```

**반응형 드롭다운:**

```vue
<template>
  <VDropdown
    id="responsive-dropdown"
    :vertical-offset="verticalOffset"
    :mobile-full-width="false"
  >
    <!-- 드롭다운 내용 -->
  </VDropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useBreakpoint } from '@/composables';

const { isMobile } = useBreakpoint();

// 반응형 오프셋 계산
const verticalOffset = computed(() => {
  return isMobile.value ? 12 : 16;
});
</script>
```

**VDropdownItem 사용법:**

```vue
<template #menu="{ close }">
  <!-- 기본 아이템 -->
  <VDropdownItem @click="handleClick(close)">
    일반 메뉴
  </VDropdownItem>

  <!-- 활성 상태 아이템 -->
  <VDropdownItem :active="isActive" @click="handleClick(close)">
    활성 메뉴
  </VDropdownItem>

  <!-- 위험한 액션 (빨간색) -->
  <VDropdownItem destructive @click="handleDelete(close)">
    삭제
  </VDropdownItem>

  <!-- 비활성화된 아이템 -->
  <VDropdownItem disabled>
    비활성화 메뉴
  </VDropdownItem>

  <!-- 구분선 -->
  <div class="menu-divider"></div>

  <!-- 아이콘과 함께 -->
  <VDropdownItem @click="handleClick(close)">
    <VIcon name="user" size="sm" />
    프로필
  </VDropdownItem>
</template>
```

**드롭다운 스타일 커스터마이징:**

```css
/* 메뉴 컨테이너 스타일 */
.custom-menu {
  min-width: 200px;
  padding: var(--space-2);
}

/* 구분선 스타일 */
.menu-divider {
  height: 1px;
  background-color: var(--color-border);
  margin: var(--space-2) 0;
}

/* 사용자 정보 섹션 */
.user-info {
  padding: var(--space-3) var(--space-2);
  margin-bottom: var(--space-1);
}

.user-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text);
}
```

**반응형 디자인:**

```vue
<script setup lang="ts">
import { useBreakpoint } from '@/design-system/composables/useBreakpoint';

const { isMobile, isTablet, isDesktop } = useBreakpoint();
</script>

<template>
  <div :class="{ 'mobile-layout': isMobile, 'desktop-layout': isDesktop }">
    <!-- 반응형 콘텐츠 -->
  </div>
</template>
```

### 7. 레거시 코드 관리

```typescript
/**
 * @deprecated 새로운 useBoardData를 사용하세요
 * @see useBoardData
 * @example
 * // 기존
 * const { posts } = usePost()
 *
 * // 새로운 방식
 * const { posts } = useBoardData(BoardType.FREE)
 */
export const usePost = () => {
  // 기존 로직 유지 (호환성)
};
```
