<template>
  <div :class="cardClasses" v-bind="$attrs">
    <!-- Card Header -->
    <header v-if="$slots.header || title" class="card__header">
      <div class="card__title-section">
        <h3 v-if="title" class="card__title">{{ title }}</h3>
        <p v-if="subtitle" class="card__subtitle">{{ subtitle }}</p>
      </div>
      <div v-if="$slots.actions" class="card__actions">
        <slot name="actions" />
      </div>
      <slot name="header" />
    </header>

    <!-- Card Body -->
    <main class="card__body">
      <slot />
    </main>

    <!-- Card Footer -->
    <footer v-if="$slots.footer" class="card__footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  /** Card variant */
  variant?: 'default' | 'elevated' | 'outlined' | 'ghost'
  /** Card size */
  size?: 'sm' | 'base' | 'lg'
  /** Interactive card (hover effects) */
  interactive?: boolean
  /** Card title */
  title?: string
  /** Card subtitle */
  subtitle?: string
  /** Loading state */
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'base',
  interactive: false,
  loading: false,
})

const cardClasses = computed(() => [
  'card',
  `card--${props.variant}`,
  `card--${props.size}`,
  {
    'card--interactive': props.interactive,
    'card--loading': props.loading,
  }
])
</script>

<style scoped>
.card {
  /* Base card styles using design tokens */
  display: flex;
  flex-direction: column;
  border-radius: var(--card-border-radius);
  transition: var(--card-interactive-transition);
  overflow: hidden;
}

/* =============
   SIZE VARIANTS
   ============= */

.card--sm {
  padding: var(--card-padding-sm);
}

.card--base {
  padding: var(--card-padding-base);
}

.card--lg {
  padding: var(--card-padding-lg);
}

/* =============
   STYLE VARIANTS
   ============= */

.card--default {
  background: var(--card-bg);
  border: var(--card-border-width) solid var(--card-border);
  box-shadow: var(--card-shadow);
}

.card--elevated {
  background: var(--card-bg);
  border: none;
  box-shadow: var(--card-elevated-shadow);
}

.card--outlined {
  background: transparent;
  border: var(--card-border-width) solid var(--card-border);
  box-shadow: none;
}

.card--ghost {
  background: transparent;
  border: none;
  box-shadow: none;
}

/* =============
   INTERACTIVE STATES
   ============= */

.card--interactive {
  cursor: var(--card-interactive-cursor);
}

.card--interactive:hover {
  transform: var(--card-hover-transform);
  box-shadow: var(--card-hover-shadow);
}

.card--interactive.card--outlined:hover {
  background: var(--color-bg-hover);
  box-shadow: var(--shadow-sm);
}

.card--interactive.card--ghost:hover {
  background: var(--color-bg-hover);
}

/* =============
   CARD STRUCTURE
   ============= */

.card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--spacing-component-md);
  margin-bottom: var(--spacing-component-md);
}

.card__title-section {
  flex: 1;
  min-width: 0; /* Allow text truncation */
}

.card__title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-1) 0;
  line-height: var(--line-height-tight);
}

.card__subtitle {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  margin: 0;
  line-height: var(--line-height-normal);
}

.card__actions {
  display: flex;
  gap: var(--spacing-2);
  flex-shrink: 0;
}

.card__body {
  flex: 1;
  color: var(--color-text-primary);
  line-height: var(--line-height-normal);
}

.card__footer {
  margin-top: var(--spacing-component-md);
  padding-top: var(--spacing-component-md);
  border-top: 1px solid var(--color-border-default);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

/* =============
   LOADING STATE
   ============= */

.card--loading {
  position: relative;
  overflow: hidden;
}

.card--loading::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

/* =============
   RESPONSIVE DESIGN
   ============= */

@media (max-width: 768px) {
  .card__header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .card__actions {
    justify-content: flex-end;
  }
}

@media (max-width: 375px) {
  .card--base {
    padding: var(--spacing-4);
  }
  
  .card--lg {
    padding: var(--spacing-5);
  }
}

/* =============
   ACCESSIBILITY
   ============= */

.card--interactive:focus-visible {
  outline: 2px solid var(--color-border-interactive);
  outline-offset: 2px;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }
  
  .card--loading::before {
    animation: none;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .card {
    border: 2px solid var(--color-border-strong);
  }
}

/* =============
   NESTED ELEMENTS
   ============= */

/* Reset margins for nested elements */
.card__body > :first-child {
  margin-top: 0;
}

.card__body > :last-child {
  margin-bottom: 0;
}

/* Typography in cards */
.card__body h1,
.card__body h2,
.card__body h3,
.card__body h4,
.card__body h5,
.card__body h6 {
  color: var(--color-text-primary);
  margin-top: 0;
  margin-bottom: var(--spacing-3);
}

.card__body p {
  margin-bottom: var(--spacing-3);
  color: var(--color-text-primary);
}

.card__body p:last-child {
  margin-bottom: 0;
}

/* Lists in cards */
.card__body ul,
.card__body ol {
  margin: var(--spacing-3) 0;
  padding-left: var(--spacing-5);
}

.card__body li {
  margin-bottom: var(--spacing-1);
}
</style>