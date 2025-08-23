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