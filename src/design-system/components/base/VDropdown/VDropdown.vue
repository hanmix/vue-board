<template>
  <div
    ref="triggerRef"
    :id="props.id"
    class="v-dropdown-trigger"
    @click="toggle"
  >
    <slot name="trigger" :is-open="isOpen" :toggle="toggle"></slot>
  </div>

  <Teleport to="body">
    <Transition name="dropdown">
      <div
        v-if="isOpen"
        ref="menuRef"
        :id="props.id ? `${props.id}-menu` : undefined"
        class="v-dropdown-menu"
        :class="menuClasses"
        :style="menuStyle"
        role="menu"
        :aria-label="ariaLabel"
      >
        <slot name="menu" :close="close"></slot>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import './VDropdown.css';
import { ref, reactive, computed, onBeforeUnmount, nextTick } from 'vue';
import { useDropdownManager } from '@/composables/useDropdownManager';
import type { DropdownId } from '@/types/dropdown';

export interface DropdownProps {
  closeOnScroll?: boolean;
  placement?:
    | 'bottom-start'
    | 'bottom-end'
    | 'bottom-center'
    | 'top-start'
    | 'top-end'
    | 'top-center';
  verticalOffset?: number;
  horizontalOffset?: number;
  mobileFullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  ariaLabel?: string;
  priority?: 'normal' | 'high';
  id?: DropdownId;
}

const props = withDefaults(defineProps<DropdownProps>(), {
  closeOnScroll: true,
  placement: 'bottom-start',
  verticalOffset: 8,
  horizontalOffset: 0,
  mobileFullWidth: true,
  size: 'md',
  disabled: false,
  priority: 'normal',
});

const emit = defineEmits<{
  'update:open': [value: boolean];
  open: [];
  close: [];
}>();

// 드롭다운 상호 배타 관리
const dropdownManager = useDropdownManager();

// Constants
const MOBILE_BREAKPOINT = 768;
const MIN_MENU_WIDTH = 200;
const MIN_SPACE_FROM_EDGE = 16;
const SCROLL_THROTTLE_MS = 16; // 60fps
const MIN_SPACE_FOR_DROPDOWN = 200;

const isOpen = ref(false);
const triggerRef = ref<HTMLElement | null>(null);
const menuRef = ref<HTMLElement | null>(null);
const menuStyle = reactive<Record<string, string>>({});

const menuClasses = computed(() => [
  `v-dropdown-menu--${props.size}`,
  {
    'v-dropdown-menu--mobile-full': props.mobileFullWidth,
  },
]);

let scrollTimer: ReturnType<typeof setTimeout> | null = null;

const toggle = async () => {
  if (props.disabled) return;

  if (isOpen.value) {
    close();
  } else {
    // 다른 드롭다운들 먼저 닫기 (Manager를 통해)
    if (props.id) {
      dropdownManager.openDropdown(props.id);
    }

    // 현재 드롭다운 열기
    isOpen.value = true;
    emit('update:open', true);
    emit('open');
    await nextTick();
    updateMenuPosition();
    bindListeners();
  }
};

const close = () => {
  if (isOpen.value) {
    isOpen.value = false;
    if (props.id) {
      dropdownManager.closeDropdown(props.id);
    }
    emit('update:open', false);
    emit('close');
    unbindListeners();
  }
};

const calculateMobilePosition = (rect: DOMRect, viewportHeight: number) => {
  menuStyle.left = 'var(--space-4)';
  menuStyle.right = 'var(--space-4)';
  menuStyle.width = 'auto';

  const spaceBelow = viewportHeight - rect.bottom - props.verticalOffset;
  const spaceAbove = rect.top - props.verticalOffset;

  if (spaceBelow >= MIN_SPACE_FOR_DROPDOWN || spaceBelow >= spaceAbove) {
    menuStyle.top = `${rect.bottom + props.verticalOffset}px`;
  } else {
    menuStyle.bottom = `${viewportHeight - rect.top + props.verticalOffset}px`;
  }
};

