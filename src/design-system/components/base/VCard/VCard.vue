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

export interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<CardProps>(), {
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