<template>
  <div 
    class="v-loading-spinner"
    :class="[
      `v-loading-spinner--${size}`,
      `v-loading-spinner--${variant}`
    ]"
    :aria-label="ariaLabel || '로딩 중'"
    role="status"
    aria-live="polite"
  >
    <div class="v-loading-spinner__spinner">
      <div class="v-loading-spinner__circle"></div>
    </div>
    
    <div v-if="message || $slots.default" class="v-loading-spinner__message">
      <slot>
        {{ message }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import '/src/assets/styles/components/design-system/feedback/VLoadingSpinner.css';
interface Props {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'minimal';
  message?: string;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  variant: 'primary',
  message: '',
  ariaLabel: '',
});
</script>

