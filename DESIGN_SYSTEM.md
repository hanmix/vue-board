### useBreakpoint.ts (모바일 최적화)

```typescript
// src/design-system/composables/useBreakpoint.ts
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

const breakpoints = {
  xs: 375,   // iPhone SE
  sm: 640,   // 큰 모바일
  md: 768,   // 태블릿
  lg: 1024,  // 데스크톱
  xl: 1280,  // 큰 데스크톱
  '2xl': 1536 // 초대형 화면
} as const

type Breakpoint = keyof typeof breakpoints# Vue Board 디자인 시스템 구축 가이드

## 📋 개요
이 문서는 Vue Board 디자인 시스템을 실제 프로젝트에 구현하기 위한 단계별 가이드입니다. **Flat 2.0 + Subtle Depth + Adaptive Tokens** 철학을 바탕으로 확장 가능하고 유지보수가 쉬운 디자인 시스템을 구축합니다.

---

## 🏗 프로젝트 구조 (Vue 3 + Vite 최적화)

### 디렉토리 구성
```

src/
├── design-system/
│ ├── tokens/
│ │ ├── index.css # 모든 토큰을 하나로 통합 (Vite 최적화)
│ │ ├── colors.css
│ │ ├── typography.css
│ │ ├── spacing.css
│ │ └── effects.css
│ ├── components/
│ │ ├── base/
│ │ │ ├── VButton/
│ │ │ │ ├── VButton.vue
│ │ │ │ └── index.ts
│ │ │ ├── VCard/
│ │ │ │ ├── VCard.vue
│ │ │ │ └── index.ts
│ │ │ └── VModal/
│ │ │ ├── VModal.vue
│ │ │ └── index.ts
│ │ ├── layout/
│ │ │ ├── VContainer/
│ │ │ │ ├── VContainer.vue
│ │ │ │ └── index.ts
│ │ │ └── VGrid/
│ │ │ ├── VGrid.vue
│ │ │ └── index.ts
│ │ └── index.ts
│ ├── styles/
│ │ ├── index.css # 스타일 진입점
│ │ ├── base.css # 기본 리셋 및 글로벌 스타일
│ │ ├── themes.css
│ │ └── utilities.css
│ ├── composables/
│ │ ├── index.ts # Composables 진입점
│ │ ├── useTheme.ts
│ │ └── useBreakpoint.ts
│ └── index.ts # 디자인 시스템 메인 진입점
├── types/
│ └── design-system.d.ts # TypeScript 타입 정의
├── vite-env.d.ts
└── main.ts

````

---

## 🎨 1단계: 디자인 토큰 구현 (Vite CSS 최적화)

### tokens/index.css (메인 진입점)
```css
/* src/design-system/tokens/index.css */
/* Vite에서 CSS 파일들을 하나로 통합 */
@import './colors.css';
@import './typography.css';
@import './spacing.css';
@import './effects.css';
````

### colors.css

```css
/* src/design-system/tokens/colors.css */
:root {
  /* 브랜드 색상 - 다크 테마와 조화로운 톤 */
  --color-primary-50: #f0f4ff;
  --color-primary-100: #e0e9ff;
  --color-primary-500: #6366f1; /* 더 밝고 선명한 보라 */
  --color-primary-600: #5b63d3;
  --color-primary-700: #4f46e5;

  --color-secondary-500: #06b6d4; /* 시원한 청록색 */
  --color-secondary-600: #0891b2;

  /* 시스템 색상 - 다크 테마 최적화 */
  --color-success: #10b981; /* 더 선명한 녹색 */
  --color-danger: #f87171; /* 부드러운 빨간색 */
  --color-warning: #fbbf24; /* 따뜻한 황색 */
  --color-info: #60a5fa; /* 밝은 파란색 */

  /* 중성 색상 - 다크 테마와 조화로운 따뜻한 그레이 */
  --color-gray-50: #fafafa;
  --color-gray-100: #f5f5f5;
  --color-gray-200: #e5e5e5;
  --color-gray-300: #d4d4d4;
  --color-gray-400: #a3a3a3;
  --color-gray-500: #737373;
  --color-gray-600: #525252;
  --color-gray-700: #404040;
  --color-gray-800: #262626;
  --color-gray-900: #171717;
}

/* 라이트 테마 매핑 */
:root {
  --color-primary: var(--color-primary-500);
  --color-primary-hover: var(--color-primary-600);
  --color-secondary: var(--color-secondary-500);

  --color-bg: #ffffff;
  --color-surface: var(--color-gray-50);
  --color-text: var(--color-gray-900);
  --color-text-muted: var(--color-gray-600);
  --color-border: var(--color-gray-200);
}

/* 다크 테마 매핑 */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #242424; /* 메인 배경 (차분한 다크 그레이) */
    --color-surface: #2e2e2e; /* 카드/패널 배경 */
    --color-text: #f5f5f5; /* 메인 텍스트 */
    --color-text-muted: #a1a1a1; /* 보조 텍스트 */
    --color-border: #404040; /* 경계선 - 더 자연스러운 그레이 */
    
    /* 다크 모드에서 브랜드 색상 미세 조정 */
    --color-primary: #7c3aed; /* 다크에서 더 생동감 있는 보라 */
    --color-primary-hover: #8b5cf6;
    --color-secondary: #14b8a6; /* 다크에서 더 선명한 청록 */
  }
}

/* 강제 다크 테마 클래스 */
.theme-dark {
  --color-bg: #242424; /* 메인 배경 (차분한 다크 그레이) */
  --color-surface: #2e2e2e; /* 카드/패널 배경 */
  --color-text: #f5f5f5; /* 메인 텍스트 */
  --color-text-muted: #a1a1a1; /* 보조 텍스트 */
  --color-border: #404040; /* 경계선 - 더 자연스러운 그레이 */
  
  /* 다크 모드에서 브랜드 색상 미세 조정 */
  --color-primary: #7c3aed; /* 다크에서 더 생동감 있는 보라 */
  --color-primary-hover: #8b5cf6;
  --color-secondary: #14b8a6; /* 다크에서 더 선명한 청록 */
}
```

### typography.css (Vite 폰트 최적화)

```css
/* src/design-system/tokens/typography.css */
/* Vite에서는 Google Fonts를 index.html에서 preload 권장 */

:root {
  /* 폰트 패밀리 - 시스템 폰트 우선 */
  --font-family-sans: 'Inter', 'Noto Sans KR', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, sans-serif;
  --font-family-mono: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Cascadia Code',
    monospace;

  /* 폰트 크기 스케일 (rem 기반) */
  --font-size-xs: 0.75rem; /* 12px */
  --font-size-sm: 0.875rem; /* 14px */
  --font-size-base: 1rem; /* 16px */
  --font-size-lg: 1.125rem; /* 18px */
  --font-size-xl: 1.25rem; /* 20px */
  --font-size-2xl: 1.5rem; /* 24px */
  --font-size-3xl: 1.875rem; /* 30px */
  --font-size-4xl: 2rem; /* 32px */

  /* 폰트 굵기 */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;

  /* 줄 높이 */
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;

  /* 자간 */
  --letter-spacing-tight: -0.025em;
  --letter-spacing-normal: 0em;
  --letter-spacing-wide: 0.025em;
}
```

### index.html에 추가할 폰트 preload

```html
<!-- public/index.html 또는 index.html -->
<head>
  <!-- Google Fonts preload (Vite 성능 최적화) -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Noto+Sans+KR:wght@400;500;700&display=swap"
    rel="stylesheet"
  />
