<template>
  <Teleport to="body">
    <Transition name="alert-slide" @enter="onEnter" @leave="onLeave">
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
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import VIcon from '../VIcon/VIcon.vue';
import '/src/assets/styles/components/design-system/base/VAlert.css';
import { computed, h, onMounted, onUnmounted, ref } from 'vue';

export interface AlertProps {
  visible?: boolean;
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message?: string;
  closable?: boolean;
  duration?: number; // auto-hide duration in milliseconds, 0 means no auto-hide
  showIcon?: boolean;
  position?:
    | 'top-right'
    | 'top-center'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-center'
    | 'bottom-left';
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
  close: [];
}>();

let autoHideTimer: ReturnType<typeof setTimeout> | null = null;

const alertClasses = computed(() => [
  `v-alert--${props.variant}`,
  `v-alert--${props.position}`,
  {
    'v-alert--closable': props.closable,
    'v-alert--with-title': props.title,
  },
]);

const iconComponent = computed(() => {
  const iconNameMap = {
    success: 'success',
    warning: 'warning',
    error: 'error',
    info: 'info',
  } as const;

  const name = iconNameMap[props.variant] ?? 'info';
  return () => h(VIcon, { name, size: 'sm' });
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
