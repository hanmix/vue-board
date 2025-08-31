# 디자인 시스템 컴포넌트 사용자 매뉴얼

Vue 3 + TypeScript 프로젝트에서 재사용 가능한 공통 컴포넌트들의 사용법을 안내합니다.

## 📋 목차

- [설치 및 Import](#설치-및-import)
- [Base Components](#base-components)
  - [VButton](#vbutton)
  - [VCard](#vcard)
  - [VModal](#vmodal)
  - [VAlert](#valert)
  - [VDropdown](#vdropdown)
  - [VIcon](#vicon)
  - [VToastContainer](#vtoastcontainer)
- [Layout Components](#layout-components)
  - [VContainer](#vcontainer)
- [Feedback Components](#feedback-components)
  - [VLoadingSpinner](#vloadingspinner)
  - [VErrorMessage](#verrormessage)
- [Composables](#composables)
  - [useTheme](#usetheme)
  - [useToast](#usetoast)
- [디자인 토큰](#디자인-토큰)
- [접근성 가이드라인](#접근성-가이드라인)

## 설치 및 Import

> 💡 **프로젝트 아키텍처**: 이 매뉴얼은 디자인 시스템 컴포넌트 사용법에 집중합니다. 전체 프로젝트 아키텍처와 패턴은 **[CLAUDE.md](./CLAUDE.md)** 파일을 참조하세요.

### 개별 컴포넌트 Import (권장)

```typescript
// 개별 컴포넌트 import
import { VButton, VCard, VModal } from '@/design-system/components';
import { useTheme, useToast } from '@/design-system/composables';
```

### 전체 설치 (옵션)

```typescript
// main.ts
import { createApp } from 'vue';
import DesignSystem from '@/design-system/components';

const app = createApp(App);

// 전체 설치
app.use(DesignSystem);

// 선택적 설치 (번들 크기 최적화)
app.use(DesignSystem, {
  components: ['VButton', 'VCard', 'VModal'],
  prefix: 'My' // MyVButton, MyVCard, MyVModal로 등록
});
```

## Base Components

### VButton

모든 상호작용 요소에 사용되는 기본 버튼 컴포넌트

#### Props

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  block?: boolean;
  type?: 'button' | 'submit' | 'reset';
  touchFeedback?: boolean;
}
```

#### 기본 사용법

```vue
<!-- SignIn.vue에서 실제 사용 -->
<template>
  <VButton
    type="submit"
    variant="primary"
    size="lg"
    :loading="loading"
    block
    class="auth-submit"
  >
    {{ loading ? '로그인 중...' : '로그인' }}
  </VButton>
</template>

<!-- HomePage.vue에서 실제 사용 -->
<template>
  <div class="hero-actions">
    <VButton variant="primary" size="lg" @click="navigateToSignIn">
      시작하기
    </VButton>
    <VButton variant="secondary" size="lg" @click="navigateToDesignSystem">
      디자인 시스템 보기
    </VButton>
    <VButton variant="danger" size="lg" @click="navigateToNestedTransition">
      중첩 트랜지션 보기
    </VButton>
  </div>
</template>

<!-- NavigationBar.vue에서 실제 사용 -->
<template>
  <VButton
    v-if="route.name !== 'mypage'"
    variant="ghost"
    :size="'md'"
    @click="toggleSearchBar"
  >
    <VIcon name="search" size="sm" />
  </VButton>
</template>
```

#### 폼에서 사용

```vue
<!-- NewPostModal.vue에서 실제 사용 -->
<template>
  <form @submit.prevent="handleCreate" class="post-form">
    <!-- 폼 필드들 -->
  </form>

  <template #footer>
    <div class="modal-actions">
      <VButton variant="ghost" @click="handleClose"> 취소 </VButton>
      <VButton
        variant="primary"
        :disabled="isEmptyValue"
        @click="handleCreate"
      >
        생성하기
      </VButton>
    </div>
  </template>
</template>
```

### VCard

콘텐츠를 구조화하여 표시하는 카드 컴포넌트

#### Props

```typescript
interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}
```

#### 기본 사용법

```vue
<!-- SignIn.vue에서 실제 사용 -->
<template>
  <VCard variant="elevated" padding="lg" class="auth-card">
    <template #header>
      <div class="auth-header">
        <h1 class="auth-title">로그인</h1>
        <p class="auth-subtitle">안녕하세요. 싱글벙글 게시판 입니다.</p>
      </div>
    </template>

    <form @submit.prevent="handleLogin" class="auth-form">
      <!-- 폼 내용 -->
    </form>
  </VCard>
</template>

<!-- HomePage.vue에서 실제 사용 -->
<template>
  <VCard variant="elevated" padding="lg">
    <template #header>
      <div class="hero-header">
        <h1 class="hero-title">Vue Board</h1>
        <VButton variant="ghost" @click="toggleTheme" class="theme-toggle">
          {{ isDark ? '🌞' : '🌙' }}
        </VButton>
      </div>
    </template>

    <div class="hero-content">
      <p class="hero-description">
        Vue 3 + TypeScript로 구축된 현대적인 게시판 애플리케이션
      </p>
    </div>
  </VCard>
</template>

<!-- NavigationBar.vue에서 검색 카드 -->
<template>
  <VCard
    v-if="isSearchVisible"
    variant="outlined"
    padding="sm"
    class="search-section"
  >
    <SearchFilter
      :boardType="boardType"
      :searchKeyword="searchKeyword"
      :searchType="searchType"
      :onSearch="setSearch"
    />
  </VCard>
</template>
```

#### 빈 상태 표시

```vue
<!-- BoardList.vue에서 실제 사용 -->
<template>
  <VCard
    v-else-if="!posts.length"
    variant="outlined"
    padding="lg"
    class="centered-state"
  >
    <div class="empty-state">
      <span class="empty-icon">📝</span>
      <h3 class="empty-title">게시글이 없습니다</h3>
      <p class="empty-message">첫 번째 게시글을 작성해보세요!</p>
      <VButton variant="primary" @click="showModal">글 작성하기</VButton>
    </div>
  </VCard>
</template>
```

### VModal

오버레이 형태의 모달 다이얼로그 컴포넌트

#### Props

```typescript
interface ModalProps {
  modelValue: boolean;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closable?: boolean;
  closeOnOverlay?: boolean;
  persistent?: boolean;
}
```

#### 기본 사용법

```vue
<!-- NewPostModal.vue에서 실제 사용 -->
<template>
  <VModal
    :modelValue="isVisible"
    @update:modelValue="handleClose"
    title="게시글 작성하기"
    size="md"
  >
    <form @submit.prevent="handleCreate" class="post-form">
      <div class="form-field">
        <label for="title" class="form-label">제목</label>
        <input
          id="title"
          v-model="title"
          type="text"
          class="form-input"
          placeholder="제목을 입력하세요."
          required
          @compositionstart="handleComposition(true)"
          @compositionend="handleComposition(false)"
        />
      </div>

      <div class="form-field">
        <label for="content" class="form-label">내용</label>
        <textarea
          id="content"
          v-model="content"
          class="form-textarea"
          placeholder="내용을 입력하세요."
          required
          rows="6"
          @compositionstart="handleComposition(true)"
          @compositionend="handleComposition(false)"
        />
      </div>
    </form>

    <template #footer>
      <div class="modal-actions">
        <VButton variant="ghost" @click="handleClose"> 취소 </VButton>
        <VButton
          variant="primary"
          :disabled="isEmptyValue"
          @click="handleCreate"
        >
          생성하기
        </VButton>
      </div>
    </template>
  </VModal>
</template>
```

#### 고급 활용법

```vue
<template>
  <!-- 확인 다이얼로그 -->
  <VModal
    v-model="showDeleteModal"
    title="삭제 확인"
    size="sm"
    :persistent="true"
  >
    <div class="text-center">
      <VIcon name="warning" size="lg" class="text-red-500 mx-auto mb-4" />
      <p>정말로 삭제하시겠습니까?</p>
      <p class="text-sm text-gray-500">이 작업은 되돌릴 수 없습니다.</p>
    </div>

    <template #footer>
      <div class="flex gap-2 justify-center">
        <VButton variant="ghost" @click="showDeleteModal = false">
          취소
        </VButton>
        <VButton variant="danger" @click="confirmDelete">
          삭제
        </VButton>
      </div>
    </template>
  </VModal>
</template>
```

### VAlert

사용자에게 중요한 정보를 전달하는 알림 컴포넌트

#### Props

```typescript
interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  dismissible?: boolean;
  title?: string;
}
```

#### 기본 사용법

```vue
<template>
  <!-- 기본 알림 -->
  <VAlert variant="info">
    정보성 메시지입니다.
  </VAlert>

  <!-- 제목이 있는 알림 -->
  <VAlert variant="success" title="성공!" dismissible>
    작업이 성공적으로 완료되었습니다.
  </VAlert>

  <!-- 경고 알림 -->
  <VAlert variant="warning" title="주의">
    이 작업은 신중히 고려해주세요.
  </VAlert>

  <!-- 오류 알림 -->
  <VAlert variant="error" title="오류 발생" dismissible>
    <p>요청을 처리하는 중 오류가 발생했습니다.</p>
    <ul class="mt-2 list-disc list-inside">
      <li>네트워크 연결을 확인해주세요</li>
      <li>잠시 후 다시 시도해주세요</li>
    </ul>
  </VAlert>
</template>
```

### VDropdown

고급 드롭다운 메뉴 컴포넌트

> 📋 **타입 관리**: 드롭다운 ID는 `src/types/dropdown.ts`에서 중앙 관리되며, `useDropdownManager` 컴포저블로 상호 배타적 동작을 제공합니다.

#### Props

```typescript
interface DropdownProps {
  id?: string;
  placement?: 'bottom-start' | 'bottom-end' | 'bottom-center' | 
             'top-start' | 'top-end' | 'top-center';
  verticalOffset?: number;
  horizontalOffset?: number;
  mobileFullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  priority?: 'normal' | 'high';
  closeOnScroll?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
}
```

#### 기본 사용법

```vue
<!-- SearchFilter.vue에서 실제 사용 -->
<template>
  <VDropdown
    :id="DROPDOWN_IDS.SEARCH_FILTER"
    placement="bottom-start"
    size="sm"
    :aria-label="'검색 타입 선택'"
  >
    <template #trigger="{ isOpen }">
      <div
        class="search-type-trigger"
        :class="{ 'search-type-trigger--open': isOpen }"
        role="button"
        tabindex="0"
      >
        {{ currentSearchLabel }}
        <VIcon
          name="chevron-down"
          size="xs"
          :class="[
            'search-type-arrow',
            { 'search-type-arrow--open': isOpen },
          ]"
        />
      </div>
    </template>

    <template #menu="{ close }">
      <VDropdownItem
        v-for="option in searchOptions"
        :key="option.value"
        :active="localSearchType === option.value"
        @click="selectSearchType(option.value, close)"
      >
        {{ option.label }}
      </VDropdownItem>
    </template>
  </VDropdown>
</template>

<script setup lang="ts">
import { DROPDOWN_IDS } from '@/types/dropdown';

const selectSearchType = (value: SearchType, close: () => void) => {
  localSearchType.value = value;
  close();
};
</script>
```

#### VDropdownItem Props

```typescript
interface DropdownItemProps {
  active?: boolean;
  disabled?: boolean;
  destructive?: boolean;
}
```

### VIcon

아이콘을 표시하는 범용 아이콘 컴포넌트

#### Props

```typescript
interface IconProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
}
```

#### 기본 사용법

```vue
<template>
  <!-- 기본 아이콘 -->
  <VIcon name="user" />

  <!-- 크기별 아이콘 -->
  <VIcon name="heart" size="xs" />
  <VIcon name="heart" size="sm" />
  <VIcon name="heart" size="md" />
  <VIcon name="heart" size="lg" />
  <VIcon name="heart" size="xl" />

  <!-- 색상 지정 -->
  <VIcon name="star" color="#fbbf24" />
  <VIcon name="warning" color="var(--color-danger)" />

  <!-- 버튼과 함께 -->
  <VButton>
    <VIcon name="plus" size="sm" />
    새로 만들기
  </VButton>
</template>
```

### VToastContainer

토스트 알림을 관리하는 컨테이너 컴포넌트

#### Props

```typescript
interface ToastContainerProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  maxToasts?: number;
  spacing?: number;
}
```

#### 기본 설정

```vue
<template>
  <!-- App.vue 또는 layout에 한 번만 추가 -->
  <VToastContainer position="top-right" :max-toasts="5" />
</template>
```

#### useToast와 함께 사용

```vue
<template>
  <div>
    <VButton @click="showSuccess">성공 토스트</VButton>
    <VButton @click="showError">오류 토스트</VButton>
    <VButton @click="showWarning">경고 토스트</VButton>
    <VButton @click="showInfo">정보 토스트</VButton>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '@/design-system/composables';

const { showToast } = useToast();

const showSuccess = () => {
  showToast({
    type: 'success',
    title: '성공!',
    message: '작업이 완료되었습니다.',
    duration: 3000
  });
};

const showError = () => {
  showToast({
    type: 'error',
    title: '오류',
    message: '문제가 발생했습니다.',
    duration: 5000
  });
};

const showWarning = () => {
  showToast({
    type: 'warning',
    title: '주의',
    message: '확인이 필요합니다.'
  });
};

const showInfo = () => {
  showToast({
    type: 'info',
    title: '알림',
    message: '새 메시지가 도착했습니다.'
  });
};
</script>
```

## Layout Components

### VContainer

반응형 컨테이너 레이아웃 컴포넌트

#### Props

```typescript
interface ContainerProps {
  fluid?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  centered?: boolean;
}
```

#### 기본 사용법

```vue
<template>
  <!-- 기본 컨테이너 -->
  <VContainer>
    <p>중앙 정렬된 콘텐츠</p>
  </VContainer>

  <!-- 전체 폭 컨테이너 -->
  <VContainer fluid>
    <p>전체 폭 콘텐츠</p>
  </VContainer>

  <!-- 크기 제한 컨테이너 -->
  <VContainer size="lg" centered>
    <p>Large 크기로 제한된 중앙 정렬 콘텐츠</p>
  </VContainer>
</template>
```

## Feedback Components

### VLoadingSpinner

로딩 상태를 표시하는 스피너 컴포넌트

#### Props

```typescript
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'white';
  label?: string;
}
```

#### 기본 사용법

```vue
<!-- BoardList.vue에서 실제 사용 -->
<template>
  <div class="board-list">
    <!-- Loading State -->
    <VLoadingSpinner
      v-if="loading"
      size="lg"
      message="게시글을 불러오는 중..."
      class="centered-state"
    />

    <!-- Error State -->
    <VErrorMessage
      v-else-if="error"
      :message="error"
      title="게시글을 불러올 수 없습니다"
      severity="error"
      show-retry
      @retry="refetch"
      class="centered-state"
    />

    <!-- 게시글 목록 -->
    <div v-else class="posts-list">
      <BoardItem v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>
```

### VErrorMessage

오류 메시지를 표시하는 컴포넌트

#### Props

```typescript
interface ErrorMessageProps {
  message?: string;
  title?: string;
  retry?: boolean;
  icon?: boolean;
}
```

#### 기본 사용법

```vue
<!-- BoardList.vue에서 실제 사용 -->
<template>
  <VErrorMessage
    v-else-if="error"
    :message="error"
    title="게시글을 불러올 수 없습니다"
    severity="error"
    show-retry
    @retry="refetch"
    class="centered-state"
  />
</template>

<script setup lang="ts">
const refetch = async () => {
  try {
    await fetchPosts(boardType);
  } catch (err) {
    console.error('게시글 재요청 실패:', err);
  }
};
</script>
```

## Composables

### useTheme

다크/라이트 테마 전환을 관리하는 컴포저블

#### 반환값

```typescript
interface ThemeComposable {
  isDark: Ref<boolean>;
  theme: Ref<'light' | 'dark'>;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}
```

#### 사용법

```vue
<template>
  <div>
    <p>현재 테마: {{ theme }}</p>
    
    <VButton @click="toggleTheme">
      <VIcon :name="isDark ? 'sun' : 'moon'" />
      {{ isDark ? '라이트 모드' : '다크 모드' }}
    </VButton>

    <!-- 또는 선택적 테마 설정 -->
    <VButton @click="setTheme('light')">라이트</VButton>
    <VButton @click="setTheme('dark')">다크</VButton>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/design-system/composables';

const { isDark, theme, toggleTheme, setTheme } = useTheme();
</script>
```

### useToast

토스트 알림을 관리하는 컴포저블

#### ToastItem 타입

```typescript
interface ToastItem {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number;
  closable?: boolean;
}
```

#### 반환값

```typescript
interface ToastComposable {
  toasts: Ref<ToastItem[]>;
  showToast: (toast: Omit<ToastItem, 'id'>) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}
```

#### 사용법

```vue
<script setup lang="ts">
import { useToast } from '@/design-system/composables';

const { showToast, removeToast, clearAllToasts } = useToast();

// 성공 토스트
const showSuccessToast = () => {
  showToast({
    type: 'success',
    title: '저장됨',
    message: '변경사항이 저장되었습니다.',
    duration: 3000
  });
};

// 오류 토스트 (자동으로 닫히지 않음)
const showErrorToast = () => {
  showToast({
    type: 'error',
    title: '오류',
    message: '저장에 실패했습니다.',
    duration: 0, // 자동으로 닫히지 않음
    closable: true
  });
};

// 특정 토스트 제거
const removeSpecificToast = (toastId: string) => {
  removeToast(toastId);
};

// 모든 토스트 제거
const clearAll = () => {
  clearAllToasts();
};
</script>
```

## 디자인 토큰

디자인 시스템에서 사용되는 CSS Custom Properties

> 📁 **파일 위치**: 모든 디자인 토큰은 `src/design-system/tokens/` 폴더에 정의되어 있습니다. CSS Co-location 시스템에 대한 자세한 내용은 **[CLAUDE.md - CSS Co-location 시스템](./CLAUDE.md#css-co-location-시스템)** 을 참조하세요.

### 색상 토큰

```css
/* 기본 색상 */
--color-primary: #4f46e5;
--color-primary-hover: #4338ca;
--color-secondary: #6b7280;
--color-success: #10b981;
--color-warning: #f59e0b;
--color-error: #ef4444;

/* 텍스트 색상 */
--color-text: #111827;
--color-text-muted: #6b7280;
--color-text-inverse: #ffffff;

/* 배경 색상 */
--color-bg: #ffffff;
--color-bg-secondary: #f9fafb;
--color-bg-tertiary: #f3f4f6;

/* 테두리 색상 */
--color-border: #e5e7eb;
--color-border-focus: #4f46e5;
```

### 간격 토큰

```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
```

### 타이포그래피 토큰

```css
--font-size-xs: 0.75rem;
--font-size-sm: 0.875rem;
--font-size-md: 1rem;
--font-size-lg: 1.125rem;
--font-size-xl: 1.25rem;
--font-size-2xl: 1.5rem;
--font-size-3xl: 1.875rem;

--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### 효과 토큰

```css
--radius-sm: 0.25rem;
--radius-md: 0.375rem;
--radius-lg: 0.5rem;
--radius-xl: 0.75rem;
--radius-full: 9999px;

--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

## 접근성 가이드라인

### 키보드 네비게이션

모든 컴포넌트는 키보드만으로 조작 가능하도록 설계되었습니다:

- **Tab**: 다음 요소로 포커스 이동
- **Shift + Tab**: 이전 요소로 포커스 이동
- **Enter/Space**: 버튼 활성화
- **Escape**: 모달/드롭다운 닫기
- **Arrow Keys**: 드롭다운 메뉴 내 탐색

### ARIA 속성

```vue
<template>
  <!-- 적절한 ARIA 라벨 제공 -->
  <VButton aria-label="사용자 메뉴 열기">
    <VIcon name="user" />
  </VButton>

  <!-- 모달의 ARIA 속성 -->
  <VModal
    v-model="showModal"
    title="설정"
    aria-describedby="modal-description"
  >
    <p id="modal-description">
      여기에서 앱 설정을 변경할 수 있습니다.
    </p>
  </VModal>

  <!-- 폼 요소의 라벨 연결 -->
  <label for="email">이메일</label>
  <input id="email" type="email" />
  
  <VErrorMessage 
    v-if="emailError"
    :message="emailError"
    role="alert"
  />
</template>
```

### 색상 대비

모든 컴포넌트는 WCAG 2.1 AA 기준을 만족하는 색상 대비를 제공합니다:

- **일반 텍스트**: 최소 4.5:1 대비율
- **대형 텍스트**: 최소 3:1 대비율
- **UI 컴포넌트**: 최소 3:1 대비율

### 스크린 리더 지원

```vue
<template>
  <!-- 로딩 상태 알림 -->
  <div v-if="loading" role="status" aria-live="polite">
    <VLoadingSpinner />
    <span class="sr-only">데이터를 불러오는 중입니다.</span>
  </div>

  <!-- 오류 상태 알림 -->
  <VAlert variant="error" role="alert">
    중요한 오류가 발생했습니다.
  </VAlert>

  <!-- 진행률 표시 -->
  <div role="progressbar" 
       :aria-valuenow="progress" 
       aria-valuemin="0" 
       aria-valuemax="100">
    {{ progress }}% 완료
  </div>
</template>

<style>
/* 스크린 리더 전용 텍스트 */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
```

## 모범 사례

### 1. 컴포넌트 조합

```vue
<template>
  <!-- ✅ 좋은 예: 의미있는 컴포넌트 조합 -->
  <VCard variant="elevated">
    <template #header>
      <div class="flex justify-between items-center">
        <h3>사용자 설정</h3>
        <VDropdown id="settings-menu">
          <template #trigger="{ toggle }">
            <VButton variant="ghost" size="sm" @click="toggle">
              <VIcon name="more" />
            </VButton>
          </template>
          <template #menu="{ close }">
            <VDropdownItem @click="editProfile(close)">
              프로필 편집
            </VDropdownItem>
            <VDropdownItem @click="exportData(close)">
              데이터 내보내기
            </VDropdownItem>
          </template>
        </VDropdown>
      </div>
    </template>

    <!-- 설정 폼 -->
    <form @submit.prevent="handleSubmit">
      <!-- 폼 필드들 -->
    </form>

    <template #footer>
      <div class="flex gap-2 justify-end">
        <VButton variant="ghost" @click="handleCancel">
          취소
        </VButton>
        <VButton type="submit" :loading="isSubmitting">
          저장
        </VButton>
      </div>
    </template>
  </VCard>
</template>
```

### 2. 상태 관리

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useToast } from '@/design-system/composables';

const { showToast } = useToast();

// 로딩 상태 관리
const isSubmitting = ref(false);
const formData = ref({ name: '', email: '' });

// 유효성 검사
const isFormValid = computed(() => {
  return formData.value.name.trim() && 
         formData.value.email.includes('@');
});

// 폼 제출
const handleSubmit = async () => {
  if (!isFormValid.value) {
    showToast({
      type: 'error',
      title: '유효성 검사 실패',
      message: '모든 필수 필드를 올바르게 입력해주세요.'
    });
    return;
  }

  isSubmitting.value = true;
  
  try {
    await submitForm(formData.value);
    
    showToast({
      type: 'success',
      title: '저장 완료',
      message: '설정이 성공적으로 저장되었습니다.'
    });
  } catch (error) {
    showToast({
      type: 'error',
      title: '저장 실패',
      message: '설정을 저장하는 중 오류가 발생했습니다.'
    });
  } finally {
    isSubmitting.value = false;
  }
};
</script>
```

### 3. 반응형 디자인

```vue
<template>
  <VContainer>
    <!-- 반응형 그리드 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <VCard v-for="item in items" :key="item.id">
        <!-- 카드 내용 -->
      </VCard>
    </div>

    <!-- 반응형 모달 -->
    <VModal
      v-model="showModal"
      :size="isMobile ? 'full' : 'lg'"
    >
      <!-- 모달 내용 -->
    </VModal>
  </VContainer>
</template>

<script setup lang="ts">
import { useBreakpoint } from '@/composables';

const { isMobile } = useBreakpoint();
</script>
```

이 매뉴얼을 참조하여 일관되고 접근 가능한 사용자 인터페이스를 구축하세요. 각 컴포넌트는 독립적으로 사용할 수 있도록 설계되었으며, 필요에 따라 조합하여 복잡한 UI를 만들 수 있습니다.