</head>
```

### spacing.css (모바일 최적화)

```css
/* src/design-system/tokens/spacing.css */
:root {
  /* 모바일 친화적 간격 스케일 (iPhone SE 375px 기준) */
  --space-0: 0;
  --space-px: 1px;
  --space-0-5: 0.125rem; /* 2px */
  --space-1: 0.25rem; /* 4px */
  --space-1-5: 0.375rem; /* 6px */
  --space-2: 0.5rem; /* 8px */
  --space-2-5: 0.625rem; /* 10px */
  --space-3: 0.75rem; /* 12px */
  --space-3-5: 0.875rem; /* 14px */
  --space-4: 1rem; /* 16px */
  --space-5: 1.25rem; /* 20px */
  --space-6: 1.5rem; /* 24px */
  --space-7: 1.75rem; /* 28px */
  --space-8: 2rem; /* 32px */
  --space-10: 2.5rem; /* 40px */
  --space-12: 3rem; /* 48px */
  --space-16: 4rem; /* 64px */
  --space-20: 5rem; /* 80px */

  /* 모바일 친화적 브레이크포인트 (iPhone SE 375px부터) */
  --breakpoint-xs: 375px; /* iPhone SE */
  --breakpoint-sm: 640px; /* 큰 모바일 */
  --breakpoint-md: 768px; /* 태블릿 */
  --breakpoint-lg: 1024px; /* 데스크톱 */
  --breakpoint-xl: 1280px; /* 큰 데스크톱 */
  --breakpoint-2xl: 1536px; /* 초대형 화면 */

  /* 컨테이너 최대 너비 (모바일 우선) */
  --container-xs: 100%; /* iPhone SE: 전체 너비 */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;

  /* 모바일 터치 친화적 최소 크기 */
  --touch-target-min: 44px; /* iOS 가이드라인 */
  --touch-target-comfortable: 48px;

  /* 모바일 안전 영역 */
  --safe-area-inset-top: env(safe-area-inset-top, 0px);
  --safe-area-inset-right: env(safe-area-inset-right, 0px);
  --safe-area-inset-bottom: env(safe-area-inset-bottom, 0px);
  --safe-area-inset-left: env(safe-area-inset-left, 0px);

  /* 모바일 뷰포트 단위 */
  --vh-mobile: calc(var(--vh, 1vh) * 100);
  --vw-mobile: calc(var(--vw, 1vw) * 100);
}

/* 모바일 뷰포트 높이 보정 (iOS Safari 주소창 대응) */
:root {
  --vh: 1vh;
}

@media screen and (max-width: 768px) {
  :root {
    /* 모바일에서 더 작은 간격 사용 */
    --space-comfortable: var(--space-4); /* 기본 편안한 간격 */
    --space-tight: var(--space-2); /* 밀착 간격 */
  }
}
```

### effects.css

```css
/* src/design-system/tokens/effects.css */
:root {
  /* 모서리 둥글기 */
  --radius-none: 0;
  --radius-sm: 0.25rem; /* 4px */
  --radius-base: 0.5rem; /* 8px */
  --radius-md: 0.75rem; /* 12px */
  --radius-lg: 1rem; /* 16px */
  --radius-xl: 1.25rem; /* 20px */
  --radius-2xl: 1.5rem; /* 24px */
  --radius-full: 9999px;

  /* 그림자 시스템 (Subtle Depth) */
  --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-base: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);

  /* 전환 효과 */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;

  /* Z-index 레이어 */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
}
```

---

## 🧩 2단계: 베이스 컴포넌트 구현 (Vue 3 + Vite 최적화)

### VButton/index.ts (트리 셰이킹 최적화)

```typescript
// src/design-system/components/base/VButton/index.ts
import VButton from './VButton.vue';
import type { App } from 'vue';

VButton.install = (app: App) => {
  app.component('VButton', VButton);
};

export default VButton;
export type { ButtonProps } from './VButton.vue';
```

### VButton/VButton.vue (모바일 최적화)

```vue
<!-- src/design-system/components/base/VButton/VButton.vue -->
<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    :type="type"
    v-bind="$attrs"
    @click="handleClick"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <span v-if="loading" class="v-button__loading">
      <svg class="animate-spin" width="16" height="16" viewBox="0 0 24 24">
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
          fill="none"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </span>
    <span :class="{ 'opacity-0': loading }">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  block?: boolean;
  type?: 'button' | 'submit' | 'reset';
  touchFeedback?: boolean;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  block: false,
  type: 'button',
  touchFeedback: true,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const isPressed = ref(false);

const buttonClasses = computed(() => [
  'v-button',
  `v-button--${props.variant}`,
  `v-button--${props.size}`,
  {
    'v-button--block': props.block,
    'v-button--disabled': props.disabled || props.loading,
    'v-button--loading': props.loading,
    'v-button--pressed': isPressed.value && props.touchFeedback,
  },
]);

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
};

// 모바일 터치 피드백
const handleTouchStart = () => {
  if (props.touchFeedback && !props.disabled && !props.loading) {
    isPressed.value = true;
  }
};

const handleTouchEnd = () => {
  if (props.touchFeedback) {
    isPressed.value = false;
  }
};
</script>

<style scoped>
.v-button {
  /* 기본 스타일 */
  font-family: var(--font-family-sans);
  font-weight: var(--font-weight-medium);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-base);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  outline: none;
  position: relative;
  white-space: nowrap;
  user-select: none;
  -webkit-tap-highlight-color: transparent; /* iOS 터치 하이라이트 제거 */
  touch-action: manipulation; /* 더블탭 줌 방지 */
}

/* 모바일 터치 피드백 */
.v-button--pressed {
  transform: scale(0.98);
  transition: transform 0.1s ease;
}

/* 로딩 상태 */
.v-button--loading {
  cursor: not-allowed;
}

.v-button__loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* 크기 변형 (터치 친화적) */
.v-button--sm {
  font-size: var(--font-size-sm);
  padding: var(--space-2) var(--space-3);
  min-height: var(--touch-target-min); /* 44px 최소 터치 영역 */
  min-width: var(--touch-target-min);
}

.v-button--md {
  font-size: var(--font-size-base);
  padding: var(--space-3) var(--space-4);
  min-height: var(--touch-target-comfortable); /* 48px 편안한 터치 영역 */
  min-width: var(--touch-target-comfortable);
}

