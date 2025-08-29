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
import './VCard.css';
import { computed } from 'vue';

export interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
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
