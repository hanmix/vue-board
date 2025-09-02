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
import './VButton.css';
import { computed, ref } from 'vue';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg';
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
