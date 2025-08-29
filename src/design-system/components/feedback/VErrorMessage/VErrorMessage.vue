<template>
  <VCard
    :variant="variant"
    :padding="padding"
    class="v-error-message"
    :class="[
      `v-error-message--${severity}`,
      { 'v-error-message--dismissible': dismissible },
    ]"
    role="alert"
    aria-live="assertive"
  >
    <div class="v-error-message__content">
      <!-- 아이콘 -->
      <div class="v-error-message__icon">
        <slot name="icon">
          <component :is="iconComponent" />
        </slot>
      </div>

      <!-- 메시지 내용 -->
      <div class="v-error-message__body">
        <h3 v-if="title" class="v-error-message__title">
          {{ title }}
        </h3>

        <div class="v-error-message__message">
          <slot>
            {{ message }}
          </slot>
        </div>

        <!-- 액션 버튼들 -->
        <div
          v-if="$slots.actions || showRetry"
          class="v-error-message__actions"
        >
          <slot name="actions">
            <VButton
              v-if="showRetry"
              variant="danger"
              size="sm"
              :loading="retrying"
              @click="handleRetry"
            >
              다시 시도
            </VButton>
          </slot>
        </div>
      </div>

      <!-- 닫기 버튼 -->
      <VButton
        v-if="dismissible"
        variant="ghost"
        size="sm"
        class="v-error-message__close"
        aria-label="에러 메시지 닫기"
        @click="handleDismiss"
      >
        <VIcon name="close" size="sm" />
      </VButton>
    </div>
  </VCard>
</template>

<script setup lang="ts">
import './VErrorMessage.css';
import { computed } from 'vue';
import { VCard, VButton, VIcon } from '@/design-system/components';

interface Props {
  message?: string;
  title?: string;
  severity?: 'error' | 'warning' | 'critical';
  variant?: 'outlined' | 'filled' | 'elevated';
  padding?: 'sm' | 'md' | 'lg';
  dismissible?: boolean;
  showRetry?: boolean;
  retrying?: boolean;
}

interface Emits {
  dismiss: [];
  retry: [];
}

const props = withDefaults(defineProps<Props>(), {
  message: '오류가 발생했습니다.',
  title: '',
  severity: 'error',
  variant: 'outlined',
  padding: 'md',
  dismissible: false,
  showRetry: false,
  retrying: false,
});

const emit = defineEmits<Emits>();

const iconComponent = computed(() => {
  switch (props.severity) {
    case 'critical':
      return 'svg'; // Critical 아이콘
    case 'warning':
      return 'svg'; // Warning 아이콘
    case 'error':
    default:
      return 'svg'; // Error 아이콘
  }
});

const handleDismiss = () => {
  emit('dismiss');
};

const handleRetry = () => {
  emit('retry');
};
</script>
