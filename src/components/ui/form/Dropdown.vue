<template>
  <div ref="triggerRef" class="dropdown-trigger" @click="toggle">
    <slot name="trigger" :is-open="isOpen"></slot>
  </div>

  <Teleport to="body">
    <transition name="dropdown-fade">
      <div v-if="isOpen" ref="menuRef" class="dropdown-menu" :style="menuStyle">
        <slot name="menu" :close="close"></slot>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeUnmount, nextTick, watch } from 'vue';
import { useBreakpoint } from '@/composables';
import { SPACING } from '@/utils';

interface Props {
  closeOnScroll?: boolean;
  placement?: 'bottom-start' | 'bottom-end' | 'bottom-center';
  offset?: number;
  mobileFullWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  closeOnScroll: true,
  placement: 'bottom-start',
  offset: 4,
  mobileFullWidth: true,
});

const { isMobile, windowWidth } = useBreakpoint();

const isOpen = ref(false);
const triggerRef = ref<HTMLElement | null>(null);
const menuRef = ref<HTMLElement | null>(null);
const menuStyle = reactive<Record<string, string>>({});

// 디바운싱을 위한 타이머
let scrollTimer: ReturnType<typeof setTimeout> | null = null;

const toggle = async () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    await nextTick();
    updateMenuPosition();
    bindListeners();
  } else {
    unbindListeners();
  }
};

const close = () => {
  isOpen.value = false;
  unbindListeners();
};

const updateMenuPosition = () => {
  const trigger = triggerRef.value;
  if (!trigger) return;

  const rect = trigger.getBoundingClientRect();
  
  // 기본 스타일 설정
  menuStyle.position = 'fixed';
  menuStyle.top = `${rect.bottom + props.offset}px`;
  menuStyle.zIndex = '99999';
  
  if (isMobile.value && props.mobileFullWidth) {
    // 모바일: 화면 전체 너비 활용
    menuStyle.left = `${SPACING.MD}px`;
    menuStyle.right = `${SPACING.MD}px`;
    menuStyle.width = 'auto';
    menuStyle.maxWidth = `calc(100vw - ${SPACING.MD * 2}px)`;
  } else {
    // 데스크탑: placement에 따른 위치 계산
    const viewportWidth = window.innerWidth;
    const menuWidth = rect.width;
    
    switch (props.placement) {
      case 'bottom-start':
        menuStyle.left = `${rect.left}px`;
        menuStyle.width = `${menuWidth}px`;
        break;
      case 'bottom-end':
        menuStyle.right = `${viewportWidth - rect.right}px`;
        menuStyle.width = `${menuWidth}px`;
        break;
      case 'bottom-center':
        menuStyle.left = `${rect.left + (rect.width - menuWidth) / 2}px`;
        menuStyle.width = `${menuWidth}px`;
        break;
    }
    
    // 화면 경계 체크 및 조정
    const leftPos = parseInt(menuStyle.left || '0');
    const rightEdge = leftPos + menuWidth;
    
    if (rightEdge > viewportWidth - SPACING.MD) {
      menuStyle.left = `${viewportWidth - menuWidth - SPACING.MD}px`;
    }
    if (leftPos < SPACING.MD) {
      menuStyle.left = `${SPACING.MD}px`;
    }
  }
};

const handleClickOutside = (e: MouseEvent) => {
  if (
    menuRef.value &&
    !menuRef.value.contains(e.target as Node) &&
    triggerRef.value &&
    !triggerRef.value.contains(e.target as Node)
  ) {
    close();
  }
};

const handleResize = () => {
  if (isOpen.value) {
    updateMenuPosition();
  }
};

const handleScroll = () => {
  if (!isOpen.value) return;

  if (scrollTimer) {
    clearTimeout(scrollTimer);
  }

  scrollTimer = setTimeout(() => {
    if (isOpen.value) {
      if (props.closeOnScroll) {
        close();
      } else {
        updateMenuPosition();
      }
    }
    scrollTimer = null;
  }, 100);
};

const bindListeners = () => {
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('resize', handleResize);
  document.addEventListener('scroll', handleScroll, true);
};

const unbindListeners = () => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('resize', handleResize);
  document.removeEventListener('scroll', handleScroll, true);
  
  if (scrollTimer) {
    clearTimeout(scrollTimer);
    scrollTimer = null;
  }
};

// 반응형 브레이크포인트 변경 감지
const updateDropdownPosition = async () => {
  if (isOpen.value) {
    await nextTick();
    updateMenuPosition();
  }
};

// 화면 크기 변경 감지
watch([windowWidth, isMobile], () => {
  updateDropdownPosition();
});

// expose 함수들
defineExpose({
  isOpen,
  toggle,
  close,
  updatePosition: updateMenuPosition,
});

onBeforeUnmount(() => {
  unbindListeners();
});
</script>

<style scoped>
.dropdown-trigger {
  display: inline-block;
  cursor: pointer;
}

.dropdown-menu {
  min-width: 200px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xs) 0;
  box-shadow: var(--shadow-lg);
  max-height: 300px;
  overflow-y: auto;
  
  /* 스크롤바 스타일링 */
  scrollbar-width: thin;
  scrollbar-color: var(--color-border) transparent;
}

.dropdown-menu::-webkit-scrollbar {
  width: 6px;
}

.dropdown-menu::-webkit-scrollbar-track {
  background: transparent;
}

.dropdown-menu::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 3px;
}

.dropdown-menu::-webkit-scrollbar-thumb:hover {
  background: var(--color-border-light);
}

/* 드롭다운 트랜지션 */
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: all var(--transition-normal);
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}

.dropdown-fade-enter-to,
.dropdown-fade-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* 모바일 최적화 */
@media (max-width: 767px) {
  .dropdown-menu {
    min-width: 150px;
    max-height: 250px;
  }
}

/* 접근성 */
@media (prefers-reduced-motion: reduce) {
  .dropdown-fade-enter-active,
  .dropdown-fade-leave-active {
    transition: opacity var(--transition-fast);
  }
  
  .dropdown-fade-enter-from,
  .dropdown-fade-leave-to {
    transform: none;
  }
}
</style>
