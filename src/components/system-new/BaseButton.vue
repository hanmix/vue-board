<template>
  <component
    :is="tag"
    :type="tag === 'button' ? type : undefined"
    :disabled="disabled || loading"
    :class="buttonClasses"
    v-bind="$attrs"
    @click="handleClick"
  >
    <!-- Loading Spinner -->
    <div v-if="loading" class="button__spinner">
      <div class="spinner"></div>
    </div>
    
    <!-- Icon (before) -->
    <span v-if="iconBefore && !loading" class="button__icon button__icon--before">
      <slot name="icon-before">{{ iconBefore }}</slot>
    </span>
    
    <!-- Content -->
    <span class="button__content">
      <slot />
    </span>
    
    <!-- Icon (after) -->
    <span v-if="iconAfter && !loading" class="button__icon button__icon--after">
      <slot name="icon-after">{{ iconAfter }}</slot>
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  /** Button size */
  size?: 'sm' | 'base' | 'lg'
  /** HTML tag to render */
  tag?: 'button' | 'a' | 'router-link'
  /** Button type (only for button tag) */
  type?: 'button' | 'submit' | 'reset'
  /** Disabled state */
  disabled?: boolean
  /** Loading state */
  loading?: boolean
  /** Full width button */
  fullWidth?: boolean
  /** Icon before text */
  iconBefore?: string
  /** Icon after text */
  iconAfter?: string
}

interface Emits {
  click: [event: Event]
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'base',
  tag: 'button',
  type: 'button',
  disabled: false,
  loading: false,
  fullWidth: false,
})

const emit = defineEmits<Emits>()

const buttonClasses = computed(() => [
  'button',
  `button--${props.variant}`,
  `button--${props.size}`,
  {
    'button--disabled': props.disabled || props.loading,
    'button--loading': props.loading,
    'button--full-width': props.fullWidth,
    'button--with-icon': props.iconBefore || props.iconAfter,
  }
])

const handleClick = (event: Event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
.button {
  /* Base styles using design tokens */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  
  font-family: var(--font-family-primary);
  font-weight: var(--button-font-weight);
  line-height: 1;
  text-align: center;
  text-decoration: none;
  
  border: none;
  border-radius: var(--button-border-radius);
  cursor: pointer;
  transition: all var(--transition-base);
  
  /* Prevent text selection */
  user-select: none;
  -webkit-user-select: none;
  
  /* Touch optimization */
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

/* =============
   SIZE VARIANTS
   ============= */

.button--sm {
  height: var(--button-height-sm);
  padding: var(--button-padding-sm);
  font-size: var(--button-font-size-sm);
}

.button--base {
  height: var(--button-height-base);
  padding: var(--button-padding-base);
  font-size: var(--button-font-size-base);
}

.button--lg {
  height: var(--button-height-lg);
  padding: var(--button-padding-lg);
  font-size: var(--button-font-size-lg);
}

/* =============
   STYLE VARIANTS
   ============= */

.button--primary {
  background: var(--button-primary-bg);
  color: var(--button-primary-color);
  box-shadow: var(--button-primary-shadow);
}

.button--primary:hover:not(.button--disabled) {
  background: var(--button-primary-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.button--primary:active:not(.button--disabled) {
  background: var(--button-primary-active);
  transform: translateY(0);
  box-shadow: var(--button-primary-shadow);
}

.button--secondary {
  background: var(--button-secondary-bg);
  color: var(--button-secondary-color);
  border: var(--button-secondary-border);
}

.button--secondary:hover:not(.button--disabled) {
  background: var(--button-secondary-hover);
}

.button--ghost {
  background: var(--button-ghost-bg);
  color: var(--button-ghost-color);
}

.button--ghost:hover:not(.button--disabled) {
  background: var(--button-ghost-hover);
  color: var(--color-text-primary);
}

.button--danger {
  background: var(--button-danger-bg);
  color: var(--button-danger-color);
}

.button--danger:hover:not(.button--disabled) {
  background: var(--button-danger-hover);
}

/* =============
   STATE VARIANTS
   ============= */

.button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.button--loading {
  cursor: wait;
}

.button--full-width {
  width: 100%;
}

/* =============
   ICON & CONTENT
   ============= */

.button__content {
  display: inline-flex;
  align-items: center;
}

.button__icon {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}

.button__icon--before {
  margin-right: var(--spacing-1);
}

.button__icon--after {
  margin-left: var(--spacing-1);
}

/* =============
   LOADING SPINNER
   ============= */

.button__spinner {
  display: inline-flex;
  align-items: center;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.button--sm .spinner {
  width: 14px;
  height: 14px;
}

.button--lg .spinner {
  width: 18px;
  height: 18px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* =============
   ACCESSIBILITY
   ============= */

.button:focus-visible {
  outline: 2px solid var(--color-border-interactive);
  outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .button {
    border: 2px solid currentColor;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .button {
    transition: none;
  }
  
  .spinner {
    animation: none;
  }
}
</style>