.v-button--lg {
  font-size: var(--font-size-lg);
  padding: var(--space-4) var(--space-6);
  min-height: 3rem; /* 48px+ 큰 터치 영역 */
}

/* 모바일에서 더 큰 패딩 적용 */
@media (max-width: 768px) {
  .v-button--sm {
    padding: var(--space-2-5) var(--space-4);
  }

  .v-button--md {
    padding: var(--space-3-5) var(--space-5);
  }

  .v-button--lg {
    padding: var(--space-4) var(--space-7);
  }
}

/* 색상 변형 */
.v-button--primary {
  background-color: var(--color-primary);
  color: white;
  box-shadow: var(--shadow-sm);
}

.v-button--primary:hover:not(.v-button--disabled) {
  background-color: var(--color-primary-hover);
  box-shadow: var(--shadow-md);
}

/* 모바일에서는 hover 대신 active 상태 사용 */
@media (hover: none) and (pointer: coarse) {
  .v-button--primary:active:not(.v-button--disabled) {
    background-color: var(--color-primary-hover);
    transform: scale(0.98);
  }
}

.v-button--secondary {
  background-color: var(--color-secondary);
  color: var(--color-gray-900);
  box-shadow: var(--shadow-sm);
}

.v-button--secondary:hover:not(.v-button--disabled) {
  background-color: var(--color-secondary-600);
  box-shadow: var(--shadow-md);
}

@media (hover: none) and (pointer: coarse) {
  .v-button--secondary:active:not(.v-button--disabled) {
    background-color: var(--color-secondary-600);
    transform: scale(0.98);
  }
}

.v-button--ghost {
  background-color: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.v-button--ghost:hover:not(.v-button--disabled) {
  background-color: var(--color-surface);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

@media (hover: none) and (pointer: coarse) {
  .v-button--ghost:active:not(.v-button--disabled) {
    background-color: var(--color-surface);
    border-color: var(--color-primary);
    color: var(--color-primary);
    transform: scale(0.98);
  }
}

.v-button--danger {
  background-color: var(--color-danger);
  color: white;
  box-shadow: var(--shadow-sm);
}

.v-button--danger:hover:not(.v-button--disabled) {
  background-color: #dc2626;
  box-shadow: var(--shadow-md);
}

@media (hover: none) and (pointer: coarse) {
  .v-button--danger:active:not(.v-button--disabled) {
    background-color: #dc2626;
    transform: scale(0.98);
  }
}

/* 상태 */
.v-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.v-button--block {
  width: 100%;
}

/* 포커스 상태 (키보드 네비게이션) */
.v-button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* 모바일에서 포커스 아웃라인 숨김 */
@media (hover: none) and (pointer: coarse) {
  .v-button:focus {
    outline: none;
  }
}
</style>
```

### VCard.vue

```vue
<!-- src/design-system/components/base/VCard.vue -->
<template>
  <div :class="cardClasses">
    <header v-if="$slots.header" class="v-card__header">
      <slot name="header" />
    </header>

    <div class="v-card__body">
      <slot />
    </div>

    <footer v-if="$slots.footer" class="v-card__footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  padding: 'md',
});

const cardClasses = computed(() => [
  'v-card',
  `v-card--${props.variant}`,
  `v-card--padding-${props.padding}`,
]);
</script>

<style scoped>
.v-card {
  background-color: var(--color-bg);
  border-radius: var(--radius-lg);
  position: relative;
  overflow: hidden;
}

/* 변형 */
.v-card--default {
  border: 1px solid var(--color-border);
}

.v-card--elevated {
  box-shadow: var(--shadow-md);
  border: 1px solid transparent;
}

.v-card--outlined {
  border: 2px solid var(--color-border);
  box-shadow: none;
}

/* 패딩 */
.v-card--padding-none .v-card__body {
  padding: 0;
}

.v-card--padding-sm .v-card__body {
  padding: var(--space-3);
}

.v-card--padding-md .v-card__body {
  padding: var(--space-4);
}

.v-card--padding-lg .v-card__body {
  padding: var(--space-6);
}

/* 헤더 */
.v-card__header {
  padding: var(--space-4);
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-surface);
}

.v-card--padding-sm .v-card__header {
  padding: var(--space-3);
}

.v-card--padding-lg .v-card__header {
  padding: var(--space-6);
}

/* 푸터 */
.v-card__footer {
  padding: var(--space-4);
  border-top: 1px solid var(--color-border);
  background-color: var(--color-surface);
}

.v-card--padding-sm .v-card__footer {
  padding: var(--space-3);
}

.v-card--padding-lg .v-card__footer {
  padding: var(--space-6);
}
</style>
```

### VModal.vue

```vue
<!-- src/design-system/components/base/VModal.vue -->
<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="v-modal-overlay"
        @click="handleOverlayClick"
      >
        <div class="v-modal" :class="modalClasses" @click.stop>
          <header v-if="title || $slots.header" class="v-modal__header">
            <div class="v-modal__title">
              <slot name="header">
                <h3>{{ title }}</h3>
              </slot>
            </div>
            <button
              v-if="closable"
              class="v-modal__close"
              @click="$emit('update:modelValue', false)"
            >
              ✕
            </button>
          </header>

          <div class="v-modal__body">
            <slot />
          </div>

          <footer v-if="$slots.footer" class="v-modal__footer">
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';

interface Props {
  modelValue: boolean;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closable?: boolean;
  closeOnOverlay?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  closable: true,
  closeOnOverlay: true,
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const modalClasses = computed(() => [`v-modal--${props.size}`]);

const handleOverlayClick = () => {
  if (props.closeOnOverlay) {
    emit('update:modelValue', false);
  }
};

// 모달이 열릴 때 스크롤 방지
watch(
  () => props.modelValue,
  isOpen => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
);
</script>

<style scoped>
.v-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal);
  padding: var(--space-4);
}

.v-modal {
  background-color: var(--color-bg);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

/* 크기 변형 */
.v-modal--sm {
  width: 100%;
  max-width: 400px;
}

.v-modal--md {
  width: 100%;
  max-width: 600px;
}

.v-modal--lg {
  width: 100%;
  max-width: 800px;
}

.v-modal--xl {
  width: 100%;
  max-width: 1200px;
}

.v-modal--full {
  width: 100%;
  height: 100%;
  max-width: none;
  max-height: none;
  border-radius: 0;
}

/* 헤더 */
.v-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-6);
  border-bottom: 1px solid var(--color-border);
}

.v-modal__title h3 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin: 0;
}

.v-modal__close {
  background: none;
  border: none;
  font-size: var(--font-size-xl);
  color: var(--color-text-muted);
  cursor: pointer;
  padding: var(--space-1);
  border-radius: var(--radius-base);
  transition: all var(--transition-base);
}

.v-modal__close:hover {
  background-color: var(--color-surface);
  color: var(--color-text);
}

