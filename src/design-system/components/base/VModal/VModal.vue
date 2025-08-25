<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="v-modal-overlay"
        @click="handleOverlayClick"
      >
        <div class="v-modal" :class="modalClasses" @click.stop>
          <header v-if="title || $slots.header" class="v-modal__header">
            <div class="v-modal__title">
              <slot name="header">
                <h3>{{ title }}</h3>
              </slot>
            </div>
            <VButton
              v-if="closable"
              variant="ghost"
              size="sm"
              class="v-modal__close"
              @click="$emit('update:modelValue', false)"
            >
              ✕
            </VButton>
          </header>

          <div class="v-modal__body">
            <slot />
          </div>

          <footer v-if="$slots.footer" class="v-modal__footer">
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import '/src/assets/styles/components/design-system/base/VModal.css';
import { computed, watch, onMounted, onUnmounted } from 'vue';
import { VButton } from '@/design-system/components/base';

export interface ModalProps {
  modelValue: boolean;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closable?: boolean;
  closeOnOverlay?: boolean;
}

const props = withDefaults(defineProps<ModalProps>(), {
  size: 'md',
  closable: true,
  closeOnOverlay: true,
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const modalClasses = computed(() => [`v-modal--${props.size}`]);

const handleOverlayClick = () => {
  if (props.closeOnOverlay) {
    emit('update:modelValue', false);
  }
};

// 모달 열릴 때 배경 스크롤 방지
const handleScrollLock = (isOpen: boolean) => {
  if (typeof document === 'undefined') return;

  if (isOpen) {
    document.body.classList.add('modal-open');
  } else {
    document.body.classList.remove('modal-open');
  }
};

watch(() => props.modelValue, handleScrollLock);

// 모달이 마운트될 때 이미 열려있다면 스크롤 잠금 적용
onMounted(() => {
  if (props.modelValue) {
    handleScrollLock(true);
  }
});

// 컴포넌트가 언마운트될 때 스크롤 잠금 해제
onUnmounted(() => {
  handleScrollLock(false);
});
</script>

<style>
/* 전역 스타일: 모달 열릴 때 배경 스크롤 방지 */
body.modal-open {
  overflow-y: hidden;
  touch-action: none;
  overscroll-behavior: none;
}
</style>
