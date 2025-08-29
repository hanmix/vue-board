<template>
  <div :class="containerClasses" :style="containerStyles">
    <slot />
  </div>
</template>

<script setup lang="ts">
import './VContainer.css';
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