/* 본문 */
.v-modal__body {
  padding: var(--space-6);
}

/* 푸터 */
.v-modal__footer {
  padding: var(--space-6);
  border-top: 1px solid var(--color-border);
  background-color: var(--color-surface);
}

/* 트랜지션 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity var(--transition-base);
}

.modal-enter-active .v-modal,
.modal-leave-active .v-modal {
  transition: transform var(--transition-base);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .v-modal,
.modal-leave-to .v-modal {
  transform: scale(0.95) translateY(-20px);
}
</style>
```

---

## 🏗 3단계: 레이아웃 컴포넌트

### VContainer/VContainer.vue (모바일 최적화)

```vue
<!-- src/design-system/components/layout/VContainer/VContainer.vue -->
<template>
  <div :class="containerClasses" :style="containerStyles">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export interface ContainerProps {
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: boolean | 'comfortable' | 'tight';
  safeArea?: boolean;
  centerContent?: boolean;
}

const props = withDefaults(defineProps<ContainerProps>(), {
  maxWidth: 'xl',
  padding: true,
  safeArea: true,
  centerContent: false,
});

const containerClasses = computed(() => [
  'v-container',
  `v-container--${props.maxWidth}`,
  {
    'v-container--padded': props.padding === true,
    'v-container--padded-comfortable': props.padding === 'comfortable',
    'v-container--padded-tight': props.padding === 'tight',
    'v-container--safe-area': props.safeArea,
    'v-container--center': props.centerContent,
  },
]);

const containerStyles = computed(() => {
  const styles: Record<string, string> = {};

  // 모바일 안전 영역 적용
  if (props.safeArea) {
    styles['padding-top'] = `max(var(--space-4), var(--safe-area-inset-top))`;
    styles[
      'padding-bottom'
    ] = `max(var(--space-4), var(--safe-area-inset-bottom))`;
    styles['padding-left'] = `max(var(--space-4), var(--safe-area-inset-left))`;
    styles[
      'padding-right'
    ] = `max(var(--space-4), var(--safe-area-inset-right))`;
  }

  return styles;
});
</script>

<style scoped>
.v-container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}

/* 기본 패딩 */
.v-container--padded {
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}

.v-container--padded-comfortable {
  padding: var(--space-6);
}

.v-container--padded-tight {
  padding: var(--space-2);
}

/* iPhone SE에서 최적화된 패딩 */
@media (max-width: 375px) {
  .v-container--padded {
    padding-left: var(--space-3);
    padding-right: var(--space-3);
  }

  .v-container--padded-comfortable {
    padding: var(--space-4);
  }

  .v-container--padded-tight {
    padding: var(--space-1-5);
  }
}

/* 큰 모바일에서 패딩 증가 */
@media (min-width: 480px) {
  .v-container--padded {
    padding-left: var(--space-6);
    padding-right: var(--space-6);
  }
}

/* 태블릿 이상에서 더 큰 패딩 */
@media (min-width: 768px) {
  .v-container--padded {
    padding-left: var(--space-8);
    padding-right: var(--space-8);
  }
}

/* 콘텐츠 중앙 정렬 */
.v-container--center {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* 최대 너비 설정 (모바일 우선) */
.v-container--xs {
  max-width: var(--container-xs); /* 100% */
}

.v-container--sm {
  max-width: var(--container-sm);
}

.v-container--md {
  max-width: var(--container-md);
}

.v-container--lg {
  max-width: var(--container-lg);
}

.v-container--xl {
  max-width: var(--container-xl);
}

.v-container--2xl {
  max-width: var(--container-2xl);
}

.v-container--full {
  max-width: none;
}

/* 안전 영역 지원 */
.v-container--safe-area {
  /* iOS의 노치와 홈 인디케이터 등을 피함 */
  padding-top: max(var(--space-4), var(--safe-area-inset-top));
  padding-bottom: max(var(--space-4), var(--safe-area-inset-bottom));
  padding-left: max(var(--space-4), var(--safe-area-inset-left));
  padding-right: max(var(--space-4), var(--safe-area-inset-right));
}
</style>
```

### VGrid.vue

```vue
<!-- src/design-system/components/layout/VGrid.vue -->
<template>
  <div :class="gridClasses" :style="gridStyles">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  cols?: number | Record<string, number>;
  gap?: number | string;
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  justifyItems?: 'start' | 'center' | 'end' | 'stretch';
}

const props = withDefaults(defineProps<Props>(), {
  cols: 1,
  gap: 4,
  alignItems: 'stretch',
  justifyItems: 'stretch',
});

const gridClasses = computed(() => [
  'v-grid',
  `v-grid--align-${props.alignItems}`,
  `v-grid--justify-${props.justifyItems}`,
]);

const gridStyles = computed(() => {
  const styles: Record<string, string> = {};

  // gap 처리
  if (typeof props.gap === 'number') {
    styles['gap'] = `var(--space-${props.gap})`;
  } else {
    styles['gap'] = props.gap;
  }

  // cols 처리
  if (typeof props.cols === 'number') {
    styles['grid-template-columns'] = `repeat(${props.cols}, 1fr)`;
  } else {
    // 반응형 컬럼 설정
    styles['grid-template-columns'] = '1fr';
  }

  return styles;
});
</script>

<style scoped>
.v-grid {
  display: grid;
}

.v-grid--align-start {
  align-items: start;
}

.v-grid--align-center {
  align-items: center;
}

.v-grid--align-end {
  align-items: end;
}

.v-grid--align-stretch {
  align-items: stretch;
}

.v-grid--justify-start {
  justify-items: start;
}

.v-grid--justify-center {
  justify-items: center;
}

.v-grid--justify-end {
  justify-items: end;
}

.v-grid--justify-stretch {
  justify-items: stretch;
}