const calculateDesktopPosition = (
  rect: DOMRect,
  viewportWidth: number,
  viewportHeight: number
) => {
  const menuWidth = Math.max(MIN_MENU_WIDTH, rect.width);

  // Horizontal positioning
  let leftPos = rect.left;
  switch (props.placement) {
    case 'bottom-start':
    case 'top-start':
      leftPos = rect.left - props.horizontalOffset;
      break;
    case 'bottom-end':
    case 'top-end':
      leftPos = rect.right - menuWidth;
      break;
    case 'bottom-center':
    case 'top-center':
      leftPos = rect.left + (rect.width - menuWidth) / 2;
      break;
  }

  // Prevent overflow
  const rightEdge = leftPos + menuWidth;
  if (rightEdge > viewportWidth - MIN_SPACE_FROM_EDGE) {
    leftPos = viewportWidth - menuWidth - MIN_SPACE_FROM_EDGE;
  }
  if (leftPos < MIN_SPACE_FROM_EDGE) {
    leftPos = MIN_SPACE_FROM_EDGE;
  }

  menuStyle.left = `${leftPos}px`;
  menuStyle.minWidth = `${menuWidth}px`;

  // Vertical positioning
  const isTopPlacement = props.placement.startsWith('top');
  if (isTopPlacement) {
    menuStyle.bottom = `${viewportHeight - rect.top + props.verticalOffset}px`;
  } else {
    menuStyle.top = `${rect.bottom + props.verticalOffset}px`;
  }
};

const updateMenuPosition = () => {
  const trigger = triggerRef.value;
  if (!trigger) return;

  const rect = trigger.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Reset styles
  Object.keys(menuStyle).forEach(key => {
    delete menuStyle[key];
  });

  // Set base styles
  menuStyle.position = 'fixed';
  menuStyle.zIndex =
    props.priority === 'high' ? 'var(--z-dropdown-high)' : 'var(--z-dropdown)';

  // Calculate position based on viewport
  const isMobile = viewportWidth <= MOBILE_BREAKPOINT;
  if (isMobile && props.mobileFullWidth) {
    calculateMobilePosition(rect, viewportHeight);
  } else {
    calculateDesktopPosition(rect, viewportWidth, viewportHeight);
  }
};

const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as Node;
  if (
    menuRef.value &&
    !menuRef.value.contains(target) &&
    triggerRef.value &&
    !triggerRef.value.contains(target)
  ) {
    close();
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
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
    scrollTimer = null;
  }

  scrollTimer = setTimeout(() => {
    // 드롭다운이 여전히 열려있는지 다시 한 번 확인
    if (!isOpen.value) {
      scrollTimer = null;
      return;
    }

    if (props.closeOnScroll) {
      close();
    } else {
      updateMenuPosition();
    }
    scrollTimer = null;
  }, SCROLL_THROTTLE_MS);
};

const bindListeners = () => {
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleKeydown);
  window.addEventListener('resize', handleResize);
  document.addEventListener('scroll', handleScroll, true);
};

const unbindListeners = () => {
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('keydown', handleKeydown);
  window.removeEventListener('resize', handleResize);
  document.removeEventListener('scroll', handleScroll, true);

  if (scrollTimer) {
    clearTimeout(scrollTimer);
    scrollTimer = null;
  }
};

// Expose methods
defineExpose({
  isOpen,
  toggle,
  close,
  updatePosition: updateMenuPosition,
});

// 드롭다운 등록/해제 및 상호 배타 관리
if (props.id) {
  // 컴포넌트 마운트 시 드롭다운 등록
  dropdownManager.registerDropdown(props.id, close);

  // 컴포넌트 언마운트 시 드롭다운 해제
  onBeforeUnmount(() => {
    dropdownManager.unregisterDropdown(props.id);
    unbindListeners();
  });
} else {
  onBeforeUnmount(() => {
    unbindListeners();
  });
}
</script>
