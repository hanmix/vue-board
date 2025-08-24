<template>
  <Teleport to="body">
    <Transition
      name="alert-slide"
      @enter="onEnter"
      @leave="onLeave"
    >
      <div
        v-if="visible"
        class="v-alert"
        :class="alertClasses"
        role="alert"
        :aria-live="variant === 'error' ? 'assertive' : 'polite'"
      >
        <div class="v-alert__icon" v-if="showIcon">
          <slot name="icon">
            <component :is="iconComponent" />
          </slot>
        </div>
        
        <div class="v-alert__content">
          <div v-if="title" class="v-alert__title">
            {{ title }}
          </div>
          <div class="v-alert__message">
            <slot>{{ message }}</slot>
          </div>
        </div>
        
        <button
          v-if="closable"
          class="v-alert__close"
          @click="handleClose"
          type="button"
          :aria-label="'알림 닫기'"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import '/src/assets/styles/components/design-system/base/VAlert.css';
import { computed, onMounted, onUnmounted, ref } from 'vue';

export interface AlertProps {
  visible?: boolean;
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message?: string;
  closable?: boolean;
  duration?: number; // auto-hide duration in milliseconds, 0 means no auto-hide
  showIcon?: boolean;
  position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';
}

const props = withDefaults(defineProps<AlertProps>(), {
  visible: false,
  variant: 'info',
  closable: true,
  duration: 5000,
  showIcon: true,
  position: 'top-right',
});

const emit = defineEmits<{
  'update:visible': [value: boolean];
  'close': [];
}>();

let autoHideTimer: ReturnType<typeof setTimeout> | null = null;

const alertClasses = computed(() => [
  `v-alert--${props.variant}`,
  `v-alert--${props.position}`,
  {
    'v-alert--closable': props.closable,
    'v-alert--with-title': props.title,
  }
]);

const iconComponent = computed(() => {
  switch (props.variant) {
    case 'success':
      return {
        template: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20,6 9,17 4,12"/>
        </svg>`
      };
    case 'warning':
      return {
        template: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <triangle points="7.86,2 16.14,2 22,13.76 2,13.76"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>`
      };
    case 'error':
      return {
        template: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
        </svg>`
      };
    default: // info
      return {
        template: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>`
      };
  }
});

const handleClose = () => {
  emit('update:visible', false);
  emit('close');
  clearAutoHideTimer();
};

const clearAutoHideTimer = () => {
  if (autoHideTimer) {
    clearTimeout(autoHideTimer);
    autoHideTimer = null;
  }
};

const startAutoHideTimer = () => {
  if (props.duration > 0) {
    clearAutoHideTimer();
    autoHideTimer = setTimeout(() => {
      handleClose();
    }, props.duration);
  }
};

const onEnter = () => {
  startAutoHideTimer();
};

const onLeave = () => {
  clearAutoHideTimer();
};

// Watch for visibility changes to handle auto-hide
const handleVisibilityChange = () => {
  if (props.visible) {
    startAutoHideTimer();
  } else {
    clearAutoHideTimer();
  }
};

onMounted(() => {
  if (props.visible) {
    startAutoHideTimer();
  }
});

onUnmounted(() => {
  clearAutoHideTimer();
});

// Re-start timer when component becomes visible
const visible = computed(() => props.visible);
</script>