/* 반응형 그리드 지원 */
@media (min-width: var(--breakpoint-md)) {
  .v-grid--responsive {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: var(--breakpoint-lg)) {
  .v-grid--responsive {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: var(--breakpoint-xl)) {
  .v-grid--responsive {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
```

---

## 🎛 4단계: 테마 관리 시스템 (Vue 3 + Vite 최적화)

### useTheme.ts

```typescript
// src/design-system/composables/useTheme.ts
import { ref, computed, watch, onMounted } from 'vue';
import type { Ref } from 'vue';

type ThemeMode = 'light' | 'dark' | 'system';

// 전역 상태로 관리 (Vite HMR 친화적)
const themeMode: Ref<ThemeMode> = ref('system');
const systemPrefersDark = ref(false);

let mediaQuery: MediaQueryList | null = null;

export function useTheme() {
  const isDark = computed(() => {
    if (themeMode.value === 'system') {
      return systemPrefersDark.value;
    }
    return themeMode.value === 'dark';
  });

  const setTheme = (mode: ThemeMode) => {
    themeMode.value = mode;
    // Vite 환경에서는 localStorage 사용 최적화
    if (typeof window !== 'undefined') {
      localStorage.setItem('vue-board-theme', mode);
    }
  };

  const toggleTheme = () => {
    setTheme(isDark.value ? 'light' : 'dark');
  };

  // DOM 클래스 업데이트 (Vite 개발 환경 고려)
  const updateThemeClass = (dark: boolean) => {
    if (typeof document === 'undefined') return;

    const html = document.documentElement;

    if (dark) {
      html.classList.add('theme-dark');
      html.classList.remove('theme-light');
      html.setAttribute('data-theme', 'dark');
    } else {
      html.classList.add('theme-light');
      html.classList.remove('theme-dark');
      html.setAttribute('data-theme', 'light');
    }
  };

  // 시스템 테마 감지 초기화
  const initSystemTheme = () => {
    if (typeof window === 'undefined') return;

    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    systemPrefersDark.value = mediaQuery.matches;

    const handleChange = (e: MediaQueryListEvent) => {
      systemPrefersDark.value = e.matches;
    };

    // Vite 환경에서 HMR 시 이벤트 리스너 정리
    mediaQuery.removeEventListener('change', handleChange);
    mediaQuery.addEventListener('change', handleChange);
  };

  // 저장된 테마 복원
  const initTheme = () => {
    if (typeof window === 'undefined') return;

    const saved = localStorage.getItem('vue-board-theme') as ThemeMode;
    if (saved && ['light', 'dark', 'system'].includes(saved)) {
      themeMode.value = saved;
    }
  };

  // 테마 변경 감시
  watch(isDark, updateThemeClass, { immediate: true });

  // 컴포넌트 마운트 시 초기화 (Vite SSR 고려)
  onMounted(() => {
    initSystemTheme();
    initTheme();
  });

  return {
    themeMode: computed(() => themeMode.value),
    isDark,
    setTheme,
    toggleTheme,
    initTheme,
    // 개발용 유틸리티
    __dev: import.meta.env.DEV ? { systemPrefersDark, mediaQuery } : undefined,
  };
}
```

### useBreakpoint.ts (Vite 최적화)

````typescript
// src/design-system/composables/useBreakpoint.ts
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const

type Breakpoint = keyof typeof breakpoints

// 전역 상태로 관리 (성능 최적화)
const windowWidth: Ref<number> = ref(0)
let resizeObserver: ResizeObserver | null = null

export function useBreakpoint() {
  const isBreakpoint = (breakpoint: Breakpoint) => {
    return computed(() => windowWidth.value >= breakpoints[breakpoint])
  }

  const currentBreakpoint = computed((): Breakpoint => {
    const width = windowWidth.value
    if (width >= breakpoints['2xl']) return '2xl'
    if (width >= breakpoints.xl) return 'xl'
    if (width >= breakpoints.lg) return 'lg'
    if (width >= breakpoints.md) return 'md'
    return 'sm'
  })

  // Vite 환경에서 ResizeObserver 사용 (성능 최적화)
  const initBreakpoint = () => {
    if (typeof window === 'undefined') return

    windowWidth.value = window.innerWidth

    // ResizeObserver를 사용한 성능 최적화
    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          windowWidth.value = entry.contentRect.width
        }
      })
      resizeObserver.observe(document.documentElement)
    } else {
      // 폴백: 기존 resize 이벤트
      const handleResize = () => {
        windowWidth.value = window.innerWidth
      }
      window.addEventListener('resize', handleResize, { passive: true })

      // 정리 함수
      onUnmounted(() => {
        window.removeEventListener('resize', handleResize)
      })
    }
  }

  onMounted(initBreakpoint)

  onUnmounted(() => {
    if (resizeObserver) {
      resizeObserver.disconnect()
      resizeObserver = null
    }
  })

  return {
    windowWidth: computed(() => windowWidth.value),
    currentBreakpoint,
    isSmUp: isBreakpoint('sm'),
    isMdUp: isBreakpoint('md'),
    isLgUp: isBreakpoint('lg'),
    isXlUp: isBreakpoint('xl'),
    is2xlUp: isBreakpoint('2xl'),
    // 개발용 디버깅
    __breakpoints: import.meta.env.DEV ? breakpoints : undefined
  }
}
``` => {
---

## 🎨 5단계: 글로벌 스타일 (Vite CSS 최적화)

### styles/index.css (메인 CSS 진입점)
```css
/* src/design-system/styles/index.css */
/* Vite CSS 진입점 - 모든 스타일을 하나로 통합 */
@import '../tokens/index.css';
@import './base.css';
@import './themes.css';
@import './utilities.css';
````

### styles/base.css (기본 스타일)

```css
/* src/design-system/styles/base.css */
/* 모던 CSS 리셋 및 기본 스타일 */

/* 모던 CSS 리셋 */
*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}

html {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  scroll-behavior: smooth;
  /* Vite 환경에서 성능 최적화 */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  color: var(--color-text);
  background-color: var(--color-bg);
  /* Vite HMR 시 부드러운 전환 */
  transition: background-color var(--transition-base), color var(--transition-base);
  min-height: 100vh;
  overflow-x: hidden;
}

/* 미디어 요소 기본 설정 */
img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
  height: auto;
}

/* 폼 요소 스타일링 */
input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
  border: none;
  background: none;
}

/* 텍스트 선택 스타일 */
::selection {
  background-color: var(--color-primary);
  color: white;
}

/* 포커스 아웃라인 */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* 스크롤바 스타일 (Webkit) */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background-color: var(--color-surface);
  border-radius: var(--radius-full);
}

::-webkit-scrollbar-thumb {
  background-color: var(--color-text-muted);
  border-radius: var(--radius-full);
  transition: background-color var(--transition-base);
}

::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-primary);
}

/* Firefox 스크롤바 */
* {
  scrollbar-width: thin;
  scrollbar-color: var(--color-text-muted) var(--color-surface);
}
```

---

## 📦 6단계: 컴포넌트 등록 (Vite + Vue 3 최적화)

### composables/index.ts

```typescript
// src/design-system/composables/index.ts
export { useTheme } from './useTheme';
export { useBreakpoint } from './useBreakpoint';

// 타입 export
export type { ThemeMode } from './useTheme';
export type { Breakpoint } from './useBreakpoint';
```

### components/index.ts (트리 셰이킹 최적화)

```typescript
// src/design-system/components/index.ts
import type { App } from 'vue';

// Base Components (동적 import로 최적화)
export { default as VButton } from './base/VButton';
export { default as VCard } from './base/VCard';
export { default as VModal } from './base/VModal';

// Layout Components
export { default as VContainer } from './layout/VContainer';
export { default as VGrid } from './layout/VGrid';

// 전체 설치 함수 (선택적 설치 지원)
export interface DesignSystemOptions {
  components?: string[];
  prefix?: string;
}

// 컴포넌트 맵
const componentMap = {
  VButton: () => import('./base/VButton'),
  VCard: () => import('./base/VCard'),
  VModal: () => import('./base/VModal'),
  VContainer: () => import('./layout/VContainer'),
  VGrid: () => import('./layout/VGrid'),
};

export default {
  install(app: App, options: DesignSystemOptions = {}) {
    const { components = Object.keys(componentMap), prefix = '' } = options;

    // 선택적 컴포넌트 등록 (번들 크기 최적화)
    components.forEach(async componentName => {
      if (componentName in componentMap) {
        const componentLoader =
          componentMap[componentName as keyof typeof componentMap];
        const component = await componentLoader();
        const registrationName = prefix + componentName;
        app.component(registrationName, component.default);
      }
    });
  },
};
```

### index.ts (메인 진입점)

```typescript
// src/design-system/index.ts
import './styles/index.css';

// 컴포넌트 export
export * from './components';

// Composables export
export * from './composables';

// 타입 export
export type { ButtonProps } from './components/base/VButton/VButton.vue';
export type { CardProps } from './components/base/VCard/VCard.vue';
export type { ModalProps } from './components/base/VModal/VModal.vue';

// 기본 export
export { default } from './components';

// 버전 정보 (Vite 환경 변수 활용)
export const version = import.meta.env.VITE_DESIGN_SYSTEM_VERSION || '1.0.0';
```

### main.ts 설정 (Vite 최적화)

```typescript
// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';

// 디자인 시스템 import (트리 셰이킹 지원)
import VueBoardDesignSystem from './design-system';

const app = createApp(App);

// 디자인 시스템 등록 (선택적 설치)
app.use(VueBoardDesignSystem, {
  // 필요한 컴포넌트만 등록 (번들 크기 최적화)
  components: ['VButton', 'VCard', 'VModal', 'VContainer', 'VGrid'],
  prefix: '', // 접두어 없이 사용
});

app.mount('#app');
```

---

## 🔧 7단계: Vite 설정 최적화

### vite.config.ts

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],

  // 경로 별칭 설정
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@design-system': resolve(__dirname, 'src/design-system'),
    },
  },

  // CSS 최적화
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      css: {
        charset: false,
      },
    },
  },

  // 빌드 최적화
  build: {
    // CSS 코드 스플리팅
    cssCodeSplit: true,

    // 청크 분할 전략
    rollupOptions: {
      output: {
        manualChunks: {
          'design-system': ['./src/design-system/index.ts'],
        },
      },
    },

    // 소스맵 생성 (개발용)
    sourcemap: process.env.NODE_ENV === 'development',
  },

  // 개발 서버 최적화
  server: {
    hmr: {
      overlay: false, // HMR 오류 오버레이 비활성화
    },
  },

  // 환경 변수 설정
  define: {
    __DESIGN_SYSTEM_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
});
```

### tsconfig.json (TypeScript 설정)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* Path mapping */
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@design-system/*": ["src/design-system/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### types/design-system.d.ts

```typescript
// src/types/design-system.d.ts
import type { App } from 'vue';

// 글로벌 컴포넌트 타입 확장
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    VButton: typeof import('@design-system/components/base/VButton/VButton.vue')['default'];
    VCard: typeof import('@design-system/components/base/VCard/VCard.vue')['default'];
    VModal: typeof import('@design-system/components/base/VModal/VModal.vue')['default'];
    VContainer: typeof import('@design-system/components/layout/VContainer/VContainer.vue')['default'];
    VGrid: typeof import('@design-system/components/layout/VGrid/VGrid.vue')['default'];
  }
}

// Vite 환경 변수 타입
interface ImportMetaEnv {
  readonly VITE_DESIGN_SYSTEM_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export {};
```

---

## 🧪 8단계: 사용 예시 (Vite 최적화)

### App.vue (Vite HMR 친화적)

```vue
<!-- src/App.vue -->
<template>
  <div id="app">
    <HomePage />
  </div>
</template>

<script setup lang="ts">
// Vite에서 동적 import 최적화
import { defineAsyncComponent } from 'vue';

const HomePage = defineAsyncComponent(() => import('./views/HomePage.vue'));

// 개발 모드에서 HMR 상태 감지
if (import.meta.hot) {
  import.meta.hot.accept('./views/HomePage.vue', newModule => {
    console.log('HomePage HMR updated');
  });
}
</script>
```

### package.json 스크립트

```json
{
  "name": "vue-board-design-system",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite --host",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "type-check": "vue-tsc --noEmit",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix",
    "build:design-system": "vite build --mode library",
    "analyze": "vite-bundle-analyzer"
  },
  "dependencies": {
    "vue": "^3.4.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.5.0",
    "typescript": "^5.2.0",
    "vite": "^5.0.0",
    "vue-tsc": "^1.8.0"
  }
}
```

---

## ✅ 9단계: Vite + Vue 3 최적화 체크리스트

### 성능 최적화

- [ ] **동적 import 활용** - 컴포넌트 레이지 로딩
- [ ] **CSS 코드 스플리팅** - 필요한 CSS만 로드
- [ ] **트리 셰이킹 지원** - 사용하지 않는 코드 제거
- [ ] **번들 분석** - vite-bundle-analyzer로 번들 크기 확인
- [ ] **HMR 최적화** - 빠른 개발 환경 구축

### Vite 특화 최적화

- [ ] **환경 변수 활용** - import.meta.env 사용
- [ ] **플러그인 설정** - Vue SFC 최적화
- [ ] **빌드 설정** - Rollup 옵션 최적화
- [ ] **경로 별칭** - @ 별칭으로 import 간소화
- [ ] **TypeScript 통합** - 타입 안전성 확보

### Vue 3 특화 최적화

- [ ] **Composition API** - 모든 컴포넌트에서 활용
- [ ] **script setup** - 간결한 컴포넌트 문법
- [ ] **Teleport 활용** - 모달 등에서 DOM 조작
- [ ] **Suspense 지원** - 비동기 컴포넌트 로딩
- [ ] **v-model 다중 바인딩** - 폼 컴포넌트 최적화

### 개발 경험 개선

- [ ] **자동완성 지원** - TypeScript 타입 정의 완성
- [ ] **HMR 상태 관리** - 테마 상태 유지
- [ ] **개발용 유틸리티** - 디버깅 도구 제공
- [ ] **에러 바운더리** - 개발 환경 에러 처리
- [ ] **소스맵 생성** - 디버깅 편의성

이제 Vue 3 + Vite 환경에 완전히 최적화된 디자인 시스템이 구축되었습니다! 🚀

---

## 🎨 5단계: 글로벌 스타일

### global.css

```css
/* src/design-system/styles/global.css */
/* 모든 토큰 파일 import */
@import '../tokens/colors.css';
@import '../tokens/typography.css';
@import '../tokens/spacing.css';
@import '../tokens/effects.css';

/* 리셋 및 기본 스타일 */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  color: var(--color-text);
  background-color: var(--color-bg);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: background-color var(--transition-base), color var(--transition-base);
}

/* 텍스트 선택 스타일 */
::selection {
  background-color: var(--color-primary);
  color: white;
}

::-moz-selection {
  background-color: var(--color-primary);
  color: white;
}

/* 포커스 아웃라인 */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* 스크롤바 스타일 (Webkit) */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background-color: var(--color-surface);
}

::-webkit-scrollbar-thumb {
  background-color: var(--color-text-muted);
  border-radius: var(--radius-full);
}

::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-primary);
}
```

### themes.css

```css
/* src/design-system/styles/themes.css */
/* 기본 라이트 테마 */
.theme-light {
  --color-bg: #ffffff;
  --color-surface: var(--color-gray-50);
  --color-text: var(--color-gray-900);
  --color-text-muted: var(--color-gray-600);
  --color-border: var(--color-gray-200);
}

/* 다크 테마 */
.theme-dark {
  --color-bg: #242424;
  --color-surface: #2e2e2e;
  --color-text: #f5f5f5;
  --color-text-muted: #a1a1a1;
  --color-border: #3a3a3a;

  /* 다크 모드에서 그림자 조정 */
  --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  --shadow-base: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
  --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
  --shadow-xl: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

/* 브랜드 테마 변형 예시 */
.theme-brand-blue {
  --color-primary: #1e40af;
  --color-primary-hover: #1d4ed8;
  --color-secondary: #0891b2;
}

.theme-brand-green {
  --color-primary: #059669;
  --color-primary-hover: #047857;
  --color-secondary: #65a30d;
}

.theme-brand-purple {
  --color-primary: #7c3aed;
  --color-primary-hover: #6d28d9;
  --color-secondary: #c026d3;
}
```

### utilities.css

```css
/* src/design-system/styles/utilities.css */
/* 간격 유틸리티 */
.p-0 {
  padding: var(--space-0) !important;
}
.p-1 {
  padding: var(--space-1) !important;
}
.p-2 {
  padding: var(--space-2) !important;
}
.p-3 {
  padding: var(--space-3) !important;
}
.p-4 {
  padding: var(--space-4) !important;
}
.p-6 {
  padding: var(--space-6) !important;
}
.p-8 {
  padding: var(--space-8) !important;
}

.m-0 {
  margin: var(--space-0) !important;
}
.m-1 {
  margin: var(--space-1) !important;
}
.m-2 {
  margin: var(--space-2) !important;
}
.m-3 {
  margin: var(--space-3) !important;
}
.m-4 {
  margin: var(--space-4) !important;
}
.m-6 {
  margin: var(--space-6) !important;
}
.m-8 {
  margin: var(--space-8) !important;
}

/* 텍스트 유틸리티 */
.text-xs {
  font-size: var(--font-size-xs) !important;
}
.text-sm {
  font-size: var(--font-size-sm) !important;
}
.text-base {
  font-size: var(--font-size-base) !important;
}
.text-lg {
  font-size: var(--font-size-lg) !important;
}
.text-xl {
  font-size: var(--font-size-xl) !important;
}
.text-2xl {
  font-size: var(--font-size-2xl) !important;
}

.font-normal {
  font-weight: var(--font-weight-normal) !important;
}
.font-medium {
  font-weight: var(--font-weight-medium) !important;
}
.font-bold {
  font-weight: var(--font-weight-bold) !important;
}

.text-center {
  text-align: center !important;
}
.text-left {
  text-align: left !important;
}
.text-right {
  text-align: right !important;
}

/* 색상 유틸리티 */
.text-primary {
  color: var(--color-primary) !important;
}
.text-secondary {
  color: var(--color-secondary) !important;
}
.text-success {
  color: var(--color-success) !important;
}
.text-danger {
  color: var(--color-danger) !important;
}
.text-warning {
  color: var(--color-warning) !important;
}
.text-info {
  color: var(--color-info) !important;
}
.text-muted {
  color: var(--color-text-muted) !important;
}

/* 레이아웃 유틸리티 */
.flex {
  display: flex !important;
}
.inline-flex {
  display: inline-flex !important;
}
.grid {
  display: grid !important;
}
.block {
  display: block !important;
}
.inline-block {
  display: inline-block !important;
}
.hidden {
  display: none !important;
}

.flex-col {
  flex-direction: column !important;
}
.flex-row {
  flex-direction: row !important;
}

.items-center {
  align-items: center !important;
}
.items-start {
  align-items: flex-start !important;
}
.items-end {
  align-items: flex-end !important;
}

.justify-center {
  justify-content: center !important;
}
.justify-between {
  justify-content: space-between !important;
}
.justify-around {
  justify-content: space-around !important;
}
.justify-evenly {
  justify-content: space-evenly !important;
}

/* 그림자 유틸리티 */
.shadow-none {
  box-shadow: none !important;
}
.shadow-xs {
  box-shadow: var(--shadow-xs) !important;
}
.shadow-sm {
  box-shadow: var(--shadow-sm) !important;
}
.shadow-base {
  box-shadow: var(--shadow-base) !important;
}
.shadow-md {
  box-shadow: var(--shadow-md) !important;
}
.shadow-lg {
  box-shadow: var(--shadow-lg) !important;
}
.shadow-xl {
  box-shadow: var(--shadow-xl) !important;
}

/* 반응형 유틸리티 */
@media (min-width: var(--breakpoint-sm)) {
  .sm\:block {
    display: block !important;
  }
  .sm\:flex {
    display: flex !important;
  }
  .sm\:grid {
    display: grid !important;
  }
  .sm\:hidden {
    display: none !important;
  }
}

@media (min-width: var(--breakpoint-md)) {
  .md\:block {
    display: block !important;
  }
  .md\:flex {
    display: flex !important;
  }
  .md\:grid {
    display: grid !important;
  }
  .md\:hidden {
    display: none !important;
  }
}

@media (min-width: var(--breakpoint-lg)) {
  .lg\:block {
    display: block !important;
  }
  .lg\:flex {
    display: flex !important;
  }
  .lg\:grid {
    display: grid !important;
  }
  .lg\:hidden {
    display: none !important;
  }
}
```

---

## 📦 6단계: 컴포넌트 등록

### index.ts

```typescript
// src/design-system/components/index.ts
import type { App } from 'vue';

// Base Components
import VButton from './base/VButton.vue';
import VCard from './base/VCard.vue';
import VModal from './base/VModal.vue';

// Layout Components
import VContainer from './layout/VContainer.vue';
import VGrid from './layout/VGrid.vue';

const components = {
  VButton,
  VCard,
  VModal,
  VContainer,
  VGrid,
};

export default {
  install(app: App) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component);
    });
  },
};

export { VButton, VCard, VModal, VContainer, VGrid };
```

### main.ts 설정

```typescript
// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';

// 디자인 시스템 import
import VueBoardDesignSystem from './design-system/components';
import './design-system/styles/global.css';
import './design-system/styles/themes.css';
import './design-system/styles/utilities.css';

// 테마 초기화
import { useTheme } from './design-system/composables/useTheme';

const app = createApp(App);

// 디자인 시스템 등록
app.use(VueBoardDesignSystem);

// 테마 초기화
const { initTheme } = useTheme();
initTheme();

app.mount('#app');
```

---

## 🧪 7단계: 사용 예시

### 기본 페이지 예시

```vue
<!-- src/views/HomePage.vue -->
<template>
  <div class="home-page">
    <VContainer>
      <!-- 헤더 섹션 -->
      <header class="hero-section">
        <VCard variant="elevated" padding="lg">
          <template #header>
            <div class="flex items-center justify-between">
              <h1 class="text-2xl font-bold">Vue Board</h1>
              <VButton variant="ghost" @click="toggleTheme">
                {{ isDark ? '🌞' : '🌙' }}
              </VButton>
            </div>
          </template>

          <div class="text-center">
            <p class="text-lg text-muted mb-6">
              Flat 2.0 + Subtle Depth + Adaptive Tokens 디자인 시스템
            </p>
            <div class="flex gap-4 justify-center">
              <VButton variant="primary" size="lg">시작하기</VButton>
              <VButton variant="ghost" size="lg">문서 보기</VButton>
            </div>
          </div>
        </VCard>
      </header>

      <!-- 기능 소개 -->
      <section class="features-section">
        <h2 class="text-xl font-bold text-center mb-8">주요 기능</h2>

        <VGrid cols="1" gap="6" class="md:grid-cols-3">
          <VCard
            v-for="feature in features"
            :key="feature.id"
            variant="default"
          >
            <div class="text-center">
              <div class="text-4xl mb-4">{{ feature.icon }}</div>
              <h3 class="text-lg font-medium mb-2">{{ feature.title }}</h3>
              <p class="text-muted">{{ feature.description }}</p>
            </div>
          </VCard>
        </VGrid>
      </section>

      <!-- 액션 버튼들 -->
      <section class="actions-section">
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <VButton
            v-for="action in actions"
            :key="action.id"
            :variant="action.variant"
            @click="handleAction(action.id)"
          >
            {{ action.label }}
          </VButton>
        </div>
      </section>
    </VContainer>

    <!-- 모달 예시 -->
    <VModal v-model="showModal" title="설정" size="md">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">테마 설정</label>
          <div class="flex gap-2">
            <VButton
              variant="ghost"
              size="sm"
              :class="{ 'bg-primary text-white': themeMode === 'light' }"
              @click="setTheme('light')"
            >
              라이트
            </VButton>
            <VButton
              variant="ghost"
              size="sm"
              :class="{ 'bg-primary text-white': themeMode === 'dark' }"
              @click="setTheme('dark')"
            >
              다크
            </VButton>
            <VButton
              variant="ghost"
              size="sm"
              :class="{ 'bg-primary text-white': themeMode === 'system' }"
              @click="setTheme('system')"
            >
              시스템
            </VButton>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-2">
          <VButton variant="ghost" @click="showModal = false">취소</VButton>
          <VButton variant="primary" @click="showModal = false">확인</VButton>
        </div>
      </template>
    </VModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTheme } from '@/design-system/composables/useTheme';

const { isDark, themeMode, setTheme, toggleTheme } = useTheme();
const showModal = ref(false);

const features = [
  {
    id: 1,
    icon: '🎨',
    title: 'Flat 2.0 디자인',
    description: '깔끔하고 모던한 플랫 디자인 2.0 스타일',
  },
  {
    id: 2,
    icon: '🌊',
    title: 'Subtle Depth',
    description: '미묘한 그림자로 자연스러운 깊이감 표현',
  },
  {
    id: 3,
    icon: '🔧',
    title: 'Adaptive Tokens',
    description: '유연한 디자인 토큰으로 쉬운 테마 관리',
  },
];

const actions = [
  { id: 'settings', label: '설정', variant: 'primary' as const },
  { id: 'help', label: '도움말', variant: 'secondary' as const },
  { id: 'about', label: '정보', variant: 'ghost' as const },
];

const handleAction = (actionId: string) => {
  if (actionId === 'settings') {
    showModal.value = true;
  }
  console.log(`Action: ${actionId}`);
};
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  padding: var(--space-8) 0;
}

.hero-section {
  margin-bottom: var(--space-16);
}

.features-section {
  margin-bottom: var(--space-16);
}

.actions-section {
  margin-bottom: var(--space-8);
}
</style>
```

---

## ✅ 8단계: 구축 체크리스트

### 필수 구현 사항

- [ ] **토큰 시스템 구축** - 모든 디자인 값을 CSS 커스텀 프로퍼티로 정의
- [ ] **베이스 컴포넌트** - 버튼, 카드, 모달 등 핵심 컴포넌트 구현
- [ ] **레이아웃 시스템** - 컨테이너, 그리드 컴포넌트로 일관된 레이아웃
- [ ] **테마 관리** - 라이트/다크 모드 자동 전환 및 커스텀 테마 지원
- [ ] **반응형 시스템** - 브레이크포인트 기반 적응형 디자인
- [ ] **접근성 준수** - WCAG AA+ 가이드라인 준수
- [ ] **유틸리티 클래스** - 빠른 프로토타이핑을 위한 유틸리티 제공

### 확장성 고려사항

- [ ] **컴포넌트 문서화** - Storybook 또는 VitePress로 문서화
- [ ] **타입 정의** - TypeScript 인터페이스 완성도 높이기
- [ ] **테스팅** - Jest + Vue Test Utils로 컴포넌트 테스트
- [ ] **번들 최적화** - 트리 셰이킹 지원 및 번들 크기 최적화
- [ ] **CI/CD 파이프라인** - 자동 빌드 및 배포 설정

### 품질 관리

- [ ] **코드 리뷰** - 디자인 시스템 가이드라인 준수 확인
- [ ] **성능 모니터링** - 컴포넌트 렌더링 성능 측정
- [ ] **사용성 테스트** - 실제 프로젝트 적용 후 피드백 수집
- [ ] **버전 관리** - 시맨틱 버저닝으로 안정적인 업데이트 제공

---

## 🚀 다음 단계

1. **프로토타이핑**: 위 구조를 바탕으로 기본 컴포넌트들을 구현
2. **테스트 적용**: 실제 Vue 프로젝트에 적용하여 사용성 검증
3. **피드백 수집**: 개발팀과 디자이너의 피드백을 바탕으로 개선
4. **문서화**: 컴포넌트 사용법과 가이드라인 문서 작성
5. **확장**: 추가 컴포넌트와 패턴들을 점진적으로 구축

이 가이드를 따라 구현하면 **Flat 2.0 + Subtle Depth + Adaptive Tokens** 철학이 반영된 확장 가능하고 유지보수가 쉬운 디자인 시스템을 구축할 수 있습니다.
